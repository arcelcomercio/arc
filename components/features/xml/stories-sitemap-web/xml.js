import Consumer from 'fusion:consumer'
import { localISODate } from '../../../utilities/helpers'

/**
 * @description Sitemap estándar para la web. Este feature obtiene los datos que necesita desde "globalContent" y
 * funciona mejor con la content-source "story-feed-by-section"
 *
 * @returns {Object} Objeto con estructura manipulable por
 * xmlBuilder, para construir sitemaps estándar para la web.
 */

@Consumer
class XmlStoriesSitemapWeb {
  constructor(props) {
    this.props = props
  }

  render() {
    const {
      globalContent,
      arcSite,
      siteProperties: { siteUrl = '' } = {},
    } = this.props
    const { content_elements: stories } = globalContent || {}

    if (!stories) {
      return null
    }

    const sitemap = {
      urlset: stories.map(story => {
        const {
          publish_date: date,
          display_date: displayDate,
          websites: { [arcSite]: { website_url: websiteLink } = {} } = {},
        } = story

        return {
          url: {
            loc: `${siteUrl}${websiteLink || ''}`,
            lastmod: localISODate(
              arcSite === 'elcomercio' ? date : displayDate || ''
            ),
            changefreq: arcSite === 'elcomercio' ? 'always' : 'hourly',
            priority: arcSite === 'elcomercio' ? '0.5' : '1.0',
          },
        }
      }),
    }

    // Attr
    sitemap.urlset.push({
      '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
    })

    return sitemap
  }
}

export default XmlStoriesSitemapWeb
