// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'request-promise-native'
import {
  resizerSecret,
  CONTENT_BASE
} from 'fusion:environment'
import {
  createUrlResizer
} from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'

let website = ''
const schemaName = 'printed'

const params = [{
  name: 'feedOffset',
  displayName: 'Número de portada',
  type: 'number',
}, ]

const options = {
  json: true,
}

// seccion a la que debe llamar
const section = '/impresa'

const fetch = (key = {}) => {
  website = key['arc-site'] || 'Arc Site no está definido'
  const {
    feedOffset
  } = key

  const body = {
    query: {
      bool: {
        must: [{
            term: {
              'revision.published': 'true',
            },
          },
          {
            term: {
              type: 'story',
            },
          },
          {
            nested: {
              path: 'taxonomy.sections',
              query: {
                bool: {
                  must: [{
                      terms: {
                        'taxonomy.sections._id': [section],
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

  const encodedBody = encodeURI(JSON.stringify(body))

  return request({
    uri: `${CONTENT_BASE}/site/v3/website/${website}/section?_id=${section}`,
    ...options,
  }).then(resp => {
    if (Object.prototype.hasOwnProperty.call(resp, 'status'))
      throw new Error('Sección no encontrada')
    return request({
      uri: `${CONTENT_BASE}/content/v4/search/published?body=${encodedBody}&website=${website}&size=1&from=${feedOffset ||
        0}&sort=publish_date:desc&single=true`,
      ...options,
    }).then(storyData => {
      const data = storyData
      if (data) {
        const {
          resizerUrl
        } = getProperties(website)
        const {
          promo_items: {
            basic: {
              url
            },
          },
        } = data

        const resizedUrls = createUrlResizer(resizerSecret, resizerUrl, {
          presets: {
            lazy_default: {
              width: 5,
              height: 5,
            },
            printed_md: {
              width: 236,
              height: 266,
            },
          },
        })({
          url,
        })
        data.promo_items.basic.resized_urls = resizedUrls
      }

      return {
        ...data,
        section_name: resp.name || 'Impresa',
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