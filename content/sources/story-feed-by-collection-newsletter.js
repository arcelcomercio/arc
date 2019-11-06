// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'request-promise-native'
import { resizerSecret, CONTENT_BASE } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'
import { addResizedUrlsToStory } from '../../components/utilities/helpers'

let website = ''

const schemaName = 'stories-dev'

const params = [
  {
    name: 'id',
    displayName: 'Slug de la etiqueta',
    type: 'text',
  },
]

const pattern = (key = {}) => {
  website = key['arc-site'] || 'Arc Site no está definido'

  if (!key.id) {
    throw new Error('Esta fuente de contenido necesita el ID de la collección')
  }
  const requestUri = `/content/v4/collections?website=${website}&_id=${key.id}`

  return requestUri
}

const options = {
  gzip: true,
  json: true,
}

const fetch = key => {
  return request({
    uri: `${CONTENT_BASE}/${pattern(key)}`,
    ...options,
  }).then(response => {
    return request({
      uri: `${CONTENT_BASE}/websked/collections/v1/collections/${key.id}/`,
      ...options,
    }).then(resp => {
      const { data: { name, description } = {} } = resp
      return {
        ...response,
        websked: {
          name,
          description,
        },
      }
    })
  })
}

const transform = data => {
  const dataStories = data
  const { resizerUrl, siteName } = getProperties(website)

  // TODO: Fix para que la función addResizedUrls funcione, preguntar a ARC
  for (let i = 0; i < dataStories.content_elements.length; i++) {
    dataStories.content_elements[i].content_elements = []
  }
  // ////////////////////////////////////////////////

  dataStories.content_elements = addResizedUrlsToStory(
    dataStories.content_elements,
    resizerUrl,
    resizerSecret,
    addResizedUrls,
    'newsletter'
  )
  dataStories.siteName = siteName

  return { ...dataStories }
}
const resolve = key => pattern(key)

const source = {
  // resolve,
  fetch,
  transform,
  schemaName,
  params,
  // cache: false,
  ttl: 120,
}

export default source
