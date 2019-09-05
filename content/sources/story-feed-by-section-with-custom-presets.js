// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'request-promise-native'
import { resizerSecret, CONTENT_BASE } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'

// Fix temporal
const removeLastSlash = section => {
  if (section === '/') return section
  return section && section.endsWith('/')
    ? section.slice(0, section.length - 1)
    : section
}

const SCHEMA_NAME = 'stories-with-custom-presets'
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
  {
    name: 'preset1',
    displayName: 'Preset personalizado 1',
    type: 'text',
  },
  {
    name: 'preset2',
    displayName: 'Preset personalizado 2',
    type: 'text',
  },
  {
    name: 'preset3',
    displayName: 'Preset personalizado 3',
    type: 'text',
  },
]

const customPresets = ({ preset1 = '', preset2 = '', preset3 = '' }) => {
  const auxPreset1 = preset1.split('x')
  const auxPreset2 = preset2.split('x')
  const auxPreset3 = preset3.split('x')
  const presets = {}
  if (preset1)
    presets.preset1 = {
      width: auxPreset1[0],
      height: auxPreset1[1],
    }
  if (preset2)
    presets.preset2 = {
      width: auxPreset2[0],
      height: auxPreset2[1],
    }
  if (preset3)
    presets.preset3 = {
      width: auxPreset3[0],
      height: auxPreset3[1],
    }
  return presets
}
const addResizedUrlsToStory = (data, resizerUrl, presets) => {
  return (
    data &&
    data.map(item => {
      const dataStory = item

      const {
        promo_items: {
          basic_gallery: basicGallery = null,
          basic_video: basicVideo = null,
        } = {},
      } = item

      if (basicGallery && basicGallery.promo_items) {
        const image = addResizedUrls(basicGallery, {
          resizerUrl,
          resizerSecret,
          presets: customPresets(presets),
        })
        dataStory.promo_items.basic_gallery = image
      }

      if (basicVideo && basicVideo.promo_items) {
        basicVideo.content_elements = []
        const image = addResizedUrls(basicVideo, {
          resizerUrl,
          resizerSecret,
          presets: customPresets(presets),
        })
        dataStory.promo_items.basic_video = image
      }

      return addResizedUrls(dataStory, {
        resizerUrl,
        resizerSecret,
        presets: customPresets(presets),
      })
    })
  )
}

const options = {
  json: true,
}

const itemsToArray = (itemString = '') => {
  return itemString.split(',').map(item => item.replace(/"/g, ''))
}

const pattern = (key = {}) => {
  website = key['arc-site'] || 'Arc Site no está definido'
  const {
    section,
    excludeSections,
    feedOffset,
    stories_qty: storiesQty,
    preset1,
    preset2,
    preset3,
  } = key
  const clearSection = removeLastSlash(section)
  const newSection =
    clearSection === '' || clearSection === undefined || clearSection === null
      ? '/'
      : clearSection
  // TODO: itemsToArray debe ejecutarse antes que removeLastSlash
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
    uri: `${CONTENT_BASE}/site/v3/website/${website}/section?_id=${newSection}`,
    ...options,
  }).then(resp => {
    if (Object.prototype.hasOwnProperty.call(resp, 'status'))
      throw new Error('Sección no encontrada')
    return request({
      uri: `${CONTENT_BASE}/content/v4/search/published?body=${encodedBody}&website=${website}&size=${storiesQty ||
        10}&from=${feedOffset || 0}&sort=display_date:desc`,
      ...options,
    }).then(data => {
      const dataStory = data
      const { resizerUrl, siteName } = getProperties(website)
      dataStory.content_elements = addResizedUrlsToStory(
        dataStory.content_elements,
        resizerUrl,
        { preset1, preset2, preset3 }
      )
      dataStory.siteName = siteName

      return {
        ...dataStory,
        section_name: resp.name || 'Sección',
      }
    })
  })
}

const fetch = key => pattern(key)

const source = {
  fetch,
  schemaName: SCHEMA_NAME,
  params,
  // cache: false,
  ttl: 120,
}

export default source
