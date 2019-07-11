import {
  resizerSecret
} from 'fusion:environment'
import {
  addResizedUrls
} from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'

let auxKey
let website = ''

const schemaName = 'stories'

const params = [{
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
  auxKey = key

  website = key['arc-site'] || 'Arc Site no está definido'
  const {
    name,
    from,
    size
  } = key

  if (!name) {
    throw new Error('Esta fuente de contenido necesita el Slug del autor')
  }

  const validateFrom = () => {
    if (from !== '1' && from) {
      return (from - 1) * size
    }
    return '0'
  }

  /** TODO: La consulta se debe hacer por SLUG, no por URL del autor */
  /** TODO: Cambiar publish_date por display_name en los patterns???? */
  /** TODO: Manejar comportamiento cuando no se obtiene data */

  const requestUri = `/content/v4/search/published?q=canonical_website:${website}+AND+credits.by.url:"/autor/${name}"+AND+type:story+AND+revision.published:true&size=${size ||
    50}&from=${validateFrom()}&sort=publish_date:desc&website=${website}`

  return requestUri
}

const addResizedUrlsStory = (data, resizerUrl) => {
  return addResizedUrls(data, {
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
}

const itemsToArrayImge = data => {
  const {
    resizerUrl
  } = getProperties(website)

  return data.map(item => {
    const dataStory = item

    const { promo_items: { basic_gallery: contentElements = null } = {} } = item
    const contentElementsData = contentElements || item
    if (contentElements) {
      const image = addResizedUrlsStory(contentElementsData, resizerUrl)
      dataStory.promo_items.basic_gallery = image
    }

    return addResizedUrlsStory(dataStory, resizerUrl)
  })
}

const resolve = key => pattern(key)

const transform = data => {
  const dataStories = data
  dataStories.content_elements = itemsToArrayImge(dataStories.content_elements)
  const {
    name
  } = auxKey || {}

  if (!name || !dataStories) return dataStories

  const {
    content_elements: [{
      credits: {
        by = []
      } = {}
    } = {}] = [],
  } = dataStories

  if (by.length === 0) return dataStories

  const realAuthor = by.find(author => `/autor/${name}` === author.url)
  const authorName = {
    author_name: realAuthor.name,
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
}

export default source