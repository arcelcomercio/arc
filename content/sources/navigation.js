const resolve = key => {
  const requestUri = `/site/v3/navigation/`

  const hasWebsite = Object.prototype.hasOwnProperty.call(key, 'website')

  if (hasWebsite) return `${requestUri}${key.website}`

  throw new Error('site-navigation content source requires a website')
}

export default {
  resolve,
  schemaName: 'navigation',
  params: {
    website: 'text'
  }
}