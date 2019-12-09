// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'request-promise-native'
import { resizerSecret, CONTENT_BASE } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'
import { addResizedUrlsToStory } from '../../components/utilities/helpers'

/**
 * Esta función se usa para controlar el slash final, ideada unicamente para
 * cuando la sección venga por un resolver.
 */
const removeLastSlash = section => {
  if (section === '/') return section
  return section && section.endsWith('/')
    ? section.slice(0, section.length - 1)
    : section
}

let website = ''
const schemaName = 'story'

const params = [
  {
    name: 'section',
    displayName: 'Sección(es)',
    type: 'text',
  },
  {
    name: 'excludeSections',
    displayName: 'Secciones excluidas',
    type: 'text',
  },
  {
    name: 'feedOffset',
    displayName: 'Número de la noticia',
    type: 'number',
  },
]

const options = {
  gzip: true,
  json: true,
}

export const itemsToArray = (itemString = '') => {
  return itemString.split(',').map(item => {
    return item.replace(/"/g, '')
  })
}

const fetch = (key = {}) => {
  website = key['arc-site'] || 'Arc Site no está definido'
  const { section, excludeSections, feedOffset } = key

  const sectionsExcluded = itemsToArray(excludeSections)

  const clearSection = removeLastSlash(section) || '/'

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

  if (clearSection !== '/') {
    const sectionsIncluded = itemsToArray(clearSection)
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

  const excludedFields =
    '&_sourceExclude=owner,address,workflow,label,content_elements,type,revision,language,source,distributor,planning,additional_properties,publishing,website'

  return request({
    uri: `${CONTENT_BASE}/site/v3/website/${website}/section?_id=${clearSection}`,
    ...options,
  }).then(resp => {
    if (Object.prototype.hasOwnProperty.call(resp, 'status'))
      throw new Error('Sección no encontrada')
    return request({
      uri: `${CONTENT_BASE}/content/v4/search/published?body=${encodedBody}&website=${website}&size=1&from=${feedOffset ||
        0}&sort=display_date:desc&single=true${excludedFields}`,
      ...options,
    }).then(storyData => {
      const { resizerUrl } = getProperties(website)
      return {
        ...(addResizedUrlsToStory(
          [storyData],
          resizerUrl,
          resizerSecret,
          addResizedUrls
        )[0] || null),
        section_name: resp.name || 'Sección',
      }
    })
  })
}

const source = {
  fetch,
  schemaName,
  params,
}

export default source
