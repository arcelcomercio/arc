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
const schemaName = 'stories-dev'

const params = [
  {
    name: 'section',
    displayName: 'Sección',
    type: 'text',
  },
  {
    name: 'presets',
    displayName: 'Tamaño de las imágenes',
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

  const excludedFields =
    '&_sourceExclude=owner,address,workflow,label,content_elements,type,revision,language,source,distributor,planning,additional_properties,publishing,website'

  const requestUri = `/content/v4/search/published?sort=display_date:desc&website=${website}&body=${JSON.stringify(
    body
  )}&from=0&size=${size || 5}${excludedFields}`

  return requestUri
}

const resolve = key => pattern(key)

const transform = (data, { presets: customPresets }) => {
  const dataStories = data
  const { resizerUrl, siteName } = getProperties(website)

  if (customPresets !== 'no-presets') {
    dataStories.content_elements = addResizedUrlsToStory(
      dataStories.content_elements,
      resizerUrl,
      resizerSecret,
      addResizedUrls
    )
  }
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
  // cache: false,
  ttl: 300,
}

export default source
