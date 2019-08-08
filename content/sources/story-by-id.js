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
    name: '_id',
    displayName: 'ID de la nota',
    type: 'text',
  },
  {
    name: 'published',
    displayName: 'Publicada (por defecto: true)',
    type: 'text',
  },
]

const resolve = (key = {}) => {
  website = key['arc-site'] || 'Arc Site no está definido'

  const hasWebsiteId = Object.prototype.hasOwnProperty.call(key, '_id')
  if (!hasWebsiteId)
    throw new Error('Esta fuente de contenido requiere un id y un sitio web')

  const {
    _id: id,
    published
  } = key

  const requestUri = `/content/v4/stories?_id=${id}&website=${website}&published=${published || 'true'}`
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