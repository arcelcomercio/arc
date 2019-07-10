import { resizerSecret } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'

let website = ''

const schemaName = 'stories'

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
const itemsToArrayImge = data => {
  const { resizerUrl } = getProperties(website)

  return data.map(item => {
    return addResizedUrls(item, {
      resizerUrl,
      resizerSecret,
      presets: {
        small: {
          width: 100,
          height: 200,
        },
        medium: {
          width: 480,
        },
        large: {
          width: 940,
          height: 569,
        },
        amp: {
          width: 600,
          height: 375,
        },
      },
    })
  })
}

const transform = data => {
  const dataStories = data
  dataStories.content_elements = itemsToArrayImge(dataStories.content_elements)

  return { ...dataStories }
}
const resolve = key => pattern(key)

const source = {
  resolve,
  transform,
  schemaName,
  params,
}

export default source
