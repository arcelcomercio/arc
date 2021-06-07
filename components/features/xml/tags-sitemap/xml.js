import Consumer from 'fusion:consumer'
import { localISODate } from '../../../utilities/helpers'

/**
 * @description Sitemap para Google News. Este feature obtiene los datos que necesita desde "globalContent" y
 * funciona mejor con la content-source "story-feed-by-section"
 *
 * @returns {Object} Objeto con estructura manipulable por
 * xmlBuilder, para construir sitemaps para Google news.
 */

@Consumer
class XmlTagsSitemap {
  constructor(props) {
    this.props = props
    const { globalContentConfig } = props
    const { query: { _id: section } = {} } = globalContentConfig || {}

    const includedFields = `publish_date,taxonomy.tags.slug`

    this.fetchContent(this.getStates(section, includedFields))
  }

  getStates = (section, includedFields) => {
    const interval = 100
    const states = {}

    let count = 0
    // MAX 500 historias
    while (count <= 9) {
      states[`data${count}`] = {
        source: 'story-feed-by-section',
        query: {
          section,
          feedOffset: count * interval,
          stories_qty: interval,
          includedFields,
        },
      }
      count += 1
    }

    return { ...states }
  }

  promoItemHeadlines = ({ promo_items: promoItems }) => {
    if (!promoItems) return ''
    const { subtitle, caption } = Object.values(promoItems)[0] || {}

    return subtitle || caption || ''
  }

  render() {
    const { siteProperties: { siteUrl = '' } = {} } = this.props

    const tags = {}

    if (this.state)
      Object.keys(this.state).forEach((key) => {
        const { content_elements: contentElements = [] } =
          (key && this.state[key]) || {}

        contentElements.forEach((story) => {
          if (story.taxonomy.tags)
            story.taxonomy.tags.forEach((tag) => {
              if (!tags[tag.slug]) tags[tag.slug] = story.publish_date
            })
        })
      })

    if (!tags) {
      return null
    }

    const sitemap = {
      urlset: [],
    }

    for (const [key, value] of Object.entries(tags)) {
      if (sitemap.urlset.length < 1000)
        sitemap.urlset.push({
          url: {
            loc: `${siteUrl}/noticias/${key || ''}`,
            lastmod: localISODate(value),
          },
        })
      else break
    }

    // Attr
    sitemap.urlset.push({
      '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
      '@xmlns:news': 'http://www.google.com/schemas/sitemap-news/0.9',
      '@xmlns:image': 'http://www.google.com/schemas/sitemap-image/1.1',
    })

    return sitemap
  }
}

export default XmlTagsSitemap
