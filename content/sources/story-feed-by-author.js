// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'request-promise-native'
import { resizerSecret, CONTENT_BASE } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'
import { addResizedUrlsToStory } from '../../components/utilities/helpers'
import RedirectError from '../../components/utilities/redirect-error'

let website = ''
let pageNumber = 1
const schemaName = 'stories'

const options = {
  gzip: true,
  json: true,
}

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
  }
]

const pattern = (key = {}) => {
  const { name, url: rawUrl = '', website: rawWebsite = '' } = key
  
  const authorUrl = rawUrl === null ? '' : rawUrl
  const url = authorUrl || `/autor/${name}`

  const websiteField = rawWebsite === null ? '' : rawWebsite

  website = websiteField || key['arc-site'] || 'Arc Site no está definido'
  pageNumber = !key.from || key.from === 0 ? 1 : key.from
  const size = key.size || 50

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

  const requestUri = `${CONTENT_BASE}/content/v4/search/published?q=canonical_website:${website}+AND+credits.by.url:"${url}"+AND+type:story+AND+revision.published:true&size=${size}&from=${from}&sort=display_date:desc&website=${website}${excludedFields}`

  return request({
    uri: requestUri,
    ...options,
  }).then(data => {

    if (!data || (data && data.content_elements && !data.content_elements.length > 0))
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
  })
}

const fetch = key => pattern(key)

const source = {
  fetch,
  schemaName,
  params,
  ttl: 120,
}

export default source
