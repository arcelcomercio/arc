import { ConentSourceBase } from 'types/content-source'

export type SitemapSectionDateQuery = {
  section?: string
  year?: number
  month?: number
}

type SitemapSectionDateParams = SitemapSectionDateQuery & ConentSourceBase

const params = [
  {
    name: 'section',
    displayName: 'Seccion',
    type: 'string',
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
]

const fetch = (key: SitemapSectionDateParams): SitemapSectionDateQuery => {
  const { year, month, section } = key

  return {
    section,
    year,
    month,
  }
}

export default {
  fetch,
  params,
}
