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
    displayName: 'Número de la noticia', // Para este API la pos. inic. es 1
    type: 'number',
  },
]

let storyNumber = ''

const pattern = (key = {}) => {
  website = key['arc-site'] || 'Arc Site no está definido'

  const { id, feedOffset: rawFeedOffset } = key
  const feedOffset =
    rawFeedOffset === null ||
    rawFeedOffset === undefined ||
    rawFeedOffset === ''
      ? 1
      : rawFeedOffset

  if (!id) {
    throw new Error('Esta fuente de contenido necesita el ID de la collección')
  }
  if (feedOffset < 1) {
    throw new Error('El campo "Número de la noticia" debe ser mayor a 0')
  }
  storyNumber = feedOffset - 1

  return `/content/v4/collections?website=${website}&_id=${id}`
}

const transform = data => {
  if (data === null || data === undefined || data === '') {
    return {}
  }

  const { content_elements: rawStories = [] } = data || {}

  const stories = rawStories.filter(story => story.type === 'story')

  for (let i = 0; i < stories.length; i++) {
    stories[i].content_elements = []
  }

  if (stories[storyNumber]) {
    const { resizerUrl } = getProperties(website)

    return addResizedUrlsToStory(
      [stories[storyNumber]],
      resizerUrl,
      resizerSecret,
      addResizedUrls
    )[0]
  }
  throw new Error(`No existe una historia en la posición ${storyNumber + 1}`)
}
const resolve = key => pattern(key)

const source = {
  resolve,
  transform,
  schemaName,
  params,
}

export default source
