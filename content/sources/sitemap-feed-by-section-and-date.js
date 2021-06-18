import getProperties from 'fusion:properties'
import { removeLastSlash } from '../../components/utilities/parse/strings'
import { getResizedImageData } from '../../components/utilities/resizer/resizer'

const SCHEMA_NAME = 'stories-dev'

const params = [
  {
    name: 'section',
    displayName: 'Section(es)',
    type: 'text',
  },
  {
    name: 'stories_qty',
    displayName: 'Cantidad de historias',
    type: 'number',
  },
  {
    name: 'presets',
    displayName: 'Tamaño de las imágenes (opcional)',
    type: 'text',
  },
  {
    name: 'from',
    displayName: 'Nota Inicial',
    type: 'number',
  },
  {
    name: 'date',
    displayName: 'Fecha',
    type: 'text',
  },
]
export const getCurrentDate = (date): string => {
  const today = date ? new Date(date) : new Date()
  today.setHours(today.getHours() - 5)
  return `${today.toISOString().split('.')[0]}`
}

const getPrevDate = (date) => {
  const requestedDate = new Date(date)
  requestedDate.setDate(requestedDate.getDate() - 2)
  return `${requestedDate.toISOString().split('.')[0]}`
}

const getLastHourDate = (date) => {
  const lastHour = new Date(date)
  lastHour.setDate(lastHour.getDate() + 1)
  lastHour.setSeconds(lastHour.getSeconds() - 1)
  return `${lastHour.toISOString().split('.')[0]}`
}

const resolve = (key = {}) => {
  const website = key['arc-site'] || 'Arc Site no está definido'
  const { section, stories_qty: storiesQty, from, date } = key
  const clearSection =
    section === '' ||
    section === undefined ||
    section === null ||
    section === '/'
      ? '/'
      : removeLastSlash(section)

  const initialDate =
    date === null || date === '' || !date
      ? getCurrentDate()
      : getLastHourDate(date)

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
                lte: initialDate,
                gte: getPrevDate(initialDate),
              },
            },
          },
        ],
      },
    },
  }

  if (clearSection !== '/') {
    body.query.bool.must.push({
      nested: {
        path: 'taxonomy.sections',
        query: {
          bool: {
            must: [
              {
                terms: {
                  'taxonomy.sections._id': [clearSection],
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

  const encodedBody = encodeURI(JSON.stringify(body))
  const sourceExclude = `&_sourceExclude=owner,address,workflow,label,content_elements,type,revision,language,source,distributor,planning,additional_properties,publishing,related_content`

  return `/content/v4/search/published?body=${encodedBody}&website=${website}&size=${
    storiesQty || 100
  }&from=${from || 0}&sort=display_date:desc${sourceExclude}`
}

const transform = (data, { 'arc-site': arcSite, presets }) => {
  const { siteName } = getProperties(arcSite)
  const dataStory = getResizedImageData(data, presets, arcSite)
  dataStory.siteName = siteName

  return {
    ...dataStory,
  }
}

const source = {
  resolve,
  transform,
  schemaName: SCHEMA_NAME,
  params,
  ttl: 120,
}

export default source
