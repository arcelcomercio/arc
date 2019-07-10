import { resizerSecret } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'

let website = ''

const schemaName = 'story'

const params = [
  {
    name: '_id',
    displayName: 'ID de la nota',
    type: 'text',
  },
  {
    // OPCIONAL: Para buscar notas no publicadas colocar 1 como parámetro
    name: 'published',
    displayName: 'Buscar notas no publicadas',
    type: 'number',
  },
]

const resolve = (key = {}) => {
  website = key['arc-site'] || 'Arc Site no está definido'

  const hasWebsiteId = Object.prototype.hasOwnProperty.call(key, '_id')
  if (!hasWebsiteId)
    throw new Error('Esta fuente de contenido requiere un id y un sitio web')

  const { _id: id, published } = key
  const isPublished = published === 1 ? '&published=false' : ''
  const requestUri = `/content/v4/stories?_id=${id}&website=${website}${isPublished}`
  return requestUri
}
const itemsToArrayImge = data => {
  const { resizerUrl } = getProperties(website)

  return addResizedUrls(data, {
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
}

const transform = data => {
  const dataStory = data

  const {
    promo_items: { basic_gallery: contentElements },
  } = data
  const contentElementsData = contentElements || data

  const image = itemsToArrayImge(contentElementsData)

  if (contentElements) {
    dataStory.promo_items.basic_gallery = image
  }

  return itemsToArrayImge(data)
}

export default {
  resolve,
  transform,
  schemaName,
  params,
}
