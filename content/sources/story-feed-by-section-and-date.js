import { resizerSecret } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'
import {
  addResizedUrlsToStory,
  getYYYYMMDDfromISO,
  getActualDate,
  formatSlugToText,
} from '../../components/utilities/helpers'

let globalParams = {}

const schemaName = 'stories'
let website = ''

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

const getNextDate = date => {
  const requestedDate = new Date(date)
  requestedDate.setDate(requestedDate.getDate() + 1)
  return getYYYYMMDDfromISO(requestedDate)
}

const transform = data => {
  const dataStories = data
  const { resizerUrl, siteName } = getProperties(website)
  dataStories.content_elements = addResizedUrlsToStory(
    dataStories.content_elements,
    resizerUrl,
    resizerSecret,
    addResizedUrls
  )
  dataStories.siteName = siteName

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
  const { section, date } = key

  /** Para enviar params a transform luego */
  globalParams = {
    section_name: formatSlugToText(section || 'todas'),
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
              display_date: {
                gte: `${globalParams.date}T05:00:00`,
                lte: `${getNextDate(globalParams.date)}T04:59:59`,
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

  // Por defecto, los API's están limitados a 100 notas como máximo (no va a llegar a 500)
  const requestUri = `/content/v4/search/published?sort=display_date:desc&website=${website}&body=${JSON.stringify(
    body
  )}&from=0&size=100`

  return requestUri
}

const resolve = key => pattern(key)

const source = {
  resolve,
  schemaName,
  transform,
  params,
  // cache: false,
  ttl: 120,
}

export default source
