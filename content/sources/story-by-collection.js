import { getResizedImageData } from '../../components/utilities/resizer/resizer'

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
  {
    name: 'presets',
    displayName: 'Tamaño de las imágenes (opcional)',
    type: 'text',
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
  { 'arc-site': arcSite, feedOffset: rawFeedOffset, presets }
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
    return getResizedImageData(stories[feedOffset], presets, arcSite)
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
