const schemaName = 'historias'

const params = [{
    name: 'name',
    displayName: 'Slug del autor',
    type: 'text',
  },
  {
    name: 'currentNumPage',
    displayName: 'Número de página actual',
    type: 'number',
  },
  {
    name: 'amountStories',
    displayName: 'Número de historias por página',
    type: 'number',
  },
]

const pattern = (key = {}) => {
  const website = key['arc-site'] || 'Arc Site is not defined'
  const {
    name,
    currentNumPage,
    amountStories
  } = key

  if (!name) {
    throw new Error('Esta fuente de contenido necesita el Slug del autor')
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

  const requestUri =
    `/content/v4/search/published?q=canonical_website:${website}+AND+credits.by.url:"/autor/${name}"+AND+type:story+AND+revision.published:true&size=${amountStories || 50}&from=${validateFrom()}&sort=publish_date:desc&website=${website}`

  return requestUri
}

const resolve = key => pattern(key)

const source = {
  resolve,
  schemaName,
  params,
}

export default source