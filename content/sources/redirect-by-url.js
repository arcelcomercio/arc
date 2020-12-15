/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'request-promise-native'
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment'
import RedirectError from '../../components/utilities/redirect-error'
import { storyContent } from '../filters/story-content'
import { SITE_DEPOR, SITE_ELCOMERCIO } from '../../components/utilities/constants/sitenames'

const schemaName = 'story-dev'
const params = [
  {
    name: 'website_url',
    displayName: 'URL',
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
const redirectUrls = (websiteUrl, arcSite) => {
  if(arcSite === SITE_DEPOR) {
    return `${websiteUrl.replace('/amp/depor/', '/amp/')}`
  } 
  if(arcSite === SITE_ELCOMERCIO) {
    return `${websiteUrl.replace('%E2%80%8E', '')}`
  }
  return websiteUrl
}

const fetchData = ({
  website_url: websiteUrl,
  'arc-site': website,
} = {}) => {
  if (!websiteUrl) {
    throw new Error('Esta fuente de contenido requiere una URI y un sitio web')
  }
  if (!website) {
    throw new Error('Arc Site no está definido')
  }

  console.log('===========================================')
  console.log(websiteUrl)
  console.log('===========================================')

  const urlRedirect = redirectUrls(websiteUrl, website)

  console.log('==================urlRedirect 3=========================')
  console.log(website, urlRedirect)
  console.log('===========================================')

  /* return request({
    uri: `${CONTENT_BASE}/content/v4/stories/?website_url=${section}${urlRedirect}&website=${website}${excludedFieldsStory}`,
    ...options,
  }).then(storyResp => {
    if (storyResp.type === 'redirect' && storyResp.redirect_url)
      throw new RedirectError(storyResp.redirect_url, 301)
    return storyResp
  }) */

  throw new RedirectError(urlRedirect, 301)
}

const resolve = key => fetchData(key)

export default {
  // fetch,
  // schemaName,
  resolve,
  params,
  ttl: 300,
  // filter: storyContent,
}
