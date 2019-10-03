/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'request-promise-native'
import { resizerSecret, CONTENT_BASE } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'
import { addResizedUrlsToStory } from '../../components/utilities/helpers'

let website = ''

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
}

const queryStoryRecent = (section, site) => {
  const body = {
    query: {
      bool: {
        must: [
          {
            term: {
              'revision.published': 'true',
            },
          },
          {
            term: {
              type: 'story',
            },
          },
        ],
      },
    },
  }

  if (section && section !== '/') {
    body.query.bool.must.push({
      nested: {
        path: 'taxonomy.sections',
        query: {
          bool: {
            must: [
              {
                terms: {
                  'taxonomy.sections._id': [section],
                },
              },
              {
                term: {
                  'taxonomy.sections._website': site,
                },
              },
            ],
          },
        },
      },
    })
  }

  return encodeURI(JSON.stringify(body))
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
      addResizedUrls
    )[0] || null
  )
}

const resolve = (key = {}) => {
  const hasWebsiteUrl = Object.prototype.hasOwnProperty.call(key, 'website_url')
  if (!hasWebsiteUrl)
    throw new Error('Esta fuente de contenido requiere una URI y un sitio web')
  website = key['arc-site'] || 'Arc Site no está definido'
  const { website_url: websiteUrl } = key
  const requestUri = `/content/v4/stories/?website_url=${websiteUrl}&website=${website}`
  return requestUri
}

const transform = storyData => {
  if (storyData.type === 'redirect') return storyData

  const {
    taxonomy: { primary_section: { path: section } = {} } = {},
  } = storyData

  const excludedFields =
    '&_sourceExclude=owner,address,workflow,label,content_elements,type,revision,language,source,distributor,planning,additional_properties,publishing,website'

  const encodedBody = queryStoryRecent(section, website)
  return request({
    uri: `${CONTENT_BASE}/content/v4/search/published?body=${encodedBody}&website=${website}&size=6&from=0&sort=display_date:desc${excludedFields}`,
    ...options,
  }).then(recientesResp => {
    storyData.recent_stories = recientesResp
    return request({
      uri: `${CONTENT_BASE}/content/v4/related-content/stories/?_id=${storyData._id}&website=${website}&published=true`,
      ...options,
    }).then(idsResp => {
      storyData.related_content = idsResp
      const result = transformImg(storyData)
      return result
    })
  })
}

export default {
  resolve,
  schemaName,
  transform,
  params,
}
