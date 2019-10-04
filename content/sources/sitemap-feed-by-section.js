// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'request-promise-native'
import { resizerSecret, CONTENT_BASE } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'
import {
  addResizedUrlsToStory,
  removeLastSlash,
} from '../../components/utilities/helpers'

const SCHEMA_NAME = 'stories'
let website = ''
const params = [
  {
    name: 'section',
    displayName: 'Section(es)',
    type: 'text',
  },
  {
    name: 'stories_qty',
    displayName: 'Cantidad de historias',
    type: 'number',
  },
]
const options = {
  gzip: true,
  json: true,
}

const pattern = (key = {}) => {
  website = key['arc-site'] || 'Arc Site no está definido'
  const { section, stories_qty: storiesQty } = key
  let clearSection = removeLastSlash(section)
  clearSection =
    clearSection === '' || clearSection === undefined || clearSection === null
      ? '/'
      : clearSection

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

  if (clearSection && clearSection !== '/') {
    body.query.bool.must.push({
      nested: {
        path: 'taxonomy.sections',
        query: {
          bool: {
            must: [
              {
                terms: {
                  'taxonomy.sections._id': [clearSection],
                },
              },
              {
                term: {
                  'taxonomy.sections._website': website,
                },
              },
            ],
          },
        },
      },
    })
  }

  const encodedBody = encodeURI(JSON.stringify(body))
  const sourceExclude = `&_sourceExclude=owner,address,workflow,label,content_elements,type,revision,language,source,distributor,planning,additional_properties,publishing,website,related_content,version`

  return request({
    uri: `${CONTENT_BASE}/site/v3/website/${website}/section?_id=${clearSection}`,
    ...options,
  }).then(resp => {
    if (Object.prototype.hasOwnProperty.call(resp, 'status'))
      throw new Error('Sección no encontrada')
    return request({
      uri: `${CONTENT_BASE}/content/v4/search/published?body=${encodedBody}&website=${website}&size=${storiesQty ||
        50}&from=0&sort=display_date:desc${sourceExclude}`,
      ...options,
    }).then(data => {
      const dataStory = data
      const { resizerUrl, siteName } = getProperties(website)
      dataStory.content_elements = addResizedUrlsToStory(
        dataStory.content_elements,
        resizerUrl,
        resizerSecret,
        addResizedUrls
      )
      dataStory.siteName = siteName

      return {
        ...dataStory,
        // section_name: resp.name || 'Sección',
      }
    })
  })
}

const fetch = key => pattern(key)

const source = {
  fetch,
  schemaName: SCHEMA_NAME,
  params,
  cache: false,
  // ttl: 120,
}

export default source
