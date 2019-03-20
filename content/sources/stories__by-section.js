const resolve = key => {
  // Si no se define el "section" te trae todas las secciones
  // Si no se define el "news_number" te trae máximo 10 stories

  if (!key.website) {
    throw new Error('This content source requires a website')
  }
  const sizeFilter = key.news_number ? `&from=0&size=${key.news_number}` : ''

  const body = {
    query: {
      bool: {
        must: [
          {
            term: {
              type: 'story',
            },
          },
          {
            term: {
              'revision.published': 'true',
            },
          },
        ],
      },
    },
  }

  if (key.section) {
    body.query.bool.must.push({
      term: {
        'taxonomy.sites.path': `/${key.section}`,
      },
    })
  }

  const requestUri = `/content/v4/search/published?sort=publish_date:desc&website=${
    key.website
  }&body=${JSON.stringify(body)}${sizeFilter}`

  return requestUri
}

export default {
  resolve,
  schemaName: 'stories',
  params: {
    website: 'text',
    section: 'text',
    news_number: 'number',
  },
}
