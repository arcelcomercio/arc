// eslint-disable-next-line import/no-extraneous-dependencies
import getProperties from 'fusion:properties'

import {
  formatIncludedFields,
  includeCredits,
  includePrimarySection,
  includePromoItems,
} from '../../components/utilities/included-fields'
import RedirectError from '../../components/utilities/redirect-error'
import { getResizedImageData } from '../../components/utilities/resizer/resizer'

const schemaName = 'stories'

const params = [
  {
    name: 'name',
    displayName: 'Subtipo',
    type: 'text',
  },
  {
    name: 'from',
    displayName: 'Página de inicio',
    type: 'number',
  },
  {
    name: 'size',
    displayName: 'Cantidad a mostrar',
    type: 'number',
  },
  {
    name: 'website',
    displayName: 'ID del sitio (Opcional)',
    type: 'text',
  },
  {
    name: 'presets',
    displayName: 'Tamaño de las imágenes',
    type: 'text',
  },
  {
    name: 'includedFields',
    displayName: 'Campos incluidos',
    type: 'text',
  },
  {
    name: 'contentType',
    displayName: 'Tipo de contenido "premium,free,metered" (Opcional)',
    type: 'text',
  },
]

const resolve = (key = {}) => {
  const { name, website: rawWebsite = '', includedFields, contentType } = key

  const websiteField = rawWebsite === null ? '' : rawWebsite

  const website = websiteField || key['arc-site'] || 'Arc Site no está definido'

  const size = key.size || 20

  if (!name) {
    throw new Error('Esta fuente de contenido necesita el subtipo')
  }

  const validateFrom = () => {
    if (key.from !== '1' && key.from) {
      return (key.from - 1) * size
    }
    return '0'
  }

  const from = includedFields ? key.from || 0 : `${validateFrom()}`

  const contentTypeQuery = contentType
    ? // metered,free,premium -> (metered+free+premium)
      `+AND+content_restrictions.content_code:(${contentType.replace(
        /,/g,
        '+'
      )})`
    : ''

  const sourceInclude = includedFields
    ? `&_sourceInclude=${formatIncludedFields({
        includedFields,
        arcSite: website,
      })}`
    : `&_sourceInclude=${includePrimarySection},display_date,website_url,websites.${website}.website_url,headlines.basic,subheadlines.basic,${includeCredits},${includePromoItems},taxonomy.tags.slug,taxonomy.tags.text`

  /* const excludedFields =
    '&_sourceExclude=owner,address,workflow,label,content_elements,type,revision,language,source,distributor,planning,additional_properties,publishing,website'
 */
  return `/content/v4/search/published?q=canonical_website:${website}+AND+subtype:${name}${contentTypeQuery}+AND+type:story&size=${size}&from=${from}&sort=display_date:desc&website=${website}${sourceInclude}`
}

const transform = (
  data,
  {
    'arc-site': arcSite,
    name,
    from,
    website: rawWebsite,
    presets: customPresets,
  }
) => {
  const websiteField = rawWebsite === null ? '' : rawWebsite
  const website = websiteField || arcSite || 'Arc Site no está definido'
  const pageNumber = !from || from === 0 ? 1 : from
  if (
    !data ||
    (data && data.content_elements && !data.content_elements.length > 0)
  ) {
    throw new RedirectError('/404', 404)
  }

  const { siteName } = getProperties(website)
  const presets = customPresets || 'landscape_s:234x161,landscape_xs:118x72'
  const dataStories = getResizedImageData(data, presets, website)
  dataStories.siteName = siteName

  const {
    content_elements: [{ taxonomy: { tags = [] } = {} } = {}] = [],
  } = dataStories

  if (tags.length === 0) return dataStories

  const realTag = tags.find(
    (tag) => decodeURIComponent(name).toLowerCase() === tag.slug
  )

  const additionalData = {
    tag_name: (realTag && realTag.text) || 'Tag',
    page_number: pageNumber,
  }
  return {
    ...dataStories,
    ...additionalData,
  }
}

const source = {
  resolve,
  transform,
  schemaName,
  params,
  ttl: 300,
}

export default source
