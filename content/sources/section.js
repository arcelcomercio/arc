const resolve = key => {
  const requestUri = `/site/v3/website/${key.website}/section`

  const hasWebsite = Object.prototype.hasOwnProperty.call(key, 'website')
  if (hasWebsite) return requestUri
  throw new Error('site-navigation content source requires a website')
}

export default {
  resolve,
  schemaName: 'section',
  params: {
    website: 'text',
  },
}
