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
class XmlSitemapWeb {
  constructor(props) {
    this.props = props
    const { globalContentConfig, arcSite } = props
    const { query: { _id: section } = {} } = globalContentConfig || {}

    const includedFields = `websites.${arcSite}.website_url,publish_date`

    this.fetchContent(this.getStates(section, 'no-presets', includedFields))
  }

  getStates = (section, presets, includedFields) => {
    const interval = 100
    const states = {}

    let count = 0
    // MAX 500 historias
    while (count <= 4) {
      states[`data${count}`] = {
        source: 'story-feed-by-section',
        query: {
          section,
          feedOffset: count * interval,
          stories_qty: interval,
          presets,
          includedFields,
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
      Object.keys(this.state).forEach(key => {
        const { content_elements: contentElements = [] } =
          (key && this.state[key]) || {}
        stories.push(...contentElements)
      })

    if (!stories) {
      return null
    }

    const sitemap = {
      urlset: stories.map(story => {
        const {
          publish_date: date,
          websites: { [arcSite]: { website_url: websiteLink } = {} } = {},
        } = story

        return {
          url: {
            loc: `${siteUrl}${websiteLink || ''}`,
            lastmod: localISODate(date || ''),
            changefreq: 'always',
            priority: '0.5',
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

export default XmlSitemapWeb
