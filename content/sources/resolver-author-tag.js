const schemaName = 'stories'

const params = [{
    name: 'page',
    displayName: 'Página (autor o tag)',
    type: 'text',
  },
  {
    name: 'name',
    displayName: 'Slug del autor/tag',
    type: 'text',
  },
  {
    name: 'currentNumPage',
    displayName: 'Número de página actual',
    type: 'number',
  },
  {
    name: 'amountStories',
    displayName: 'Número de noticias por página',
    type: 'number',
  },
]

const pattern = (key = {}) => {
  const website = key["arc-site"] || "Arc Site is not defined";
  const {
    page,
    name,
    currentNumPage,
    amountStories
  } = key

  if (!name) {
    throw new Error('This content source requires a name')
  }
  if (!page) {
    throw new Error('This content source requires a page')
  }
  if (!amountStories) {
    throw new Error('This content source requires an stories amount')
  }

  const validateFrom = () => {
    if (currentNumPage !== '1' && currentNumPage) {
      return (currentNumPage - 1) * amountStories
    }
    return '0'
  }

  /** TODO: La consulta se debe hacer por SLUG, no por URL del autor */
  /** TODO: Cambiar publish_date por display_name en los patterns???? */
  /** TODO: Manejar comportamiento cuando no se obtiene data */

  const getType = () => page === 'autor' ? `credits.by.url:"/autor/${name}"` : `taxonomy.tags.slug:${name}`

  const requestUri = `/content/v4/search/published?q=canonical_website:${website}+AND+${getType()}+AND+type:story+AND+revision.published:true&size=${amountStories}&from=${validateFrom()}&sort=publish_date:desc&website=${website}`

  return requestUri
}

const resolve = key => pattern(key)

const source = {
  resolve,
  schemaName,
  params
}

export default source