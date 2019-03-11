const resolve = key => {
  let requestUri = ``

  if (!key.news_number) {
    key.news_number = 1
  }

  const numero = key.news_number
  if (key.section) {
    if (key.section === '*') {
      requestUri = `/content/v4/search/published?sort=publish_date:desc&from=0&size=${numero}&q=`
    } else {
      requestUri = `/content/v4/search/published/?q=taxonomy.sites.path:`
      requestUri = `${requestUri}"${
        key.section
      }"&sort=publish_date:desc&from=0&size=${numero}`
    }
  } else {
    throw new Error('Lista-component content source requires a section')
  }

  if (key.website) {
    requestUri = `${requestUri}&website=${key.website}`
  } else {
    throw new Error('Lista-component content source requires a website')
  }

  return requestUri
}

export default {
  resolve,
  schemaName: 'stories',
  params: {
    website: 'text',
    news_number: 'number',
    section: 'text',
  },
}
