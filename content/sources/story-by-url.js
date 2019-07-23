import {
  resizerSecret
} from 'fusion:environment'
import {
  addResizedUrls
} from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'
import {
  addResizedUrlsToStory
} from '../../components/utilities/helpers'

let website = ''

const schemaName = 'story'

const params = [{
  name: 'website_url',
  displayName: 'URL de la nota',
  type: 'text',
}, ]

const resolve = (key = {}) => {
  const hasWebsiteUrl = Object.prototype.hasOwnProperty.call(key, 'website_url')
  if (!hasWebsiteUrl)
    throw new Error('Esta fuente de contenido requiere una URI y un sitio web')
  website = key['arc-site'] || 'Arc Site no está definido'
  const {
    website_url: websiteUrl
  } = key
  const requestUri = `/content/v4/stories/?website_url=${websiteUrl}&website=${website}`
  return requestUri
}

const transform = data => {
  const dataStory = data
  const {
    resizerUrl
  } = getProperties(website)
  return addResizedUrlsToStory([dataStory], resizerUrl, resizerSecret, addResizedUrls)[0] || null
}

export default {
  resolve,
  transform,
  schemaName,
  params,
}