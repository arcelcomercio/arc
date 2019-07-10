import request from 'request-promise-native'
import { resizerSecret, CONTENT_BASE } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'

const options = {
  json: true,
}

const schemaName = 'stories'

export const itemsToArray = (itemString = '') => {
  return itemString.split(',').map(item => {
    return item.replace(/"/g, '')
  })
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
    const sectionsIncluded = itemsToArray(section)
    body.query.bool.must.push({
      nested: {
        path: 'taxonomy.sections',
        query: {
          bool: {
            must: [
              {
                terms: {
                  'taxonomy.sections._id': sectionsIncluded,
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

const fetch = key => {
  const site = key['arc-site'] || 'Arc Site no está definido'

  const websiteUrl = key.website_url

  return request({
    uri: `${CONTENT_BASE}/content/v4/?website=${site}&website_url=${websiteUrl}`,
    ...options,
  }).then(collectionResp => {
    const dataStory = collectionResp

    const {
      taxonomy: { primary_section: { path: section } = {} } = {},
    } = dataStory

    const encodedBody = queryStoryRecent(section, site)
    return request({
      uri: `${CONTENT_BASE}/content/v4/search/published?body=${encodedBody}&website=${site}&size=4&from=0&sort=publish_date:desc`,
      ...options,
    }).then(recientesResp => {
      dataStory.recent_stories = recientesResp
      return request({
        uri: `${CONTENT_BASE}/content/v4/related-content/stories?_id=${
          dataStory._id
        }&website=${site}&published=true`,
        ...options,
      }).then(idsResp => {
        dataStory.related_content = idsResp
        return dataStory
      })
    })
  })
}

const transform = data => {
  const dataStory = data

  const { resizerUrl } = getProperties(data.website)
  const {
    promo_items: { basic_gallery: contentElements },
  } = data
  const contentElementsData = contentElements || data

  const image = addResizedUrls(contentElementsData, {
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
        width: 940,
        height: 569,
      },
      amp: {
        width: 600,
        height: 375,
      },
    },
  })

  if (contentElements) {
    dataStory.promo_items.basic_gallery = image
  }

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
