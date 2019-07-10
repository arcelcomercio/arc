// TODO: ACTUALIZAR NOMBRE Y HOMOLOGAR, AGREGAR CASOS DE ERRORES
// TODO: HOMOLOGAR ESQUEMA LIST CON STORIES
/**
 *  Este archivo será modificado en el futuro para que su funcionalidad sea
 *  la que pregona su nombre "story-feed-by-views". La funcionalidad actual
 *  es temporal.
 */
import { resizerSecret } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'

let website = ''
const schemaName = 'stories'

const params = [
  {
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
  website = key['arc-site'] || 'Arc Site no está definido'
  const { section, size } = key

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

  if (section) {
    body.query.bool.must.push({
      nested: {
        path: 'taxonomy.sections',
        query: {
          bool: {
            must: [
              {
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

const itemsToArrayImge = (data, websiteResizer) => {
  const { resizerUrl } = getProperties(websiteResizer)

  return data.map(item => {
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
const resolve = key => pattern(key)

const transform = data => {
  const dataStories = data
  dataStories.content_elements = itemsToArrayImge(
    dataStories.content_elements,
    website
  )
  return {
    ...dataStories,
  }
}
const source = {
  resolve,
  transform,
  schemaName,
  params,
}

export default source
