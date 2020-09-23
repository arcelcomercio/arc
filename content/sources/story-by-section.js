import { getResizedImageData } from '../../components/utilities/resizer/resizer'
import { removeLastSlash } from '../../components/utilities/parse/strings'
import {
  includePromoItems,
  includePrimarySection,
  includeSections,
  includeCredits,
  formatIncludedFields,
} from '../../components/utilities/included-fields'

const schemaName = 'story'

const params = [
  {
    name: 'section',
    displayName: 'Sección',
    type: 'text',
  },
  {
    name: 'feedOffset',
    displayName: 'Número de la noticia',
    type: 'number',
  },
  {
    name: 'website',
    displayName: 'ID del sitio (opcional)',
    type: 'text',
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
]

const getQueryFilter = (section, website) => {
  let queryFilter = ''

  // Si se filtra por seccion se usa ?body, sino, se usa ?q
  if (section === '/') {
    queryFilter = `q=canonical_website:${website}+AND+type:story+AND+publish_date:%7Bnow-7d%20TO%20*%7D`
  } else {
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
            },
          ],
        },
      },
    }

    queryFilter = `body=${encodeURI(JSON.stringify(body))}`
  }

  return queryFilter
}

const resolve = (key = {}) => {
  const {
    section: rawSection,
    feedOffset,
    website: rawWebsite = '',
    includedFields,
  } = key

  const websiteField = rawWebsite === null ? '' : rawWebsite
  const website = websiteField || key['arc-site'] || 'Arc Site no está definido'

  const clearSection = removeLastSlash(
    rawSection === '' || rawSection === undefined || rawSection === null
      ? '/'
      : rawSection
  )

  const queryFilter = getQueryFilter(clearSection, website)

  const sourceInclude = includedFields
    ? `&_sourceInclude=${formatIncludedFields({
        includedFields,
        arcSite: website,
      })}`
    : `&_sourceInclude=${includePrimarySection},${includeSections},display_date,publish_date,website_url,websites.${website}.website_url,headlines.basic,subheadlines.basic,${includeCredits},${includePromoItems}`

  return `/content/v4/search/published?${queryFilter}&website=${website}&size=1&from=${feedOffset ||
    0}&sort=display_date:desc&single=true${sourceInclude}`
}

const transform = (
  data,
  { 'arc-site': arcSite, section: rawSection, website: rawWebsite, presets }
) => {
  const websiteField = rawWebsite === null ? '' : rawWebsite
  const website = websiteField || arcSite

  const section = removeLastSlash(
    rawSection === '' || rawSection === undefined || rawSection === null
      ? '/'
      : rawSection
  )

  const { taxonomy: { sections = [] } = {} } = data || {}

  let sectionName = ''
  sections.forEach(({ _id, name }) => {
    if (_id === section) sectionName = name
  })

  const story = getResizedImageData(data, presets, website)

  return {
    ...story,
    section_name: sectionName || 'Sección',
  }
}

const source = {
  resolve,
  transform,
  schemaName,
  params,
  ttl: 300,
}

export default source
