/* eslint-disable import/no-extraneous-dependencies */
import { CONTENT_BASE, resizerSecret } from 'fusion:environment'
import request from 'request-promise-native'
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

const options = {
  json: true,
}

const fetch = (key = {}) => {
  website = key['arc-site'] || 'Arc Site no está definido'

  const { id, feedOffset: rawFeedOffset } = key
  const feedOffset =
    rawFeedOffset === null ||
    rawFeedOffset === undefined ||
    rawFeedOffset === ''
      ? 1
      : rawFeedOffset

  const storyNumber = feedOffset - 1

  if (!id) {
    throw new Error('Esta fuente de contenido necesita el ID de la collección')
  }
  if (feedOffset < 1) {
    throw new Error('El campo "Número de la noticia" debe ser mayor a 0')
  }

  return request({
    uri: `${CONTENT_BASE}/content/v4/collections?website=${website}&_id=${id}`,
    ...options,
  }).then(data => {
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
    throw new Error(`No existe una historia en la posición ${feedOffset}`)
  })
}

const source = {
  fetch,
  schemaName,
  params,
}

export default source
