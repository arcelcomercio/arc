import { resizerSecret } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'

let website = ''

const schemaName = 'story'

const params = [
  {
    name: 'website_url',
    displayName: 'URI de la nota',
    type: 'text',
  },
]

const resolve = (key = {}) => {
  const hasWebsiteUrl = Object.prototype.hasOwnProperty.call(key, 'website_url')
  if (!hasWebsiteUrl)
    throw new Error('Esta fuente de contenido requiere una URI y un sitio web')
  website = key['arc-site'] || 'Arc Site no está definido'
  const { website_url: websiteUrl } = key
  const requestUri = `/content/v4/stories/?website_url=${websiteUrl}&website=${website}`
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
