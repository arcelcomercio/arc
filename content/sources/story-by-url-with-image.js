// eslint-disable-next-line import/no-unresolved
import request from 'request-promise-native'
import { resizerSecret, resizerUrl, CONTENT_BASE } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'

const options = {
  json: true,
}

const schemaName = 'stories'

const queryStoryRecent = (seccion, site) => {
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
        must_not: [
          {
            nested: {
              path: 'taxonomy.sections',
              query: {
                bool: {
                  must: [
                    {
                      terms: {
                        'taxonomy.sections._id': seccion,
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
          },
        ],
      },
    },
  }

  return encodeURI(JSON.stringify(body))
}
export const itemsToArray = (itemString = '') => {
  return itemString.split(',').map(item => {
    return item.replace(/"/g, '')
  })
}

const fetch = key => {
  const site = key['arc-site'] || 'Arc Site no está definido'

  const websiteUrl = key.website_url

  return request({
    uri: `${CONTENT_BASE}/content/v4/?website=${site}&website_url=${websiteUrl}`,
    ...options,
  }).then(collectionResp => {
    const dataStory = collectionResp
    return request({
      uri: `${CONTENT_BASE}/content/v4/related-content/stories?_id=${
        dataStory._id
      }&website=${site}&published=true`,
      ...options,
    }).then(idsResp => {
      dataStory.related_content = idsResp
      const {
        taxonomy: { primary_section: { path: section } = {} } = {},
      } = dataStory
      const resultSeccion = itemsToArray(section)
      const encodedBody = queryStoryRecent(resultSeccion, site)
      return request({
        uri: `${CONTENT_BASE}/content/v4/search/published?body=${encodedBody}&website=${site}&size=6&from=0&sort=publish_date:desc`,
        ...options,
      }).then(recientesResp => {
        dataStory.recent_stories = recientesResp
        return dataStory
      })
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
