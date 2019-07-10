// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'request-promise-native'
import { resizerSecret, CONTENT_BASE } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'

const SCHEMA_NAME = 'stories'
let sectionName = ''
let website = ''
const params = [
  {
    name: 'section',
    displayName: 'Section(es)',
    type: 'text',
  },
  {
    name: 'excludeSections',
    displayName: 'Secciones excluidas',
    type: 'text',
  },
  {
    name: 'feedOffset',
    displayName: 'Noticia inicial',
    type: 'number',
  },
  {
    name: 'stories_qty',
    displayName: 'Cantidad de historias',
    type: 'number',
  },
]
const options = { json: true }

const itemsToArray = (itemString = '') => {
  return itemString.split(',').map(item => item.replace(/"/g, ''))
}

const formatSection = section => {
  if (section === '/') return section
  return section && section.endsWith('/')
    ? section.slice(0, section.length - 1)
    : section
}

const itemsToArrayImge = (data, websiteResizer) => {
  const { resizerUrl } = getProperties(websiteResizer)

  return data.map(item => {
    return addResizedUrls(item, {
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
  })
}
const pattern = (key = {}) => {
  website = key['arc-site'] || 'Arc Site no está definido'
  const { section, excludeSections, feedOffset, stories_qty: storiesQty } = key
  const clearSection = formatSection(section)
  const newSection =
    clearSection === '' || clearSection === undefined || clearSection === null
      ? '/'
      : clearSection
  const sectionsExcluded = itemsToArray(excludeSections)
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
                        'taxonomy.sections._id': sectionsExcluded,
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
          },
        ],
      },
    },
  }

  if (newSection && newSection !== '/') {
    const sectionsIncluded = itemsToArray(newSection)
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

  return request({
    uri: `${CONTENT_BASE}/site/v3/website/publimetro/section?_id=${newSection}`,
    ...options,
  }).then(resp => {
    if (Object.prototype.hasOwnProperty.call(resp, 'status'))
      throw new Error('Sección no encontrada')
    return request({
      uri: `${CONTENT_BASE}/content/v4/search/published?body=${encodedBody}&website=${website}&size=${storiesQty ||
        10}&from=${feedOffset || 0}&sort=publish_date:desc`,
      ...options,
    }).then(data => {
      data.content_elements = itemsToArrayImge(data.content_elements, website)
      return {
        ...data,
        section_name: resp.name,
      }
    })
  })
}

const fetch = key => pattern(key)

const source = {
  fetch,
  schemaName: SCHEMA_NAME,
  params,
}

export default source
