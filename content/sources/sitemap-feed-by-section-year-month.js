import { getYYYYMMDDfromISO } from '../../components/utilities/date-time/dates'
import RedirectError from '../../components/utilities/redirect-error'

const schemaName = 'stories-dev'

const params = [
  {
    name: 'section',
    displayName: 'Sección',
    type: 'text',
  },
  {
    name: 'year',
    displayName: 'Año',
    type: 'number',
  },
  {
    name: 'month',
    displayName: 'Mes',
    type: 'number',
  },
  {
    name: 'from',
    displayName: 'Noticia inicial',
    type: 'number',
  },
]

const getLastDate = (date) => {
  const requestedDate = new Date(date)
  const lastDate = new Date(
    requestedDate.getFullYear(),
    requestedDate.getMonth() + 1,
    0
  )
  return getYYYYMMDDfromISO(lastDate)
}

const getQueryFilter = (section, website, date) => {
  const body = {
    query: {
      bool: {
        must: [
          {
            term: {
              type: 'story',
            },
          },
        ],
      },
    },
  }

  if (section !== '/') {
    //  Solo si hay una seccion definida
    body.query.bool.must.push({
      nested: {
        path: 'taxonomy.sections',
        query: {
          bool: {
            must: [
              {
                terms: {
                  'taxonomy.sections._id': [section],
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

  if (date) {
    body.query.bool.must.push({
      range: {
        display_date: {
          gte: `${date}T05:00:00`,
          lte: `${getLastDate(date)}T23:59:59`,
        },
      },
    })
  }

  const queryFilter = `body=${encodeURI(JSON.stringify(body))}`

  return queryFilter
}

const resolve = (key = {}) => {
  const website = key['arc-site'] || 'Arc Site no está definido'
  const {
    section: auxSection = '/',
    year: auxYear,
    month: auxMonth,
    from,
    size,
    includedFields,
  } = key

  if (auxYear < 2009) throw new RedirectError(`/410`, 410)

  const section = auxSection === null || !auxSection ? '/' : `/${auxSection}`
  const date = auxYear && auxMonth ? `${auxYear}-${auxMonth}-01` : null

  const queryFilter = getQueryFilter(section, website, date)

  const sourceInclude = includedFields
    ? `&_sourceInclude=${includedFields}`
    : `&_sourceInclude=websites.${website}.website_url,_id,display_date,publish_date`

  const requestUri = `/content/v4/search/published?${queryFilter}&sort=display_date:desc&website=${website}&from=${
    from || 0
  }&size=${size || 100}${sourceInclude}`
  return requestUri
}

const source = {
  resolve,
  schemaName,
  params,
  ttl: 120,
}

export default source
