const resolve = key => {
  if (!key.website) {
    throw new Error('This content source requires a website')
  }
  if (!key.slugTag) {
    throw new Error('This content source requires a tag')
  }
  if (!key.page) {
    throw new Error('This content source requires a page')
  }
  if (!key.amountStories) {
    throw new Error('This content source requires an stories amount')
  }
  const validateFrom = () => {
    if (key.currentNumPage !== '1' && key.currentNumPage) {
      return (key.currentNumPage - 1) * key.amountStories
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
          {
            term: {
              'taxonomy.tags.slug': key.slugTag,
            },
          },
        ],
      },
    },
  }

  const requestUri = `/content/v4/search/published?sort=publish_date:desc&website=${
    key.website
  }&from=${validateFrom()}&size=${key.amountStories}&body=${JSON.stringify(
    body
  )}`

  return requestUri
}

export default {
  resolve,
  schemaName: 'stories',
  params: {
    page: 'text',
    website: 'text',
    slugTag: 'text',
    currentNumPage: 'number',
    amountStories: 'number',
  },
}
