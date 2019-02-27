const resolve = (query) => {
  const requestUri = `/site/v3/navigation/`

  const hasWebsite = Object.prototype.hasOwnProperty.call(query, 'website')

  if (hasWebsite) return `${requestUri}${query.website}`

  throw new Error('site-navigation content source requires a website')
}

export default {
  resolve,
  schemaName: 'section',
  params: {
    website: 'text'
  }
}