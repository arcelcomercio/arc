import {
  getActualDate
} from '../../resources/utilsJs/helpers'

let globalParams = {}

const resolve = key => {
  if (!key.website) {
    throw new Error('This content source requires a website')
  }

  const params = {
    page: key.page && key.page,
    section: key.section ? key.section : 'todas',
    date: key.date ? key.date : getActualDate(),
  }
  globalParams = {
    ...params
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
            range: {
              publish_date: {
                gte: `${params.date}T00:00:00-05:00`, // 2019-03-05T00:00:00-05:00
                lte: `${params.date}T23:59:59-05:00`, // 2019-03-06T00:00:00-05:00
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

  if (params.section !== 'todas') {
    body.query.bool.must.push({
      term: {
        'taxonomy.sites.path': `/${params.section}`,
      },
    })
  }

  const requestUri = `/content/v4/search/published?sort=publish_date:desc&website=${
    key.website
  }&body=${JSON.stringify(body)}`

  return requestUri
}

const transform = data => {
  const aux = {
    ...data,
    params: {
      ...globalParams
    },
  }
  return aux
}

export default {
  resolve,
  schemaName: 'stories',
  transform,
  params: {
    website: 'text',
    page: 'text',
    section: 'text',
    date: 'text',
  },
}