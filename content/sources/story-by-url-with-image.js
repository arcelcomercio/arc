// eslint-disable-next-line import/no-unresolved
import request from 'request-promise-native'
import { resizerSecret, resizerUrl, CONTENT_BASE } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'

const options = {
  json: true,
}

const schemaName = 'stories'

const fetch = key => {
  const site = key['arc-site'] || 'Arc Site no está definido'

  const websiteUrl = key.website_url

  return request({
    uri: `${CONTENT_BASE}/content/v4/?website=${site}&website_url=${websiteUrl}`,
    ...options,
  }).then(collectionResp => {
    const resultStory = collectionResp
    return request({
      uri: `${CONTENT_BASE}/content/v4/related-content/stories?_id=${
        resultStory._id
      }&website=${site}&published=true`,
      ...options,
    }).then(idsResp => {
      resultStory.related_content = idsResp
      return resultStory
    })
  })
}
const transform = data => {
  return addResizedUrls(data, {
    resizerUrl,
    resizerSecret,
    presets: {
      small: {
        width: 100,
        height: 200,
      },
      medium: {
        width: 480,
      },
      large: {
        width: 676,
        height: 409,
      },
      amp: {
        width: 600,
        height: 375,
      },
    },
  })
}
export default {
  fetch,
  schemaName,
  transform,
  params: {
    website_url: 'text',
  },
}
