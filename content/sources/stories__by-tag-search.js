const resolve = key => {
  const requestUri = `https://api.sandbox.elcomercio.arcpublishing.com/content/v4/search/published?q=taxonomy.tags.text:%22${
    key.search
  }%22&sort=publish_date:desc&from=0&size=10&website=${key.website}`

  //se recomienda encodear la api por url
  //o sea tratar el texto de busqueda par que sea compatible con la uri .. %20%
  const hasSearch = Object.prototype.hasOwnProperty.call(key, 'search')
  const hasWebsite = Object.prototype.hasOwnProperty.call(key, 'website')

  if (hasSearch && hasWebsite) return requestUri

  throw new Error('This content source requires a search critery and a website')
}

export default {
  resolve,
  schemaName: 'stories',
  params: {
    website: 'text',
    search: 'text',
  },
}