const resolve = (key = {}) => {
  const hasWebsiteUrl = Object.prototype.hasOwnProperty.call(key, 'website_url')
  if (!hasWebsiteUrl)
    throw new Error('The content source requires a website and url')
  const site = key['arc-site'] || key.website
  const { website_url: websiteUrl } = key
  const requestUri = `/content/v4/stories/?website_url=${websiteUrl}&website=${site}`
  return requestUri
}

export default {
  resolve,
  schemaName: 'stories',
  params: {
    website_url: 'text',
  },
}
