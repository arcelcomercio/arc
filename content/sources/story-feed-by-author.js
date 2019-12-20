// eslint-disable-next-line import/no-extraneous-dependencies
import { resizerSecret } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'
import { addResizedUrlsToStory } from '../../components/utilities/helpers'
import RedirectError from '../../components/utilities/redirect-error'

const schemaName = 'stories'

const params = [
  {
    name: 'name',
    displayName: 'Slug del autor',
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
    name: 'url',
    displayName: 'Url del autor (Opcional, reemplaza al slug)',
    type: 'text',
  },
  {
    name: 'website',
    displayName: 'ID del sitio (Opcional)',
    type: 'text',
  },
]

const resolve = (key = {}) => {
  const { name, url: rawUrl = '', website: rawWebsite = '' } = key

  const authorUrl = rawUrl === null ? '' : rawUrl
  const url = authorUrl || `/autor/${name}`

  const websiteField = rawWebsite === null ? '' : rawWebsite

  const website = websiteField || key['arc-site'] || 'Arc Site no está definido'
  const size = key.size || 20

  if (!name && !authorUrl) {
    throw new Error('Esta fuente de contenido necesita el Slug del autor')
  }

  const validateFrom = () => {
    if (key.from !== '1' && key.from) {
      return (key.from - 1) * size
    }
    return '0'
  }

  const from = `${validateFrom()}`

  /** TODO: La consulta se debe hacer por SLUG, no por URL del autor */

  const excludedFields =
    '&_sourceExclude=owner,address,workflow,label,content_elements,type,revision,language,source,distributor,planning,additional_properties,publishing,website'

  return `/content/v4/search/published?q=canonical_website:${website}+AND+credits.by.url:"${url}"+AND+type:story&size=${size}&from=${from}&sort=display_date:desc&website=${website}${excludedFields}`
}

const transform = (
  data,
  { 'arc-site': arcSite, name, url: rawUrl = '', from, website: rawWebsite }
) => {
  const websiteField = rawWebsite === null ? '' : rawWebsite
  const website = websiteField || arcSite || 'Arc Site no está definido'
  const authorUrl = rawUrl === null ? '' : rawUrl
  const url = authorUrl || `/autor/${name}`
  const pageNumber = !from || from === 0 ? 1 : from

  if (
    !data ||
    (data && data.content_elements && !data.content_elements.length > 0)
  )
    throw new RedirectError('/404', 404)

  const dataStories = data || {}

  const { resizerUrl, siteName } = getProperties(website)
  dataStories.content_elements = addResizedUrlsToStory(
    dataStories.content_elements,
    resizerUrl,
    resizerSecret,
    addResizedUrls
  )
  dataStories.siteName = siteName

  const {
    content_elements: [{ credits: { by = [] } = {} } = {}] = [],
  } = dataStories

  if (by.length === 0) return dataStories

  const realAuthor = by.find(author => url === author.url)

  const { additional_properties: { original: { longBio = '' } = {} } = {} } =
    realAuthor || {}

  const additionalData = {
    author_name: (realAuthor && realAuthor.name) || 'Autor',
    author_longBio: longBio,
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
