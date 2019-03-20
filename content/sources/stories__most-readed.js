// TODO: ACTUALIZAR NOMBRE Y HOMOLOGAR, AGREGAR CASOS DE ERRORES
// TODO: HOMOLOGAR ESQUEMA LIST CON STORIES
const resolve = key => {
  const sizeFilter = key.num_notes ? `&from=0&size=${key.num_notes}` : ''

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
      term: {
        'taxonomy.sites.path': `${key.section}`,
      },
    })
  }

  const requestUri = `/content/v4/search/published?sort=publish_date:desc&website=${
    key.website
  }&body=${JSON.stringify(body)}${sizeFilter}`

  return requestUri
}

export default {
  resolve,
  schemaName: 'stories',
  params: {
    section: 'text',
    website: 'text',
    num_notes: 'number',
  },
}
