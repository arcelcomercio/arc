import Consumer from 'fusion:consumer'
import { localISODate } from '../../../utilities/helpers'

/**
 * @description Sitemap estándar para la web de Mag.
 *
 * @returns {Object} Objeto con estructura manipulable por
 * xmlBuilder, para construir sitemaps estándar para la web de Mag.
 */

const SOURCE = 'story-feed-by-section'
const MAG_PATH = '/mag'

@Consumer
class XmlMagStoriesSitemapWeb {
  constructor(props) {
    this.props = props
    const { arcSite } = props

    this.fetchContent({
      stories: {
        source: SOURCE,
        query: {
          website: 'elcomerciomag',
          stories_qty: 100,
          presets: 'no-presets',
          includedFields: `websites.${arcSite}.website_url,display_date`,
        },
        transform: data => {
          if (!data) return []
          const { content_elements: stories } = data
          return stories
        },
      },
    })
  }

  render() {
    const { arcSite, siteProperties: { siteUrl = '' } = {} } = this.props

    const { stories } = this.state || {}

    if (!stories) {
      return null
    }

    const sitemap = {
      urlset: stories.map(story => {
        const { display_date: date = '', websites = {} } = story
        const { website_url: websiteLink } = websites[arcSite] || {}

        return {
          url: {
            loc: `${siteUrl}${MAG_PATH}${websiteLink || ''}`,
            lastmod: localISODate(date || ''),
            changefreq: 'hourly',
            priority: '1.0',
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

export default XmlMagStoriesSitemapWeb
