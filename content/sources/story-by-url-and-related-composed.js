/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'request-promise-native'
import {
  resizerSecret,
  CONTENT_BASE,
  ARC_ACCESS_TOKEN,
} from 'fusion:environment'
import getProperties from 'fusion:properties'
import { addResizedUrlsToStory } from '../../components/utilities/resizer'
import RedirectError from '../../components/utilities/redirect-error'

const schemaName = 'story-dev'

const params = [
  {
    name: 'website_url',
    displayName: 'URL de la nota',
    type: 'text',
  },
  {
    name: 'url_prefix',
    displayName: 'Prefijo del URL',
    type: 'text',
  },
]

const options = {
  gzip: true,
  json: true,
  auth: {
    bearer: ARC_ACCESS_TOKEN,
  },
}

const transformImg = data => {
  const storyData = data
  const { resizerUrl } = getProperties(data.website)
  if (storyData.related_content && storyData.related_content.basic)
    storyData.related_content.basic = addResizedUrlsToStory(
      storyData.related_content.basic,
      resizerUrl,
      resizerSecret,
      'related'
    )
  return (
    addResizedUrlsToStory([storyData], resizerUrl, resizerSecret, 'story')[0] ||
    null
  )
}

const excludedFieldsStory = '&_sourceExclude=owner,address,websites,language'
const fetch = ({
  website_url: rawWebsiteUrl,
  url_prefix: urlPrefix,
  'arc-site': website,
} = {}) => {
  const websiteUrl = `${urlPrefix === null ? '' : urlPrefix}${rawWebsiteUrl}`
  if (!websiteUrl) {
    throw new Error('Esta fuente de contenido requiere una URI y un sitio web')
  }
  if (!website) {
    throw new Error('Arc Site no está definido')
  }

  return request({
    uri: `${CONTENT_BASE}/content/v4/stories/?website_url=${websiteUrl}&website=${website}${excludedFieldsStory}`,
    ...options,
  }).then(storyResp => {
    if (storyResp.type === 'redirect' && storyResp.redirect_url)
      throw new RedirectError(storyResp.redirect_url, 301)
    return transformImg(storyResp)
  })
}

export default {
  fetch,
  schemaName,
  params,
  ttl: 300,
}
