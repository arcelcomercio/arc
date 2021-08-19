import Consumer from 'fusion:consumer'

import { localISODate } from '../../../utilities/date-time/dates'

/**
 * @description Muestra listado de historias para fecha especifica.
 *
 * @returns {Object} Objeto con estructura manipulable por
 * xmlBuilder, para construir listado de historias para fecha especifica.
 */

@Consumer
class XmlSitemapWebByYearMonth {
  constructor(props) {
    this.props = props
    const { globalContent } = props
    const { year, month, section } = globalContent || {}

    this.fetchContent(this.getStates(section, year, month))
  }

  getStates = (section, year, month) => {
    const interval = 100
    const states = {}

    let count = 0
    // MAX 1000 historias
    while (count <= 9) {
      states[`data${count}`] = {
        source: 'sitemap-feed-by-section-year-month',
        query: {
          section,
          year,
          month,
          from: count * interval,
          size: interval,
        },
      }
      count += 1
    }
    return { ...states }
  }

  render() {
    const { arcSite, siteProperties: { siteUrl = '' } = {} } = this.props

    const stories = []
    if (this.state)
      Object.keys(this.state).forEach((key) => {
        const { content_elements: contentElements = [] } =
          (key && this.state[key]) || {}
        stories.push(...contentElements)
      })

    if (!stories) {
      return null
    }

    const sitemap = {
      urlset: stories.map((story) => {
        const {
          websites: { [arcSite]: { website_url: websiteLink } = {} } = {},
        } = story

        return {
          url: {
            loc: `${siteUrl}${websiteLink || ''}`,
            lastmod: localISODate(
              arcSite === 'elcomercio'
                ? story.publish_date
                : story.display_date || ''
            ),
            changefreq: arcSite === 'elcomercio' ? 'always' : 'hourly',
            priority: arcSite === 'elcomercio' ? '0.5' : '1.0',
          },
        }
      }),
    }

    sitemap.urlset.push({
      '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
    })

    return sitemap
  }
}

export default XmlSitemapWebByYearMonth
