import { resizerSecret } from 'fusion:environment'
import getProperties from 'fusion:properties'
import RedirectError from '../../components/utilities/redirect-error'
import { addResizedUrlsToStories } from '../../components/utilities/resizer'
import { removeLastSlash } from '../../components/utilities/helpers'
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
    displayName: 'Secciones excluidas',
    type: 'text',
  },
]

const getQueryFilter = (section, excludedSections, website) => {
  let queryFilter = ''
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

  // TODO: +AND+publish_date:%7Bnow-15d%20TO%20*%7D agregar pronto
  // Si se filtra por seccion se usa ?body, sino, se usa ?q
  if (section !== '/') {
    body.query.bool = {
      ...body.query.bool,
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
    }
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

  queryFilter = `body=${encodeURI(JSON.stringify(body))}`
  return queryFilter
}

/* const itemsToArray = (itemString = '') => {
  return itemString.split(',').map(item => item.replace(/"/g, ''))
} */

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
  const {
    section: rawSection,
    excludedSections: auxExcludedSec = '/',
    feedOffset,
    stories_qty: storiesQty,
    website: rawWebsite = '',
    includedFields,
  } = key

  const websiteField = rawWebsite === null ? '' : rawWebsite

  const website = websiteField || key['arc-site'] || 'Arc Site no está definido'

  const section = removeLastSlash(
    rawSection === '' || rawSection === undefined || rawSection === null
      ? '/'
      : rawSection
  )

  const excSections =
    auxExcludedSec === null || !auxExcludedSec ? '/' : auxExcludedSec.split(',')

  const queryFilter = getQueryFilter(section, excSections, website)

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
  {
    'arc-site': arcSite,
    section: rawSection,
    website: rawWebsite,
    presets: customPresets,
  }
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

  const presets =
    customPresets === 'no-presets'
      ? ''
      : customPresets ||
        'landscape_xl:980x528,landscape_l:648x374,landscape_md:314x157,landscape_s:234x161,landscape_xs:118x72,portrait_xl:528x900,portrait_l:374x648,portrait_md:314x374,portrait_s:161x220,portrait_xs:75x90,square_xl:900x900,square_l:600x600,square_md:300x300,square_s:150x150,square_xs:75x75,small:100x200,large:940x569,story_small:482x290,amp_new:1200x800,amp:900x600'

  const stories = data

  /**
   * Si, por ahora siempre va a a existir presets por defecto pero
   * se espera que esto cambie en el futuro porque todos los features
   * deberian definir sus propios presets. Cuando eso suceda, esta validacion
   * si tendra completo sentido.
   */
  if (presets) {
    const { content_elements: contentElements } = data || {}
    stories.content_elements = transformImg({
      contentElements,
      website,
      presets, // i.e. 'mobile:314x157'
    })
  }

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
