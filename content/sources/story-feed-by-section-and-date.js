import getProperties from 'fusion:properties'
import RedirectError from '../../components/utilities/redirect-error'
import { formatSlugToText } from '../../components/utilities/parse/strings'
import {
  getYYYYMMDDfromISO,
  getActualDate,
} from '../../components/utilities/date-time/dates'
import { getResizedImageData } from '../../components/utilities/resizer/resizer'

let globalParams = {}

const schemaName = 'stories-dev'

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
  {
    name: 'presets',
    displayName: 'Tamaño de las imágenes (opcional)',
    type: 'text',
  },
]

const getNextDate = date => {
  const requestedDate = new Date(date)
  requestedDate.setDate(requestedDate.getDate() + 1)
  return getYYYYMMDDfromISO(requestedDate)
}

const transform = (data, { 'arc-site': website, presets }) => {
  const { siteName } = getProperties(website)
  const dataStories = getResizedImageData(data, presets, website)
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
  const website = key['arc-site'] || 'Arc Site no está definido'
  const { section, date } = key

  if (new Date(date).getFullYear() < 2009) throw new RedirectError(`/410`, 410)

  /** Para enviar params a transform luego */
  globalParams = {
    section_name: formatSlugToText(section) || 'Todas',
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

  const excludedFields =
    '&_sourceExclude=owner,address,workflow,label,content_elements,type,revision,language,source,distributor,planning,additional_properties,publishing,website'

  // Por defecto, los API's están limitados a 100 notas como máximo (no va a llegar a 500)
  const requestUri = `/content/v4/search/published?sort=display_date:desc&website=${website}&body=${JSON.stringify(
    body
  )}&from=0&size=100${excludedFields}`

  return requestUri
}

const resolve = key => pattern(key)

const source = {
  resolve,
  schemaName,
  transform,
  params,
  ttl: 120,
}

export default source
