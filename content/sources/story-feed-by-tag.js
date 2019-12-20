// eslint-disable-next-line import/no-extraneous-dependencies
import { resizerSecret } from 'fusion:environment'
import getProperties from 'fusion:properties'
import addResizedUrlsToStories from '../../components/utilities/stories-resizer'
import RedirectError from '../../components/utilities/redirect-error'
import {
  includePromoItems,
  includePrimarySection,
} from '../../components/utilities/included-fields'

const schemaName = 'stories'

const params = [
  {
    name: 'name',
    displayName: 'Slug de la etiqueta',
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
]

const transformImg = ({ contentElements, website, presets }) => {
  const { resizerUrl } = getProperties(website)
  return addResizedUrlsToStories({
    contentElements,
    resizerUrl,
    resizerSecret,
    presets,
  })
}

const resolve = (key = {}) => {
  const { name, website: rawWebsite = '', includedFields } = key

  const websiteField = rawWebsite === null ? '' : rawWebsite

  const website = websiteField || key['arc-site'] || 'Arc Site no está definido'

  const size = key.size || 20

  if (!name) {
    throw new Error('Esta fuente de contenido necesita el Slug de la etiqueta')
  }

  const validateFrom = () => {
    if (key.from !== '1' && key.from) {
      return (key.from - 1) * size
    }
    return '0'
  }

  const from = `${validateFrom()}`

  const sourceInclude = includedFields
    ? `&_sourceInclude=${includedFields}`
    : `&_sourceInclude=${includePrimarySection},display_date,website_url,websites.${website}.website_url,headlines.basic,subheadlines.basic,credits.by.name,credits.by.url,${includePromoItems}`

  /* const excludedFields =
    '&_sourceExclude=owner,address,workflow,label,content_elements,type,revision,language,source,distributor,planning,additional_properties,publishing,website'
 */
  return `/content/v4/search/published?q=canonical_website:${website}+AND+taxonomy.tags.slug:${decodeURIComponent(
    name
  ).toLowerCase()}+AND+type:story+AND+revision.published:true&size=${size}&from=${from}&sort=display_date:desc&website=${website}${sourceInclude}`
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

  const dataStories = data || {}

  const { siteName } = getProperties(website)
  const { content_elements: contentElements } = data || {}
  const presets = customPresets || 'landscape_s:234x161,landscape_xs:118x72'
  dataStories.content_elements = transformImg({
    contentElements,
    website,
    presets, // 'mobile:314x157'
  })
  dataStories.siteName = siteName

  const {
    content_elements: [{ taxonomy: { tags = [] } = {} } = {}] = [],
  } = dataStories

  if (tags.length === 0) return dataStories

  const realTag = tags.find(
    tag => decodeURIComponent(name).toLowerCase() === tag.slug
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
