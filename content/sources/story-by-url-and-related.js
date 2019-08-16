/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'request-promise-native'
import { resizerSecret, CONTENT_BASE } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'
import { addResizedUrlsToStory } from '../../components/utilities/helpers'

let website = ''

const schemaName = 'story'

const params = [
  {
    name: 'website_url',
    displayName: 'URL de la nota',
    type: 'text',
  },
]

const options = {
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

const resolve = (key = {}) => {
  const hasWebsiteUrl = Object.prototype.hasOwnProperty.call(key, 'website_url')
  if (!hasWebsiteUrl)
    throw new Error('Esta fuente de contenido requiere una URI y un sitio web')
  website = key['arc-site'] || 'Arc Site no está definido'
  const { website_url: websiteUrl } = key
  const requestUri = `/content/v4/stories/?website_url=${websiteUrl}&website=${website}`
  return requestUri
}

const transform = dataStory => {
  if (dataStory.type === 'redirect') return dataStory

  const {
    taxonomy: { primary_section: { path: section } = {} } = {},
  } = dataStory

  const encodedBody = queryStoryRecent(section, website)
  return request({
    uri: `${CONTENT_BASE}/content/v4/search/published?body=${encodedBody}&website=${website}&size=6&from=0&sort=display_date:desc`,
    ...options,
  }).then(recientesResp => {
    dataStory.recent_stories = recientesResp
    return request({
      uri: `${CONTENT_BASE}/content/v4/related-content/stories/?_id=${dataStory._id}&website=${website}&published=true`,
      ...options,
    }).then(idsResp => {
      dataStory.related_content = idsResp
      const result = transformImg(dataStory)
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
