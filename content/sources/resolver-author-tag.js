const resolve = key => {
  const {
    website,
    page,
    name,
    currentNumPage,
    amountStories
  } = key

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
        must: [{
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

  let requestUri = ''

  /** TODO: Separar estas consultas de autor y tag */
  /** TODO: La consulta se debe hacer por SLUG, no por URL del autor */
  if (page === 'autor') {
    /*     body.query.bool.must.push({
          term: {
            'credits.by.url': `/autor/${name}`,
          },
        }) */
    const authorUrl = `/autor/${name}`
    requestUri = `/content/v4/search/published?q=canonical_website:${website}+AND+credits.by.url:${authorUrl}&size=${amountStories}&from=${validateFrom()}&sort=display_date:desc&website=${website}`
  }
  if (page === 'noticias') {
    body.query.bool.must.push({
      term: {
        'taxonomy.tags.slug': name,
      },
    })
    requestUri = `/content/v4/search/published?sort=publish_date:desc&website=${website}&from=${validateFrom()}&size=${amountStories}&body=${JSON.stringify(
      body
    )}`
  }

  return requestUri
}

export default {
  resolve,
  schemaName: 'stories',
  params: [{
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
      displayName: 'Slug del autor/tag',
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