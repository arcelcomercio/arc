// eslint-disable-next-line import/no-extraneous-dependencies
import getProperties from 'fusion:properties'
import RedirectError from '../../components/utilities/redirect-error'
import { formatIncludedFields } from '../../components/utilities/included-fields'

const schemaName = 'stories'

const params = [
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
    name: 'includedFields',
    displayName: 'Campos incluidos (opcional)',
    type: 'text',
  },
]

const resolve = (key = {}) => {
  const { website: rawWebsite = '', includedFields } = key

  const websiteField = rawWebsite === null ? '' : rawWebsite

  const website = websiteField || key['arc-site'] || 'Arc Site no está definido'
  const size = key.size || 20

  const validateFrom = () => {
    if (key.from !== '1' && key.from) {
      return (key.from - 1) * size
    }
    return '0'
  }

  const from = `${validateFrom()}`

  const sourceInclude = includedFields
    ? `&_sourceInclude=${formatIncludedFields({
        includedFields,
        arcSite: website,
      })}`
    : `&_sourceInclude=display_date,website_url,websites.${website}.website_url,headlines.basic,content_elements.type,content_elements.text,content_elements.content,content_elements._id,content_elements.embed.id,content_elements.embed.config.content,content_elements.embed.config.date`

  /* const excludedFields =
    '&_sourceExclude=owner,address,workflow,label,content_elements,type,revision,language,source,distributor,planning,additional_properties,publishing,website'
 */
  return `/content/v4/search/published?q=canonical_website:${website}+AND+content_elements.type:"custom_embed"+AND+content_elements.subtype:"story_correction"+AND+type:story&size=${size}&from=${from}&sort=display_date:desc&website=${website}${sourceInclude}`
}

const transform = (
  data,
  { 'arc-site': arcSite, from, website: rawWebsite }
) => {
  const websiteField = rawWebsite === null ? '' : rawWebsite
  const website = websiteField || arcSite || 'Arc Site no está definido'
  const pageNumber = !from || from === 0 ? 1 : from

  if (
    !data ||
    (data && data.content_elements && !data.content_elements.length > 0)
  )
    throw new RedirectError('/404', 404)

  const dataStories = data || {}

  const { siteName } = getProperties(website)

  dataStories.siteName = siteName

  const additionalData = {
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
