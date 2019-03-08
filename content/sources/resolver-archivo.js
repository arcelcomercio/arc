let globalParams = {}

const getActualDate = () => {
  const today = new Date()
  let dd = today.getDate()
  let mm = today.getMonth() + 1 // January is 0!

  const yyyy = today.getFullYear()
  if (dd < 10) {
    dd = `0${dd}`
  }
  if (mm < 10) {
    mm = `0${mm}`
  }
  return `${yyyy}-${mm}-${dd}`
}

const resolve = key => {
  if (!key.website) {
    throw new Error('This content source requires a website')
  }
  if (!key.fullPath) {
    throw new Error('This content source requires a fullPath')
  }

  // /archivo/seccion/18-09     ["", "archivo", "seccion", "18-09"]
  const auxValues = key.fullPath.split('/')
  const params = {
    page: auxValues[1],
    section: auxValues[2] ? auxValues[2] : '',
    date: auxValues[3] ? auxValues[3] : '',
  }
  globalParams = params

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
                gte: `${
                  params.date ? params.date : getActualDate()
                }T00:00:00-05:00`, // 2019-03-05T00:00:00-05:00
                lte: `${
                  params.date ? params.date : getActualDate()
                }T23:59:59-05:00`, // 2019-03-06T00:00:00-05:00
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
    params: globalParams,
  }
  return aux
}

export default {
  resolve,
  schemaName: 'stories',
  transform,
  params: {
    website: 'text',
    fullPath: 'text',
  },
}
