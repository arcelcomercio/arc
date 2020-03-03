// eslint-disable-next-line import/no-extraneous-dependencies
import { resizerSecret } from 'fusion:environment'
import getProperties from 'fusion:properties'
import RedirectError from '../../components/utilities/redirect-error'
import { removeLastSlash } from '../../components/utilities/helpers'
import { addResizedUrlsToStory } from '../../components/utilities/resizer'

const SCHEMA_NAME = 'stories-dev'

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
    displayName: 'ID del sitio (Opcional)',
    type: 'text',
  },
]

/* const itemsToArray = (itemString = '') => {
  return itemString.split(',').map(item => item.replace(/"/g, ''))
} */

const resolve = (key = {}) => {
  const {
    section: rawSection,
    feedOffset,
    stories_qty: storiesQty,
    website: rawWebsite = '',
  } = key

  const websiteField = rawWebsite === null ? '' : rawWebsite

  const website = websiteField || key['arc-site'] || 'Arc Site no está definido'

  const section = removeLastSlash(
    rawSection === '' || rawSection === undefined || rawSection === null
      ? '/'
      : rawSection
  )

  const body = {
    query: {
      bool: {
        must: [
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

  return `/content/v4/search/published?body=${encodedBody}&website=${website}&size=${storiesQty ||
    10}&from=${feedOffset || 0}&sort=display_date:desc`
}

const transform = (data, { 'arc-site': arcSite, section: rawSection }) => {
  const section = removeLastSlash(
    rawSection === '' || rawSection === undefined || rawSection === null
      ? '/'
      : rawSection
  )

  if (
    !data ||
    (data && data.content_elements && !data.content_elements.length > 0)
  ) {
    throw new RedirectError('/404', 404)
  }
  const dataStory = data
  const { resizerUrl, siteName } = getProperties(arcSite)
  dataStory.content_elements = addResizedUrlsToStory(
    dataStory.content_elements,
    resizerUrl,
    resizerSecret,
    'newsletter'
  )
  dataStory.siteName = siteName

  const { content_elements: [{ taxonomy: { sites = [] } = {} } = {}] = [] } =
    dataStory || {}

  let sectionName = ''
  sites.forEach(({ _id, name }) => {
    if (_id === section) sectionName = name
  })

  return {
    ...dataStory,
    section_name: sectionName || 'Sección',
  }
}

const source = {
  resolve,
  schemaName: SCHEMA_NAME,
  params,
  transform,
  ttl: 300,
}

export default source
