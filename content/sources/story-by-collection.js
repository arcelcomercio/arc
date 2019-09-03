import { resizerSecret } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'
import { addResizedUrlsToStory } from '../../components/utilities/helpers'

let website = ''

const schemaName = 'story'

const params = [
  {
    name: 'id',
    displayName: 'ID de la colleción',
    type: 'text',
  },
  {
    name: 'feedOffset',
    displayName: 'Número de la noticia',
    type: 'number',
  },
]

const pattern = (key = {}) => {
  website = key['arc-site'] || 'Arc Site no está definido'

  const { id, feedOffset } = key

  if (!id) {
    throw new Error('Esta fuente de contenido necesita el ID de la collección')
  }

  return `/content/v4/collections?website=${website}&_id=${id}&size=1&from=${feedOffset ||
    0}`
}

const transform = data => {
  const { content_elements: stories = [] } = data || {}

  const { resizerUrl } = getProperties(website)

  for (let i = 0; i < stories.length; i++) {
    stories[i].content_elements = []
  }
  if (stories.length > 0) {
    return addResizedUrlsToStory(
      stories,
      resizerUrl,
      resizerSecret,
      addResizedUrls
    )[0]
  }
  return {}
}
const resolve = key => pattern(key)

const source = {
  resolve,
  transform,
  schemaName,
  params,
}

export default source
