let auxKey

const schemaName = 'stories'

const params = [{
    name: 'name',
    displayName: 'Slug del autor',
    type: 'text',
  },
  {
    name: 'currentPageNumber',
    displayName: 'Número de página actual',
    type: 'number',
  },
  {
    name: 'storiesQty',
    displayName: 'Número de historias por página',
    type: 'number',
  },
]

const pattern = (key = {}) => {
  auxKey = key

  const website = key['arc-site'] || 'Arc Site is not defined'
  const {
    name,
    currentPageNumber,
    storiesQty
  } = key

  if (!name) {
    throw new Error('Esta fuente de contenido necesita el Slug del autor')
  }

  const validateFrom = () => {
    if (currentPageNumber !== '1' && currentPageNumber) {
      return (currentPageNumber - 1) * storiesQty
    }
    return '0'
  }

  /** TODO: La consulta se debe hacer por SLUG, no por URL del autor */
  /** TODO: Cambiar publish_date por display_name en los patterns???? */
  /** TODO: Manejar comportamiento cuando no se obtiene data */

  const requestUri = `/content/v4/search/published?q=canonical_website:${website}+AND+credits.by.url:"/autor/${name}"+AND+type:story+AND+revision.published:true&size=${storiesQty ||
    50}&from=${validateFrom()}&sort=publish_date:desc&website=${website}`

  return requestUri
}

const resolve = key => pattern(key)

const transform = data => {
  const {
    name
  } = auxKey || {}

  if (!name) return data

  const {
    content_elements: [{
      credits: {
        by = []
      } = {},
    }] = [],
  } = data || {}

  const realAuthor = by.find(author => `/autor/${name}` === author.url)
  const authorName = {
    author_name: realAuthor.name,
  }
  return {
    ...data,
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