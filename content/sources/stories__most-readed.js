// TODO: ACTUALIZAR NOMBRE Y HOMOLOGAR, AGREGAR CASOS DE ERRORES
// TODO: HOMOLOGAR ESQUEMA LIST CON STORIES
const resolve = key => {
  const website = `${key['arc-site'] || 'elcomercio'}`
  const sizeFilter = key.num_notes ? `${key.num_notes}` : ''
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
        ],
      },
    },
  }

  if (key.section) {
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

  const requestUri = `/content/v4/search/published?sort=publish_date:desc&website=${website}&body=${JSON.stringify(
    body
  )}&from=0&size=${sizeFilter}`

  return requestUri
}

export default {
  resolve,
  schemaName: 'stories',
  params: {
    section: 'text',
    num_notes: 'number',
  },
}
