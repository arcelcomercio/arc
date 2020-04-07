import { resizerSecret } from 'fusion:environment'
import getProperties from 'fusion:properties'
import { addResizedUrlsToStory } from '../../components/utilities/resizer'

const schemaName = 'story'

const params = [
  {
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
  const website = key['arc-site'] || 'Arc Site no está definido'

  const hasWebsiteId = Object.prototype.hasOwnProperty.call(key, '_id')
  if (!hasWebsiteId)
    throw new Error('Esta fuente de contenido requiere un id y un sitio web')

  const { _id: id, published } = key

  return `/content/v4/stories?_id=${id}&website=${website}&published=${published ||
    'true'}`
}

const transform = (data, { 'arc-site': arcSite }) => {
  const dataStory = data
  const { resizerUrl } = getProperties(arcSite)
  return (
    addResizedUrlsToStory([dataStory], resizerUrl, resizerSecret)[0] || null
  )
}

export default {
  resolve,
  transform,
  schemaName,
  params,
}
