import { resizerSecret } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'
import { addResizedUrlsToStory } from '../../components/utilities/helpers'

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

const resolve = (key = {}) => {
  const website = key['arc-site'] || 'Arc Site no está definido'

  const { id } = key

  if (!id) {
    throw new Error('Esta fuente de contenido necesita el ID de la collección')
  }

  return `/content/v4/collections?website=${website}&_id=${id}`
}

const transform = (
  data,
  { 'arc-site': arcSite, feedOffset: rawFeedOffset }
) => {
  if (data === null || data === undefined || data === '') {
    return {}
  }

  const feedOffset =
    rawFeedOffset === null ||
    rawFeedOffset === undefined ||
    rawFeedOffset === ''
      ? 0
      : rawFeedOffset

  const { content_elements: rawStories = [] } = data || {}

  const stories = rawStories.filter(story => story.type === 'story')

  for (let i = 0; i < stories.length; i++) {
    stories[i].content_elements = []
  }

  if (stories[feedOffset]) {
    const { resizerUrl } = getProperties(arcSite)

    return addResizedUrlsToStory(
      [stories[feedOffset]],
      resizerUrl,
      resizerSecret,
      addResizedUrls
    )[0]
  }
  throw new Error(`No existe una historia en la posición ${feedOffset}`)
}

const source = {
  resolve,
  transform,
  schemaName,
  params,
  ttl: 120,
}

export default source
