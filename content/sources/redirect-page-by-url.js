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

  const website = key['arc-site'] || 'Arc Site no está definido'
  const { website_url: websiteUrl } = key

  const requestUri = `/content/v4/?website=${website}&website_url=${websiteUrl}`
  return requestUri
}

export default {
  resolve,
  params,
  ttl: 300,
}
