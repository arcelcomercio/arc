import { resizerSecret } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'
import { addResizedUrlsToStory } from '../../components/utilities/helpers'

let auxKey
let website = ''

const schemaName = 'stories'

const params = [
  {
    name: 'name',
    displayName: 'Slug del autor',
    type: 'text',
  },
  {
    name: 'from',
    displayName: 'Página de inicio',
    type: 'number',
  },
  {
    name: 'size',
    displayName: 'Cantidad a mostrar',
    type: 'number',
  },
]

const pattern = (key = {}) => {
  const { name } = key
  auxKey = key
  website = key['arc-site'] || 'Arc Site no está definido'
  const size = key.size || 50

  if (!name) {
    throw new Error('Esta fuente de contenido necesita el Slug del autor')
  }

  const validateFrom = () => {
    if (key.from !== '1' && key.from) {
      return (key.from - 1) * size
    }
    return '0'
  }

  const from = `${validateFrom()}`

  /** TODO: La consulta se debe hacer por SLUG, no por URL del autor */
  /** TODO: Manejar comportamiento cuando no se obtiene data */

  const requestUri = `/content/v4/search/published?q=canonical_website:${website}+AND+credits.by.url:"/autor/${name}"+AND+type:story+AND+revision.published:true&size=${size}&from=${from}&sort=display_date:desc&website=${website}`

  return requestUri
}

const resolve = key => pattern(key)

const transform = data => {
  const dataStories = data || {}

  const { resizerUrl, siteName } = getProperties(website)
  dataStories.content_elements = addResizedUrlsToStory(
    dataStories.content_elements,
    resizerUrl,
    resizerSecret,
    addResizedUrls
  )
  dataStories.siteName = siteName
  const { name } = auxKey || {}

  if (!name || !dataStories) return dataStories

  const {
    content_elements: [{ credits: { by = [] } = {} } = {}] = [],
  } = dataStories

  if (by.length === 0) return dataStories

  const realAuthor = by.find(author => `/autor/${name}` === author.url)
  const authorName = {
    author_name: (realAuthor && realAuthor.name) || 'Autor',
  }
  return {
    ...dataStories,
    ...authorName,
  }
}

const source = {
  resolve,
  transform,
  schemaName,
  params,
  // cache: false,
  ttl: 120,
}

export default source
