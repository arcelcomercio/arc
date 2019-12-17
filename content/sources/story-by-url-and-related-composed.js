/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'request-promise-native'
import { resizerSecret, CONTENT_BASE } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'
import { addResizedUrlsToStory } from '../../components/utilities/helpers'
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
}

const transformImg = data => {
  const storyData = data
  const { resizerUrl } = getProperties(data.website)
  if (storyData.related_content && storyData.related_content.basic)
    storyData.related_content.basic = addResizedUrlsToStory(
      storyData.related_content.basic,
      resizerUrl,
      resizerSecret,
      addResizedUrls,
      'related'
    )
  return (
    addResizedUrlsToStory(
      [storyData],
      resizerUrl,
      resizerSecret,
      addResizedUrls,
      'story'
    )[0] || null
  )
}

const getAdditionalData = (storyData, website) => {
  if (storyData.type === 'redirect') return storyData

  return request({
    uri: `${CONTENT_BASE}/content/v4/related-content/stories/?_id=${storyData._id}&website=${website}&published=true`,
    ...options,
  }).then(idsResp => {
    storyData.related_content = idsResp
    const result = transformImg(storyData)
    return result
  })
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
    if (storyResp.type === 'redirect' && storyResp.redirect_url) {
      // Redirect with 301 code
      throw new RedirectError(storyResp.redirect_url, 301)
    }
    // Fetch additional data
    return getAdditionalData(storyResp, website)
  })
}

export default {
  fetch,
  schemaName,
  params,
  ttl: 300,
}
