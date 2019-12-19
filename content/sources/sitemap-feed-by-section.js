import { resizerSecret } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'
import {
  addResizedUrlsToStory,
  removeLastSlash,
} from '../../components/utilities/helpers'

const SCHEMA_NAME = 'stories-dev'

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

const resolve = (key = {}) => {
  const website = key['arc-site'] || 'Arc Site no está definido'
  const { section, stories_qty: storiesQty } = key
  const clearSection =
    section === '' ||
    section === undefined ||
    section === null ||
    section === '/'
      ? '/'
      : removeLastSlash(section)

  const body = {
    query: {
      bool: {
        must: [
          {
            term: {
              type: 'story',
            },
          },
        ],
      },
    },
  }

  if (clearSection !== '/') {
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
  const sourceExclude = `&_sourceExclude=owner,address,workflow,label,content_elements,type,revision,language,source,distributor,planning,additional_properties,publishing,related_content`

  return `/content/v4/search/published?body=${encodedBody}&website=${website}&size=${storiesQty ||
    50}&from=0&sort=display_date:desc${sourceExclude}`
}

const transform = (data, { 'arc-site': arcSite }) => {
  const dataStory = data
  const { resizerUrl, siteName } = getProperties(arcSite)
  dataStory.content_elements = addResizedUrlsToStory(
    dataStory.content_elements,
    resizerUrl,
    resizerSecret,
    addResizedUrls
  )
  dataStory.siteName = siteName

  return {
    ...dataStory,
  }
}

const source = {
  resolve,
  transform,
  schemaName: SCHEMA_NAME,
  params,
  // cache: false,
  ttl: 120,
}

export default source
