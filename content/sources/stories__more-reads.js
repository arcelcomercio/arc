const resolve = key => {
  const requestUri = `/content/v4/search/published?q=taxonomy.sites.path:"/${
    key.section
  }"&sort=publish_date:desc&from=0&size=${key.num_notes}&website=${key.website}`
  return requestUri
}

export default {
  resolve,
  schemaName: 'stories',
  params: {
    section: 'text',
    website: 'text',
    num_notes: 'number',
  },
}