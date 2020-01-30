import { resizerSecret } from 'fusion:environment'
import getProperties from 'fusion:properties'
import addResizedUrlsToStories from '../../components/utilities/stories-resizer'
import {
  getYYYYMMDDfromISO,
  getActualDate,
} from '../../components/utilities/helpers'
import {
  includeCredits,
  includeCreditsImage,
  includePrimarySection,
  includeSections,
  includePromoItems,
} from '../../components/utilities/included-fields'

const schemaName = 'stories-dev'

const params = [
  {
    name: 'section',
    displayName: 'Sección',
    type: 'text',
  },
  {
    name: 'date',
    displayName: 'Fecha',
    type: 'text',
  },
  {
    name: 'from',
    displayName: 'Noticia inicial',
    type: 'number',
  },
  {
    name: 'size',
    displayName: 'Cantidad de historias',
    type: 'number',
  },
  {
    name: 'presets',
    displayName: 'Tamaño de las imágenes (opcional)',
    type: 'text',
  },
  {
    name: 'includedFields',
    displayName: 'Campos incluidos (opcional)',
    type: 'text',
  },
  {
    name: 'excludedSections',
    displayName: 'Secciones excluidas',
    type: 'text',
  },
]

const getNextDate = date => {
  const requestedDate = new Date(date)
  requestedDate.setDate(requestedDate.getDate() + 1)
  return getYYYYMMDDfromISO(requestedDate)
}

const getQueryFilter = (section, excludedSections, website, date) => {
  const body = {
    query: {
      bool: {
        must: [
          {
            term: {
              type: 'story',
            },
          },
          {
            range: {
              display_date: {
                gte: `${date}T05:00:00`,
                lte: `${getNextDate(date)}T04:59:59`,
              },
            },
          },
        ],
      },
    },
  }

  if (section !== '/') {
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
                  'taxonomy.sections._website': website,
                },
              },
            ],
          },
        },
      },
    })
  }

  if (excludedSections !== '/') {
    body.query.bool = {
      ...body.query.bool,
      must_not: [
        {
          nested: {
            path: 'taxonomy.sections',
            query: {
              bool: {
                must: [
                  {
                    terms: {
                      'taxonomy.sections._id': excludedSections,
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
    }
  }

  const queryFilter = `body=${encodeURI(JSON.stringify(body))}`

  return queryFilter
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

const resolve = (key = {}) => {
  const website = key['arc-site'] || 'Arc Site no está definido'
  const {
    section: auxSection = '/',
    date: auxDate = getActualDate(),
    from = 0,
    size = 10,
    includedFields,
    excludedSections: auxExcludedSec = '/',
  } = key

  const section = auxSection === null || !auxSection ? '/' : auxSection
  const date = auxDate === null || auxDate === '' ? getActualDate() : auxDate

  const excSections =
    auxExcludedSec === null || !auxExcludedSec ? '/' : auxExcludedSec.split(',')

  const queryFilter = getQueryFilter(section,excSections, website, date)

  const sourceInclude = includedFields
    ? `&_sourceInclude=${includedFields}`
    : `&_sourceInclude=websites.${website}.website_url,_id,headlines.basic,subheadlines.basic,display_date,${includeCredits},${includeCreditsImage},${includePrimarySection},${includeSections},${includePromoItems},promo_items.basic_html.content`

  const requestUri = `/content/v4/search/published?${queryFilter}&sort=display_date:desc&website=${website}&from=${from}&size=${size}${sourceInclude}`

  return requestUri
}

const transform = (data, { 'arc-site': website, presets: customPresets }) => {
  const stories = data
  const presets =
    customPresets === 'no-presets'
      ? ''
      : customPresets || 'landscape_s:234x161,landscape_xs:118x72'

  if (presets) {
    const { content_elements: contentElements } = data || {}
    stories.content_elements = transformImg({
      contentElements,
      website,
      presets, // i.e. 'mobile:314x157'
    })
  }

  return stories
}

const source = {
  resolve,
  schemaName,
  transform,
  params,
  ttl: 120,
}

export default source
