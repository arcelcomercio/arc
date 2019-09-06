// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'request-promise-native'
import { resizerSecret, CONTENT_BASE } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'
import {
  addResizedUrlsToStory,
  addSlashToEnd,
} from '../../components/utilities/helpers'

const options = {
  gzip: true,
  json: true,
}

const schemaName = 'stories'

const params = [
  {
    name: 'website_url',
    displayName: 'URL de la nota',
    type: 'text',
  },
]

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

const transformImg = data => {
  const dataStory = data
  const { resizerUrl } = getProperties(data.website)
  return (
    addResizedUrlsToStory(
      [dataStory],
      resizerUrl,
      resizerSecret,
      addResizedUrls
    )[0] || null
  )
}

const fetch = key => {
  const site = key['arc-site'] || 'Arc Site no está definido'

  const websiteUrl =
    site !== 'publimetro' ? addSlashToEnd(key.website_url) : key.website_url

  return request({
    uri: `${CONTENT_BASE}/content/v4/stories/?website=${site}&website_url=${websiteUrl}`,
    ...options,
  }).then(collectionResp => {
    const dataStory = collectionResp

    if (dataStory.type === 'redirect') return dataStory

    const {
      taxonomy: { primary_section: { path: section } = {} } = {},
    } = dataStory

    const encodedBody = queryStoryRecent(section, site)
    return request({
      uri: `${CONTENT_BASE}/content/v4/search/published?body=${encodedBody}&website=${site}&size=6&from=0&sort=display_date:desc`,
      ...options,
    }).then(recientesResp => {
      dataStory.recent_stories = recientesResp
      return request({
        uri: `${CONTENT_BASE}/content/v4/related-content/stories/?_id=${dataStory._id}&website=${site}&published=true`,
        ...options,
      }).then(idsResp => {
        dataStory.related_content = idsResp
        const result = transformImg(dataStory)
        return result
      })
    })
  })
}

export default {
  fetch,
  schemaName,
  params,
}
