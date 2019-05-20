const schemaName = 'story'

const params = [
  {
    name: '_id',
    displayName: 'ID de la nota',
    type: 'text',
  },
]

const resolve = (key = {}) => {
  const hasWebsiteUrl = Object.prototype.hasOwnProperty.call(key, '_id')
  if (!hasWebsiteUrl)
    throw new Error('Esta fuente de contenido requiere una URI y un sitio web')
  const website = key['arc-site'] || 'Arc Site no está definido'
  const { _id: id } = key
  const requestUri = `/content/v4/stories/?_id=${id}&website=${website}&published:true`
  return requestUri
}

export default {
  resolve,
  schemaName,
  params,
}
