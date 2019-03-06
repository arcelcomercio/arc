const resolve = key => {
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
            range: {
              publish_date: {
                gte: `${key.startDate}T00:00:00-05:00`, // 2019-03-05T00:00:00-05:00
                lte: `${key.finalDate}T23:59:59-05:00`, // 2019-03-06T00:00:00-05:00
              },
            },
          },
          {
            term: {
              'revision.published': 'true',
            },
          },
          {
            term: {
              'taxonomy.sites.path': `/${key.section}`,
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
    section: 'text',
    startDate: 'text',
    finalDate: 'text',
  },
}
