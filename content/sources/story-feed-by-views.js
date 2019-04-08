// TODO: ACTUALIZAR NOMBRE Y HOMOLOGAR, AGREGAR CASOS DE ERRORES
// TODO: HOMOLOGAR ESQUEMA LIST CON STORIES
/**
 *  Este archivo será modificado en el futuro para que su funcionalidad sea
 *  la que pregona su nombre "story-feed-by-views". La funcionalidad actual
 *  es temporal.   
 */

const schemaName = 'stories'

const params = [{
    name: 'section',
    displayName: 'Sección',
    type: 'text',
  },
  {
    name: 'size',
    displayName: 'Cantidad de historias',
    type: 'number',
  },
]

const pattern = key => {
  const website = key['arc-site'] || 'Arc Site no está definido'
  const {
    section,
    size
  } = key

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
        ],
      },
    },
  }

  if (section) {
    body.query.bool.must.push({
      nested: {
        path: 'taxonomy.sections',
        query: {
          bool: {
            must: [{
                terms: {
                  'taxonomy.sections._id': [`${section}`],
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
  )}&from=0&size=${size || 5}`

  return requestUri
}

const resolve = key => pattern(key)

const source = {
  resolve,
  schemaName,
  params,
}

export default source