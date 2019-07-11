import {
  resizerSecret
} from 'fusion:environment'
import {
  addResizedUrls
} from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'

let globalParams = {}

const schemaName = 'stories'
let website = ''

const params = [{
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

const getActualDate = () => {
  const today = new Date()

  if (today.getHours() <= 5)
    today.setDate(today.getDate() - 1)

  return today.toISOString().match(/\d{4}-\d{2}-\d{2}/)[0]
}

const itemsToArrayImge = data => {
  const {
    resizerUrl
  } = getProperties(website)

  return data.map(item => {
    return addResizedUrls(item, {
      resizerUrl,
      resizerSecret,
      presets: {
        small: {
          width: 100,
          height: 200,
        },
        medium: {
          width: 480,
        },
        large: {
          width: 940,
          height: 569,
        },
        amp: {
          width: 600,
          height: 375,
        },
      },
    })
  })
}

const transform = data => {
  const dataStories = data
  dataStories.content_elements = itemsToArrayImge(dataStories.content_elements)
  const aux = {
    ...dataStories,
    params: {
      ...globalParams,
    },
  }
  return aux
}

const pattern = (key = {}) => {
  website = key['arc-site'] || 'Arc Site no está definido'
  const {
    section,
    date
  } = key

  /** Para enviar params a transform luego */
  globalParams = {
    section: section || 'todas',
    date: date || getActualDate(),
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
                gte: `${globalParams.date}T00:00:00`, // 2019-03-05T00:00:00-05:00
                lte: `${globalParams.date}T23:59:59`, // 2019-03-06T00:00:00-05:00
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

  /** Filtra por sección sólo cuando sea lo que se busca */
  if (globalParams.section !== 'todas') {
    body.query.bool.must.push({
      nested: {
        path: 'taxonomy.sections',
        query: {
          bool: {
            must: [{
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

  // TODO: Por defecto, los API's están limitados a 100 notas como máximo (no va a llegar a 500)
  const requestUri = `/content/v4/search/published?sort=publish_date:desc&website=${website}&body=${JSON.stringify(
    body
  )}&from=0&size=500`

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