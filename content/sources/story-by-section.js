import { resizerSecret } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'

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

export const itemsToArray = (itemString = '') => {
  return itemString.split(',').map(item => {
    return item.replace(/"/g, '')
  })
}

const pattern = (key = {}) => {
  website = key['arc-site'] || 'Arc Site no está definido'
  const { section, excludeSections, feedOffset } = key

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

  return `/content/v4/search/published?body=${encodedBody}&website=${website}&size=1&from=${feedOffset ||
    0}&sort=publish_date:desc&single=true`
}

const resolve = key => pattern(key)

/* const transform = data => {
  if (!auxKey.section || auxKey.section === '/') return data
  const sectionsIncluded = itemsToArray(auxKey.section)
  if (data.content_elements.length === 0 || sectionsIncluded.length > 1)
    return data
  const {
    taxonomy: { sections },
  } = data
  const realSection = sections.find(item => sectionsIncluded[0] === item._id)
  const sectionName = {
    section_name: realSection.name,
  }
  return {
    ...data,
    ...sectionName,
  }
} */

const itemsToArrayImge = data => {
  const { resizerUrl } = getProperties(website)

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
        width: 940,
        height: 569,
      },
      amp: {
        width: 600,
        height: 375,
      },
    },
  })
}

const transform = data => {
  const dataStory = data

  const { promo_items: { basic_gallery: contentElements = null } = {} } = data
  const contentElementsData = contentElements || data

  const image = itemsToArrayImge(contentElementsData)

  if (contentElements) {
    dataStory.promo_items.basic_gallery = image
  }

  return itemsToArrayImge(dataStory)
}

const source = {
  resolve,
  transform,
  schemaName,
  params,
}

export default source
