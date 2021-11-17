import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'

import { localISODate } from '../../../utilities/date-time/dates'

const OUTPUTTYPE = '?outputType=xml'
// const MIN_YEAR = 2014

/**
 * @description Muestra los sitemaps de archivo disponible, por anio.
 *
 * @returns {Object} Objeto con estructura manipulable por
 * xmlBuilder, para construir los sitemaps de archivo disponible, por anio.
 */

@Consumer
class XmlArchiveSitemap {
  constructor(props) {
    this.props = props
    const { customFields } = this.props
    this.fetchContent({
      sections: {
        source:
          customFields?.hierarchy?.contentService || 'navigation-by-hierarchy',
        query: customFields?.hierarchy?.contentConfigValues || {
          hierarchy: 'sitemap-archivo-secciones',
        },
      },
    })
  }

  dateRange = (startDate, endDate) => {
    const start = startDate.split('-')
    const end = endDate.split('-')
    const startYear = parseInt(start[0], 10)
    const endYear = parseInt(end[0], 10)
    const dates = []

    for (let i = startYear; i <= endYear; i++) {
      const endMonth = i !== endYear ? 11 : parseInt(end[1], 10) - 1
      const startMon = i === startYear ? parseInt(start[1], 10) - 1 : 0
      for (let j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
        const month = j + 1
        const displayMonth = month < 10 ? `0${month}` : month
        dates.unshift([i, displayMonth].join('/'))
      }
    }
    return dates
  }

  render() {
    const { sections } = this.state
    const { siteProperties: { siteUrl = '' } = {}, customFields } = this.props

    const localDate = localISODate()
    const formatedLocalDate = new Date(localDate)

    const endDate =
      customFields?.endDate ||
      `${formatedLocalDate.getFullYear()}-${formatedLocalDate.getMonth() + 1}`
    const startDate = customFields?.startDate || '2016-01'

    const sitemaps = {
      sitemapindex: [
        {
          '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
        },
      ],
    }

    sections?.children?.forEach((section) => {
      sitemaps.sitemapindex = [
        ...sitemaps.sitemapindex,
        {
          sitemap: {
            loc: `${siteUrl}/sitemap${section?._id}/${OUTPUTTYPE}`,
            lastmod: localDate,
          },
        },
      ]
      this.dateRange(startDate, endDate).forEach((date, i) => {
        const currentFormatDate = new Date(date)
        sitemaps.sitemapindex = [
          ...sitemaps.sitemapindex,
          {
            sitemap: {
              loc: `${siteUrl}/sitemap${section?._id}/${date}/${OUTPUTTYPE}`,
              lastmod:
                i === 0
                  ? localDate
                  : `${
                      new Date(
                        currentFormatDate.getFullYear(),
                        currentFormatDate.getMonth() + 1,
                        0,
                        24,
                        0,
                        -1
                      )
                        .toISOString()
                        .split('.')[0]
                    }-05:00`,
            },
          },
        ]
      })
    })

    return sitemaps
  }
}

XmlArchiveSitemap.propTypes = {
  customFields: PropTypes.shape({
    hierarchy: PropTypes.contentConfig('navigation').tag({
      name: 'Editar navegación',
      group: 'Editar jerarquía',
    }),
    endDate: PropTypes.string.tag({
      name: 'Fecha final',
      description:
        'Formato AAAA-MM (p.e 2021-06). Por defecto se usa la fecha actual',
    }),
    startDate: PropTypes.string.tag({
      name: 'Fecha inicial',
      description: 'Formato AAAA-MM (p.e 2020-06). Por defecto se usa 2016-01',
    }),
  }),
}

export default XmlArchiveSitemap
