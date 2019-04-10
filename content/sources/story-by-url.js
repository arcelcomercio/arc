const schemaName = 'story'

const params = [
  {
    name: 'website_url',
    displayName: 'URI de la nota',
    type: 'text',
  },
]

const resolve = (key = {}) => {
  const hasWebsiteUrl = Object.prototype.hasOwnProperty.call(key, 'website_url')
  if (!hasWebsiteUrl)
    throw new Error('Esta fuente de contenido requiere una URI y un sitio web')
  const site = key['arc-site'] || key.website
  const { website_url: websiteUrl } = key
  const requestUri = `/content/v4/stories/?website_url=${websiteUrl}&website=${site}`
  return requestUri
}

export default {
  resolve,
  schemaName,
  params,
}
