const schemaName = 'story'

const params = [
  {
    name: '_id',
    displayName: 'ID de la nota',
    type: 'text',
  },
  {
    // OPCIONAL: Para buscar notas no publicadas colocar 1 como parámetro
    name: 'published',
    displayName: 'Buscar notas no publicadas',
    type: 'number',
  },
]

const resolve = (key = {}) => {
  const website = key['arc-site'] || 'Arc Site no está definido'

  const hasWebsiteId = Object.prototype.hasOwnProperty.call(key, '_id')
  if (!hasWebsiteId)
    throw new Error('Esta fuente de contenido requiere un id y un sitio web')

  const { _id: id, published } = key
  const isPublished = published === 1 ? '&published=false' : ''
  const requestUri = `/content/v4/stories?_id=${id}&website=${website}${isPublished}`
  return requestUri
}

export default {
  resolve,
  schemaName,
  params,
}
