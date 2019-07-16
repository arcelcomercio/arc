import { resizerSecret } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'
import { addResizedUrlsToStory } from '../../components/utilities/helpers'

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

const transform = data => {
  const dataStory = data
  const { resizerUrl } = getProperties(website)
  return addResizedUrlsToStory([dataStory], resizerUrl, resizerSecret, addResizedUrls)[0] || null
}

export default {
  resolve,
  transform,
  schemaName,
  params,
}
