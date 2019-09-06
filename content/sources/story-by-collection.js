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

  const { id } = key

  if (!id) {
    throw new Error('Esta fuente de contenido necesita el ID de la collección')
  }

  return request({
    uri: `${CONTENT_BASE}/content/v4/collections?website=${website}&_id=${id}`,
    ...options,
  }).then(data => {
    if (data === null || data === undefined || data === '') {
      return {}
    }

    const { feedOffset: rawFeedOffset } = key
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
      const { resizerUrl } = getProperties(website)

      return addResizedUrlsToStory(
        [stories[feedOffset]],
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
  ttl: 120,
}

export default source
