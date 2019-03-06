const resolve = key => {
  const requestUri = `/site/v3/navigation/${key.website}/?hierarchy=${key.hierarchy}`

  const hasWebsite = Object.prototype.hasOwnProperty.call(key, 'website')
  const hasHierarchy = Object.prototype.hasOwnProperty.call(key, 'hierarchy')

  if (hasWebsite && hasHierarchy)
    return requestUri

  throw new Error('This content source requires a website and hierarchy')
}

export default {
  resolve,
  schemaName: 'navigation',
  params: {
    website: 'text',
    hierarchy: 'text'
  }
}