const resolve = key => {
  if (!key.website) {
    throw new Error('This content source requires a website')
  }
  if (!key.author) {
    throw new Error('This content source requires an author')
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
              'credits.by._id': key.author, // patricia-del-rio
            },
          },
        ],
      },
    },
  }

  const requestUri = `/content/v4/search/published?sort=publish_date:desc&website=${
    key.website
  }&body=${JSON.stringify(body)}`

  return requestUri
}

export default {
  resolve,
  schemaName: 'stories',
  params: {
    website: 'text',
    author: 'text',
  },
}
