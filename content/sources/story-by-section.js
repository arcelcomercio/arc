import { resizerSecret, CONTENT_BASE } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'
import { addResizedUrlsToStory } from '../../components/utilities/helpers'
import RedirectError from '../../components/utilities/redirect-error'

/**
 * Esta función se usa para controlar el slash final, ideada unicamente para
 * cuando la sección venga por un resolver.
 */
const removeLastSlash = section => {
  if (section === '/') return section
  return section && section.endsWith('/')
    ? section.slice(0, section.length - 1)
    : section
}

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
]

const resolve = (key = {}) => {
  const website = key['arc-site'] || 'Arc Site no está definido'
  const { section, feedOffset } = key

  const clearSection = removeLastSlash(section) || '/'

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

  if (clearSection !== '/') {
    body.query.bool.must.push({
      nested: {
        path: 'taxonomy.sections',
        query: {
          bool: {
            must: [
              {
                terms: {
                  'taxonomy.sections._id': [clearSection],
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

  const excludedFields =
    '&_sourceExclude=owner,address,workflow,label,content_elements,type,revision,language,source,distributor,planning,additional_properties,publishing,website'

  return `${CONTENT_BASE}/content/v4/search/published?body=${encodedBody}&website=${website}&size=1&from=${feedOffset ||
    0}&sort=display_date:desc&single=true${excludedFields}`
}

const transform = (data, { 'arc-site': arcSite, section: rawSection }) => {
  if (!data) {
    throw new RedirectError(null, 404)
  }

  const section = removeLastSlash(rawSection) || '/'
  const { resizerUrl } = getProperties(arcSite)

  const { content_elements: [{ taxonomy: { sections = [] } = {} } = {}] = [] } =
    data || {}

  let sectionName = ''
  sections.forEach(({ _id, name }) => {
    if (_id === section) sectionName = name
  })

  return {
    ...(addResizedUrlsToStory(
      [data],
      resizerUrl,
      resizerSecret,
      addResizedUrls
    )[0] || null),
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
