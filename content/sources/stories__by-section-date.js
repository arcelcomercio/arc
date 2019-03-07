const resolve = key => {
  if (!key.website) {
    throw new Error('This content source requires a website')
  }
  if (!key.startDate || !key.finalDate) {
    throw new Error('This content source requires a start date and final date')
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
