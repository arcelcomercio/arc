import Consumer from 'fusion:consumer'

import { localISODate } from '../../../utilities/date-time/dates'

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

    // tracking de los tags que ya se han incluido para no tener duplicados
    const tags = []
    const sitemap = {
      urlset: [],
    }

    if (this.state)
      Object.keys(this.state).forEach((key) => {
        const { content_elements: contentElements = [] } =
          (key && this.state[key]) || {}

        contentElements.forEach((story) => {
          if (story.taxonomy.tags)
            story.taxonomy.tags.every((tag) => {
              if (sitemap.urlset.length < 1000 && !tags.includes(tag.slug)) {
                sitemap.urlset.push({
                  url: {
                    loc: `${siteUrl}/noticias/${tag.slug || ''}/`,
                    lastmod: localISODate(story.publish_date),
                  },
                })
                tags.push(tag.slug)
                return true
              }
              return false
            })
        })
      })

    if (tags.length === 0) {
      return null
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
