const resolve = key => {
	// if (!key.website) {
	// 	throw new Error('This content source requires a website')
	// }
	// if (!key.startDate || !key.finalDate) {
	// 	throw new Error('This content source requires a start date and final date')
	// }

	const validateFrom = () => {
		if (key.from !== '1' && key.from) {
			return (key.from - 1) * key.size
		}
		return '0'
	}

	const website = `website=${key.website || 'elcomercio'}`
	const sort = `sort=publish_date:${key.sort || 'desc'}`
	const from = `from=${validateFrom()}`
	const size = `size=${key.size || 3}`
	// const page = `page=${'1'}`
	const valueQuery = key.query || '*'

	const body = {
		query: {
			bool: {
				must: [{
						term: {
							type: "story"
						}
					},
					{
						term: {
							'revision.published': true
						}
					},
					{
						simple_query_string: {
							query: `${valueQuery}`
						}
					}
				]
			}
		}
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

	if (key.section) {
		body.query.bool.must.push({
			term: {
				'taxonomy.sites.path': `/${key.section}`
			}
		})
	}

	const requestUri = `/content/v4/search/published?${sort}&${from}&${size}&${website}&body=${JSON.stringify(body)}`

	return requestUri
}

export default {
	resolve,
	schemaName: 'stories',
	params: [{
			name: 'website',
			displayName: 'Sitio web',
			type: 'text'
		},
		{
			name: 'sort',
			displayName: 'Orden',
			type: 'text'
		},
		{
			name: 'from',
			displayName: 'Página',
			type: 'number'
		},
		{
			name: 'section',
			displayName: 'Sección / Categoría',
			type: 'text'
		},
		{
			name: 'size',
			displayName: 'Cantidad a mostrar',
			type: 'number'
		},
		{
			name: 'query',
			displayName: 'Búsqueda',
			type: 'text'
		},
		// date_from: 'text',
		// date_to: 'text',
	],
}