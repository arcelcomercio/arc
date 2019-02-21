
const resolve = (query) => {
  const requestUri = `/site/v3/navigation/${query.website}/?hierarchy=${query.hierarchy}`
  
  if(query.hasOwnProperty('website') && query.hasOwnProperty('website') )
    return requestUri
  
  throw new Error('site-navigation content source requires a website')
}

export default {
  resolve,
  schemaName: 'section',
  params: {
    website: 'text',
    hierarchy: 'text'
  }
}