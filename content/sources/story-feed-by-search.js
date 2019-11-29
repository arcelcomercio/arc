// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'request-promise-native'
import { resizerSecret, CONTENT_BASE } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'
import { addResizedUrlsToStory } from '../../components/utilities/helpers'

const schemaName = 'stories-dev'

let website = '' // Variable se usa en método fuera del fetch
let queryValue = ''
let pageNumber = 1

const options = {
  gzip: true,
  json: true,
}

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
]

const pattern = key => {

  const validateFrom = () => {
    if (key.from !== '1' && key.from) {
      return (key.from - 1) * key.size
    }
    return '0'
  }

  website = key['arc-site'] || 'Arc Site no está definido'
  queryValue = key.query
  pageNumber = !key.from || key.from === 0 ? 1 : key.from
  const sort = key.sort === 'ascendente' ? 'asc' : 'desc'
  const from = `${validateFrom()}`
  const size = `${key.size || 15}`
  const section = key.section || 'todas'

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
  const requestUri = `${CONTENT_BASE}/content/v4/search/published?sort=display_date:${sort}&from=${from}&size=${size}&website=${website}&body=${encodedBody}${excludedFields}`

  return request({
    uri: `${CONTENT_BASE}/site/v3/website/${website}/section?_id=${section === 'todas' ? '/' : section}`,
    ...options,
  }).then(resp => {
    if (Object.prototype.hasOwnProperty.call(resp, 'status'))
      throw new Error('Sección no encontrada')
    return request({
      uri: requestUri,
      ...options,
    }).then(data => {
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
        page_number: pageNumber,
      }
    })
  })
}

const fetch = key => pattern(key)

const source = {
  fetch,
  schemaName,
  params,
  ttl: 120,
}

export default source
