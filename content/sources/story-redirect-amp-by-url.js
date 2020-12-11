/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'request-promise-native'
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment'
import getProperties from 'fusion:properties'
import RedirectError from '../../components/utilities/redirect-error'
import { storyContent } from '../filters/story-content'

const schemaName = 'story-dev'
const params = [
  {
    name: 'website_url',
    displayName: 'URL de la nota',
    type: 'text',
  },
  {
    name: 'section',
    displayName: 'Sección / Categoría (sin slash)',
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

const excludedFieldsStory = '&_sourceExclude=owner,websites,language'
const redirectUrls = (websiteUrl) => {
  return `${websiteUrl.replace('/amp/depor/', '/amp/')}`
}

const fetch = ({
  website_url: websiteUrl,
  'arc-site': website,
  section = '',
} = {}) => {
  if (!websiteUrl) {
    throw new Error('Esta fuente de contenido requiere una URI y un sitio web')
  }
  if (!website) {
    throw new Error('Arc Site no está definido')
  }
  const { siteUrl } = getProperties(website)

  return request({
    uri: `${CONTENT_BASE}/content/v4/stories/?website_url=${section}${redirectUrls(websiteUrl)}&website=${website}${excludedFieldsStory}`,
    ...options,
  }).then(storyResp => {
    // if (storyResp.type === 'redirect' && storyResp.redirect_url)
      // throw new RedirectError(`${siteUrl}${storyResp.redirect_url}`, 301)
    throw new RedirectError(redirectUrls(websiteUrl), 301)
    // return storyResp
  })
}

export default {
  fetch,
  schemaName,
  params,
  ttl: 300,
  filter: storyContent,
}
