import {
  resizerSecret
} from 'fusion:environment'
import {
  addResizedUrls
} from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'

const schemaName = 'stories'

let website = '' // Variable se usa en método fuera del fetch

const params = [{
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
  const sort = key.sort === 'ascedente' ? 'asc' : 'desc'
  const from = `${validateFrom()}`
  const size = `${key.size || 15}`
  const section = key.section || 'todas'



  // const page = `page=${'1'}`
  const valueQuery = encodeURIComponent(key.query).replace(/-/g, '+') || '*'

  const body = {
    query: {
      bool: {
        must: [{
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
              query: `${valueQuery}`,
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
            must: [{
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

  encodedBody = encodeURI(JSON.stringify(body))

  const requestUri = `/content/v4/search/published?sort=publish_date:${sort}&from=${from}&size=${size}&website=${website}&body=${encodedBody}`

  return requestUri
}

const resolve = key => pattern(key)

const itemsToArrayImge = data => {
  const {
    resizerUrl
  } = getProperties(website)

  return data && data.map(item => {
    return addResizedUrls(item, {
      resizerUrl,
      resizerSecret,
      presets: {
        small: {
          width: 100,
          height: 200,
        },
        medium: {
          width: 480,
        },
        large: {
          width: 940,
          height: 569,
        },
        amp: {
          width: 600,
          height: 375,
        },
      },
    })
  })
}

const transform = data => {
  const dataStories = data
  dataStories.content_elements = itemsToArrayImge(dataStories.content_elements)

  return {
    ...dataStories
  }
}

const source = {
  resolve,
  transform,
  schemaName,
  params,
}

export default source