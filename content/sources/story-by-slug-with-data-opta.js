/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'request-promise-native'
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment'
import RedirectError from '../../components/utilities/redirect-error'
import { getFootballGameId } from '../../components/utilities/get-story-values'
// import FilterSchema from '../schemas/story-by-slug-with-data-opta'
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
  const urlCommentariesCDN = `https://devresultadosopta.elcomercio.pe/api/v2/comments/?format=json&limit=200&offset=0&muid=${footballGameId}`
  // const urlCommentariesCDN = `https://cdna-resultadosopta.minoticia.pe/api/v2/comments/?format=json&limit=200&offset=0&muid=${footballGameId}`

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
  if (footballGameId !== '') {
    const urlCDN = `https://cdna-resultadosopta.minoticia.pe/api/v2/match/?format=json&uuid=${footballGameId}`

    return request({
      uri: urlCDN,
      ...options,
    })
      .then(dataOpta => {
        storyData.opta_data = dataOpta
        return getDataOptaCommentaries(storyData, footballGameId)
      })
      .catch(error => {
        console.log(error)
        return storyData
      })
  }
  return storyData
}

const getAdditionalData = (storyData, website) => {
  if (storyData.type === 'redirect') return storyData

  return request({
    uri: `${CONTENT_BASE}/content/v4/related-content/stories/?_id=${storyData._id}&website=${website}&published=true`,
    ...options,
  }).then(idsResp => {
    storyData.related_content = idsResp

    return getDataOpta(storyData)
  })
}

const excludedFieldsStory = '&_sourceExclude=owner,address,websites,language'
const fetch = ({ website_url: websiteUrl, 'arc-site': website } = {}) => {
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
  // filter:FilterSchema(
  //   {
  //     basicVideoFilter:true,
  //     basicGalleryFilter:true,
  //     optaFilter:true,
  //     optaCommentariesFilter:true,
  //   })
}
