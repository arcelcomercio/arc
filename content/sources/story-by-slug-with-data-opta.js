/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'request-promise-native'
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment'
import RedirectError from '../../components/utilities/redirect-error'
import {
  getFootballGameId,
  getFootballAds,
} from '../../components/utilities/get-story-values'
import FilterSchema from '../filters/story-with-opta'

const schemaName = 'story-dev'

const params = [
  {
    name: 'website_url',
    displayName: 'URL de la nota',
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

const getDataOptaCommentaries = (storyData, footballGameId) => {
  const urlCommentariesCDN = `https://cdna-resultadosopta.minoticia.pe/api/v2/comments/?format=json&limit=200&offset=0&muid=${footballGameId}`

  return request({
    uri: urlCommentariesCDN,
    ...options,
  })
    .then(dataOpta => {
      storyData.opta_commentaries = dataOpta
      return storyData
    })
    .catch(error => {
      console.log(error)
      return storyData
    })
}

const getDataOpta = storyData => {
  // const {} = storyData
  const footballGameId = getFootballGameId(storyData)
  const footballAds = getFootballAds(storyData)

  if (footballGameId !== '') {
    const urlCDN = `https://cdna-resultadosopta.minoticia.pe/api/v2/match/?format=json&uuid=${footballGameId}`

    return request({
      uri: urlCDN,
      ...options,
    })
      .then(dataOpta => {
        storyData.opta_data = dataOpta
        storyData.adsMatch = footballAds
        return getDataOptaCommentaries(storyData, footballGameId)
      })
      .catch(error => {
        console.log(error)
        return storyData
      })
  }
  return storyData
}

const excludedFieldsStory = '&_sourceExclude=owner,address,websites,language'
const fetch = ({ website_url: websiteUrl, 'arc-site': website } = {}) => {
  if (!websiteUrl) {
    throw new Error('Esta fuente de contenido requiere una URI y un sitio web')
  }
  if (!website) {
    throw new Error('Arc Site no est?? definido')
  }

  return request({
    uri: `${CONTENT_BASE}/content/v4/stories/?website_url=${websiteUrl}&website=${website}${excludedFieldsStory}`,
    ...options,
  }).then(storyResp => {
    if (storyResp.type === 'redirect' && storyResp.redirect_url)
      throw new RedirectError(storyResp.redirect_url, 301)
    return getDataOpta(storyResp)
  })
}

export default {
  fetch,
  schemaName,
  params,
  ttl: 300,
  filter: FilterSchema({
    basicVideoFilter: true,
    basicGalleryFilter: true,
    optaFilter: true,
    optaCommentariesFilter: true,
  }),
}
