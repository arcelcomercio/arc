import { resizerSecret } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'
import { addResizedUrlsToStory } from '../../components/utilities/helpers'

let website = ''

const schemaName = 'stories'

const params = [
  {
    name: 'id',
    displayName: 'ID de la colección',
    type: 'text',
  },
  {
    name: 'from',
    displayName: 'Noticia inicial',
    type: 'number',
  },
  {
    name: 'size',
    displayName: 'Cantidad a mostrar',
    type: 'number',
  },
]

const pattern = (key = {}) => {
  website = key['arc-site'] || 'Arc Site no está definido'

  const { from: rawFrom = 0, size: rawSize = 20 } = key

  const from = rawFrom === undefined || rawFrom === null ? '0' : rawFrom
  const size = rawSize === undefined || rawSize === null ? '20' : rawSize

  if (!key.id) {
    throw new Error('Esta fuente de contenido necesita el ID de la collección')
  }
  const requestUri = `/content/v4/collections?website=${website}&_id=${key.id}&size=${size}&from=${from}`

  return requestUri
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
    addResizedUrls
  )
  dataStories.siteName = siteName

  return { ...dataStories }
}
const resolve = key => pattern(key)

const source = {
  resolve,
  transform,
  schemaName,
  params,
  // cache: false,
  ttl: 120,
}

export default source
