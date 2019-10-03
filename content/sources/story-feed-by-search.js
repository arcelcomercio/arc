import { resizerSecret } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'
import { addResizedUrlsToStory } from '../../components/utilities/helpers'

const schemaName = 'stories'

let website = '' // Variable se usa en método fuera del fetch
let queryValue = ''

const params = [
  {
    name: 'sort',
    displayName: 'Orden',
    type: 'text',
  },
  {
    name: 'from',
    displayName: 'Página de inicio',
    type: 'number',
  },
  {
    name: 'section',
    displayName: 'Sección / Categoría',
    type: 'text',
  },
  {
    name: 'size',
    displayName: 'Cantidad a mostrar',
    type: 'number',
  },
  {
    name: 'query',
    displayName: 'Búsqueda',
    type: 'text',
  },
  // date_from: 'text',
  // date_to: 'text',
]

const pattern = key => {
  // if (!key.website) {
  // 	throw new Error('This content source requires a website')
  // }
  // if (!key.startDate || !key.finalDate) {c
  // 	throw new Error('This content source requires a start date and final date')
  // }

  const validateFrom = () => {
    if (key.from !== '1' && key.from) {
      return (key.from - 1) * key.size
    }
    return '0'
  }

  website = key['arc-site'] || 'Arc Site no está definido'
  queryValue = key.query
  const sort = key.sort === 'ascendente' ? 'asc' : 'desc'
  const from = `${validateFrom()}`
  const size = `${key.size || 15}`
  const section = key.section || 'todas'

  // const page = `page=${'1'}`
  let valueQuery = key.query.replace(/\+/g, ' ')
  valueQuery = valueQuery.replace(/-/g, '+') || '*'

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
            term: {
              'revision.published': 'true',
            },
          },
          {
            simple_query_string: {
              query: `"${decodeURI(valueQuery)}"`, // NOTA: El navegador encodea las tildes
            },
          },
        ],
      },
    },
  }

  // if(key.dateFrom && key.dateTo) {
  // 	body.query.bool.must.push({
  // 			range: {
  // 				publish_date: {
  // 					gte: `${key.date_from}T00:00:00-05:00`,
  // 					lte: `${key.date_to}T23:59:59-05:00`
  // 				}
  // 			}
  // 	})
  // }

  /* if (key.section) {
		body.query.bool.must.push({
      term: {
        'taxonomy.site._id': `/${key.section}`,
      },
    })
	} */

  //  ''
  let encodedBody = ''
  if (section !== 'todas') {
    body.query.bool.must.push({
      nested: {
        path: 'taxonomy.sections',
        query: {
          bool: {
            must: [
              {
                terms: {
                  'taxonomy.sections._id': [`/${key.section}`],
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

  const excludedFields =
    '&_sourceExclude=owner,address,workflow,label,content_elements,type,revision,language,source,distributor,planning,additional_properties,publishing,website'

  encodedBody = encodeURIComponent(JSON.stringify(body))
  const requestUri = `/content/v4/search/published?sort=display_date:${sort}&from=${from}&size=${size}&website=${website}&body=${encodedBody}${excludedFields}`

  return requestUri
}

const resolve = key => pattern(key)

const transform = data => {
  const dataStories = data
  const { resizerUrl, siteName } = getProperties(website)
  dataStories.content_elements = addResizedUrlsToStory(
    dataStories.content_elements,
    resizerUrl,
    resizerSecret,
    addResizedUrls
  )
  dataStories.siteName = siteName
  return {
    ...dataStories,
    query: queryValue,
    decoded_query: decodeURIComponent(queryValue).replace(/\+/g, ' '),
  }
}

const source = {
  resolve,
  transform,
  schemaName,
  params,
  // cache: false,
  ttl: 120,
}

export default source
