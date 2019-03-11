const resolve = key => {
  const requestUri = `/content/v4/search/published?sort=publish_date:desc&from=0&size=10&${
    key.website
  }=elcomercio&body={%22query%22:{%22bool%22:{%22must%22:[{%22term%22:{%22type%22:%22story%22}},{%22term%22:{%22revision.published%22:%22true%22}},{%22simple_query_string%22:{%22query%22:%22${
    key.search
  }%22}}]}}}`

  const hasWebsite = Object.prototype.hasOwnProperty.call(key, 'website')
  const hasSearch = Object.prototype.hasOwnProperty.call(key, 'search')

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
