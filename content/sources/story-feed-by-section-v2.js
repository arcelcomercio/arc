import { resizerSecret } from 'fusion:environment'
import getProperties from 'fusion:properties'
import addResizedUrlsToStories from '../../components/utilities/stories-resizer'

const params = [
  {
    name: 'section',
    displayName: 'Sección',
    type: 'text',
  },
  {
    name: 'size',
    displayName: 'Cantidad de noticias',
    type: 'number',
  },
  {
    name: 'from',
    displayName: 'Noticia inicial',
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

const getSectionQuery = (section, site) => {
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

// websites,promo_items.basic.url,headlines,credits
const resolve = ({
  'arc-site': website,
  section,
  size,
  from,
  includedFields,
}) => {
  const sourceInclude = includedFields
    ? `&_sourceInclude=${includedFields}`
    : ''
  return `/content/v4/search/published?body=${getSectionQuery(
    section,
    website
  )}&website=${website}&size=${size || 10}&from=${from ||
    0}&sort=display_date:desc${sourceInclude}`
}

const transform = (response, { 'arc-site': website, presets }) => {
  if (presets) {
    const stories = response
    const { content_elements: contentElements } = response || {}
    stories.content_elements = transformImg({
      contentElements,
      website,
      presets, // 'mobile:314x157'
    })
    return stories
  }
  return response
}

export default {
  resolve,
  transform,
  schemaName: 'stories',
  params,
}
