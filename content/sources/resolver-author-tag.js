const resolve = key => {
  const { website, page, name, currentNumPage, amountStories } = key

  if (!website) {
    throw new Error('This content source requires a website')
  }
  if (!name) {
    throw new Error('This content source requires a name')
  }
  if (!page) {
    throw new Error('This content source requires a page')
  }
  if (!amountStories) {
    throw new Error('This content source requires an stories amount')
  }
  const validateFrom = () => {
    if (currentNumPage !== '1' && currentNumPage) {
      return (currentNumPage - 1) * amountStories
    }
    return '0'
  }

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

  if (page === 'autor') {
    body.query.bool.must.push({
      term: {
        'credits.by._id': name, // patricia-del-rio
      },
    })
  }
  if (page === 'noticias') {
    body.query.bool.must.push({
      term: {
        'taxonomy.tags.slug': name,
      },
    })
  }

  const requestUri = `/content/v4/search/published?sort=publish_date:desc&website=${website}&from=${validateFrom()}&size=${amountStories}&body=${JSON.stringify(
    body
  )}`

  return requestUri
}

export default {
  resolve,
  schemaName: 'stories',
  params: [
    {
      name: 'website',
      displayName: 'Sitio web',
      type: 'text',
    },
    {
      name: 'page',
      displayName: 'Página (autor o tag)',
      type: 'text',
    },
    {
      name: 'name',
      displayName: 'Nombre del autor/tag',
      type: 'text',
    },
    {
      name: 'currentNumPage',
      displayName: 'Número de página actual',
      type: 'number',
    },
    {
      name: 'amountStories',
      displayName: 'Número de noticias por página',
      type: 'number',
    },
  ],
}
