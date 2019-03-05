const resolve = query => {
  const requestUri = `/site/v3/navigation/${query.website}/?hierarchy=${
    query.hierarchy
  }`

  const hasWebsite = Object.prototype.hasOwnProperty.call(query, 'website')
  const hasHierarchy = Object.prototype.hasOwnProperty.call(query, 'hierarchy')

  if (hasWebsite && hasHierarchy) return requestUri

  throw new Error('This content source requires a website and hierarchy')
}

export default {
  resolve,
  schemaName: 'story',
  params: {
    website: 'text',
    hierarchy: 'text',
  },
}
