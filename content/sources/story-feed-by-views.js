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
import { addResizedUrlsToStory } from '../../components/utilities/helpers'

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

  const requestUri = `/content/v4/search/published?sort=display_date:desc&website=${website}&body=${JSON.stringify(
    body
  )}&from=0&size=${size || 5}`

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
  }
}
const source = {
  resolve,
  transform,
  schemaName,
  params,
  cache: false,
  // ttl: 120,
}

export default source
