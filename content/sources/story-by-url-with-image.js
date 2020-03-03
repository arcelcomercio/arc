// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'request-promise-native'
import {
  resizerSecret,
  CONTENT_BASE,
  ARC_ACCESS_TOKEN,
} from 'fusion:environment'
import getProperties from 'fusion:properties'
import { addSlashToEnd } from '../../components/utilities/helpers'
import { addResizedUrlsToStory } from '../../components/utilities/resizer'

const options = {
  gzip: true,
  json: true,
  auth: {
    bearer: ARC_ACCESS_TOKEN,
  },
}

const schemaName = 'story-dev'

const params = [
  {
    name: 'website_url',
    displayName: 'URL de la nota',
    type: 'text',
  },
]

export const itemsToArray = (itemString = '') => {
  return itemString.split(',').map(item => {
    return item.replace(/"/g, '')
  })
}

const transformImg = data => {
  const dataStory = data
  const { resizerUrl } = getProperties(data.website)
  return (
    addResizedUrlsToStory([dataStory], resizerUrl, resizerSecret)[0] || null
  )
}

const fetch = key => {
  const site = key['arc-site'] || 'Arc Site no está definido'

  const websiteUrl =
    site !== 'publimetro' ? addSlashToEnd(key.website_url) : key.website_url

  return request({
    uri: `${CONTENT_BASE}/content/v4/stories/?website=${site}&website_url=${websiteUrl}`,
    ...options,
  }).then(collectionResp => {
    const dataStory = collectionResp

    if (dataStory.type === 'redirect') return dataStory

    return request({
      uri: `${CONTENT_BASE}/content/v4/related-content/stories/?_id=${dataStory._id}&website=${site}&published=true`,
      ...options,
    }).then(idsResp => {
      dataStory.related_content = idsResp
      const result = transformImg(dataStory)
      return result
    })
  })
}

export default {
  fetch,
  schemaName,
  params,
  ttl: 300,
}
