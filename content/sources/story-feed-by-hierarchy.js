// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'request-promise-native'
// Es prueba
import { resizerSecret, CONTENT_BASE } from 'fusion:environment'
import getProperties from 'fusion:properties'
import addResizedUrlsToStories from '../../components/utilities/stories-resizer'

const MAX_SECTIONS = 10

const options = {
  gzip: true,
  json: true,
}

const params = [
  {
    name: 'hierarchy',
    displayName: 'Jerarquía',
    type: 'text',
  },
  {
    name: 'size',
    displayName: 'Cantidad de noticias por jerarquía',
    type: 'number',
  },
  {
    name: 'presets',
    displayName: 'Tamaño de las imágenes',
    type: 'text',
  },
  {
    name: 'includedFields',
    displayName: 'Campos incluidos',
    type: 'text',
  },
]

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

const transformImg = ({ contentElements, website, presets }) => {
  const { resizerUrl } = getProperties(website)
  return addResizedUrlsToStories({
    contentElements,
    resizerUrl,
    resizerSecret,
    presets,
  })
}

const getStoriesBySection = ({
  navigation,
  size,
  website,
  presets,
  includedFields: rewIncludedFields,
}) => {
  const includedFields = `&_sourceInclude=${rewIncludedFields ||
    'websites,promo_items,headlines,credits'}`

  const { children = [] } = navigation || {}
  const sections = children.slice(0, MAX_SECTIONS)

  const requestArray = sections.map(({ _id }) =>
    request({
      uri: `${CONTENT_BASE}/content/v4/search/published?body=${queryStoryRecent(
        _id,
        website
      )}&website=${website}&size=${size ||
        5}&from=0&sort=display_date:desc${includedFields}`,
      ...options,
    })
  )

  return Promise.all(requestArray).then((stories = []) => {
    const navigationWithStories = navigation
    navigationWithStories.children = sections.map((section, i) => {
      const sectionWithStories = section
      const { content_elements: contentElements } = stories[i] || {}
      if (presets) {
        sectionWithStories.content_elements = transformImg({
          contentElements,
          website,
          presets,
        })
      } else {
        sectionWithStories.content_elements = contentElements
      }
      return sectionWithStories
    })
    return navigationWithStories
  })
}

const fetch = ({
  'arc-site': website,
  hierarchy,
  size,
  presets,
  includedFields,
}) => {
  return request({
    uri: `${CONTENT_BASE}/site/v3/navigation/${website}/?hierarchy=${hierarchy ||
      'default'}`,
    ...options,
  }).then(navigation => {
    return getStoriesBySection({
      navigation,
      size,
      website,
      presets,
      includedFields,
    })
  })
}

export default {
  fetch,
  schemaName: 'navigation',
  params,
}
