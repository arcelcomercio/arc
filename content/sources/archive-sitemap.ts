import { ConentSourceBase } from 'types/content-source'

export type ArchiveSitemapQuery = {
  year?: number
  month?: number
  day?: number
}

type ArchiveSitemapParams = ArchiveSitemapQuery & ConentSourceBase

const params = [
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
    name: 'day',
    displayName: 'Día',
    type: 'number',
  },
]

const fetch = (key: ArchiveSitemapParams): ArchiveSitemapQuery => {
  const { year, month, day } = key

  return {
    year,
    month,
    day,
  }
}

export default {
  fetch,
  params,
}
