const schemaName = 'stories'

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

  const website = key['arc-site'] || 'Arc Site no está definido'
  const sort = key.sort === 'ascedente' ? 'asc' : 'desc'
  const from = `${validateFrom()}`
  const size = `${key.size || 15}`

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
  if (key.section !== 'todas' || typeof key.section !== 'undefined' ) {
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

  const requestUri = `/content/v4/search/published?sort=publish_date:${sort}&from=${from}&size=${size}&website=${website}&body=${JSON.stringify(
    body
  )}`

  return requestUri
}

const resolve = key => pattern(key)

const source = {
  resolve,
  schemaName,
  params,
}

export default source