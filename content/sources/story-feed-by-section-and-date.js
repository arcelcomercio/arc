import { getActualDate } from '../../resources/utilsJs/helpers'

let globalParams = {}

const schemaName = 'stories'

const params = [
  {
    name: 'section',
    displayName: 'Sección',
    type: 'text',
  },
  {
    name: 'date',
    displayName: 'Fecha',
    type: 'text',
  },
]

const transform = data => {
  const aux = {
    ...data,
    params: {
      ...globalParams,
    },
  }
  return aux
}

const pattern = (key = {}) => {
  const website = key['arc-site'] || 'Arc Site is not defined'
  const { section, date } = key

  /** Para enviar params a transform luego */
  globalParams = {
    section: section || 'todas',
    date: date || getActualDate(),
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
                gte: `${globalParams.date}T00:00:00-05:00`, // 2019-03-05T00:00:00-05:00
                lte: `${globalParams.date}T23:59:59-05:00`, // 2019-03-06T00:00:00-05:00
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
              canonical_website: website,
            },
          },
        ],
      },
    },
  }

  /** Filtra por sección sólo cuando sea lo que se busca */
  if (globalParams.section !== 'todas') {
    body.query.bool.must.push({
      nested: {
        path: 'taxonomy.sections',
        query: {
          bool: {
            must: [
              {
                terms: {
                  'taxonomy.sections._id': [`/${section}`],
                },
              },
              {
                term: {
                  'taxonomy.sections._website': website,
                },
              },
            ],
          },
        },
      },
    })
  }

  const requestUri = `/content/v4/search/published?sort=publish_date:desc&website=${website}&body=${JSON.stringify(
    body
  )}`

  return requestUri
}

const resolve = key => pattern(key)

const source = {
  resolve,
  schemaName,
  transform,
  params,
}

export default source
