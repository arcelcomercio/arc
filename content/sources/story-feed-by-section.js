import getProperties from 'fusion:properties'
import RedirectError from '../../components/utilities/redirect-error'
import { getResizedImageData } from '../../components/utilities/resizer/resizer'
import { removeLastSlash } from '../../components/utilities/parse/strings'
import { formatIncludedFields } from '../../components/utilities/included-fields'

const SCHEMA_NAME = 'stories'

const params = [
  {
    name: 'section',
    displayName: 'Sección',
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
  {
    name: 'excludedSections',
    displayName: 'Secciones excluidas (opcional)',
    type: 'text',
  },
  {
    name: 'contentType',
    displayName: 'Tipo de contenido "premium,free,metered" (Opcional)',
    type: 'text',
  },
]

const getQueryFilter = (section, excludedSections, website, contentType) => {
  let queryFilter = ''
  let body = { query: { bool: {} } }

  // Por defecto excludedSections === '/' si no esta definidoexcludedSections
  if (section === '/' && !excludedSections) {
    /**
     *
     * Si se filtra por seccion se usa ?body, sino, se usa ?q
     * esto se hace por mejorar PERFORMANCE
     *
     */
    const contentTypeQuery = contentType
      ? // metered,free,premium -> (metered+free+premium)
        `+AND+content_restrictions.content_code:(${contentType.replace(
          /,/g,
          '+'
        )})`
      : ''

    queryFilter = `q=canonical_website:${website}+AND+type:story+AND+publish_date:%7Bnow-15d%20TO%20*%7D${contentTypeQuery}`
  } else {
    // Solo si hay una seccion definida o alguna seccion para excluir
    if (section !== '/') {
      //  Solo si hay una seccion definida
      body = {
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
    }
    if (contentType) {
      body.query.bool.must = [
        ...body.query.bool.must,
        {
          terms: {
            'content_restrictions.content_code': contentType.split(','),
          },
        },
      ]
    }

    if (excludedSections) {
      // Solo si hay secciones excluidas
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

    queryFilter = `body=${encodeURI(JSON.stringify(body))}`
  }

  return queryFilter
}

const resolve = (key = {}) => {
  const {
    section: rawSection,
    excludedSections: auxExcludedSec,
    feedOffset,
    stories_qty: storiesQty,
    website: rawWebsite = '',
    includedFields,
    contentType,
  } = key

  const websiteField = rawWebsite === null ? '' : rawWebsite

  const website = websiteField || key['arc-site'] || 'Arc Site no está definido'

  const section = removeLastSlash(
    rawSection === '' || rawSection === undefined || rawSection === null
      ? '/'
      : rawSection
  )

  const excSections = auxExcludedSec && auxExcludedSec.split(',')

  const queryFilter = getQueryFilter(section, excSections, website, contentType)

  const sourceInclude = includedFields
    ? `&_sourceInclude=${formatIncludedFields({
        includedFields,
        arcSite: website,
      })}`
    : ''

  return `/content/v4/search/published?${queryFilter}&website=${website}&size=${storiesQty ||
    10}&from=${feedOffset || 0}&sort=display_date:desc${sourceInclude}`
}

const transform = (
  data,
  { 'arc-site': arcSite, section: rawSection, website: rawWebsite, presets }
) => {
  if (
    !data ||
    (data && data.content_elements && !data.content_elements.length > 0)
  ) {
    throw new RedirectError('/404', 404)
  }

  const websiteField = rawWebsite === null ? '' : rawWebsite
  const website = websiteField || arcSite

  const section = removeLastSlash(
    rawSection === '' || rawSection === undefined || rawSection === null
      ? '/'
      : rawSection
  )

  const stories = getResizedImageData(data, presets, website)

  const { siteName } = getProperties(website)
  stories.siteName = siteName

  let sectionMatch = ''
  if (section !== '/') {
    const {
      content_elements: [{ taxonomy: { sections = [] } = {} } = {}] = [],
    } = stories || {}

    sectionMatch = sections.find(sec => sec._id === section)
  }

  return {
    ...stories,
    section_name: (sectionMatch && sectionMatch.name) || 'Sección',
    section_id: section,
  }
}

const source = {
  resolve,
  transform,
  schemaName: SCHEMA_NAME,
  params,
  ttl: 300,
}

export default source
