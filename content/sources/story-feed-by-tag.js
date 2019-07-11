import {
  resizerSecret
} from 'fusion:environment'
import {
  addResizedUrls
} from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'

let auxKey

const schemaName = 'stories'
let website = ''

const params = [{
    name: 'name',
    displayName: 'Slug de la etiqueta',
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
    size
  } = key

  if (!name) {
    throw new Error('Esta fuente de contenido necesita el Slug de la etiqueta')
  }

  const validateFrom = () => {
    if (key.from !== '1' && key.from) {
      return (key.from - 1) * size
    }
    return '0'
  }

  const from = `${validateFrom()}`


  /** TODO: Cambiar publish_date por display_name en los patterns???? */
  /** TODO: Manejar comportamiento cuando no se obtiene data */

  const requestUri = `/content/v4/search/published?q=canonical_website:${website}+AND+taxonomy.tags.slug:${name}+AND+type:story+AND+revision.published:true&size=${size ||
    50}&from=${from}&sort=publish_date:desc&website=${website}`

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

const itemsToArrayImge = (data, websiteResizer) => {
  const {
    resizerUrl
  } = getProperties(websiteResizer)

  return data.map(item => {
    const dataStory = item

    const {
      promo_items: {
        basic_gallery: contentElements = null
      } = {}
    } = item
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
  dataStories.content_elements = itemsToArrayImge(
    dataStories.content_elements,
    website
  )
  const {
    name
  } = auxKey || {}

  if (!name || !dataStories) return dataStories

  const {
    content_elements: [{
      taxonomy: {
        tags = []
      } = {}
    } = {}] = [],
  } = dataStories

  if (tags.length === 0) return dataStories

  const realTag = tags.find(tag => name === tag.slug)
  const tagName = {
    tag_name: realTag.text,
  }
  return {
    ...dataStories,
    ...tagName,
  }
}

const source = {
  resolve,
  transform,
  schemaName,
  params,
}

export default source