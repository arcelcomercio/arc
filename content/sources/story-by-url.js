let website = ''

const schemaName = 'story'

const params = [
  {
    name: 'website_url',
    displayName: 'URL de la nota',
    type: 'text',
  },
]

const resolve = (key = {}) => {
  const hasWebsiteUrl = Object.prototype.hasOwnProperty.call(key, 'website_url')
  if (!hasWebsiteUrl)
    throw new Error('Esta fuente de contenido requiere una URI y un sitio web')
  website = key['arc-site'] || 'Arc Site no está definido'
  const { website_url: websiteUrl } = key
  const requestUri = `/content/v4/stories/?website_url=${websiteUrl}&website=${website}`
  return requestUri
}

export default {
  resolve,
  schemaName,
  params,
}
