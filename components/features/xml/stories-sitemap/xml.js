import Consumer from 'fusion:consumer'
import StoryData from '../../../utilities/story-data'

/**
 * @description Este feature obtiene los datos que necesita desde "globalContent" y
 * funciona mejor con la content-source "sitemap-feed-by-section"
 *
 * @returns {Object} Objeto con estructura manipulable por
 * xmlBuilder, para construir sitemaps.
 */

@Consumer
class XmlStoriesSitemap {
  constructor(props) {
    this.props = props
  }

  localISODate = date => {
    let localDate = date ? new Date(date) : new Date()
    localDate.setHours(localDate.getHours() - 5)
    localDate = `${localDate.toISOString().split('.')[0]}-05:00`
    return localDate
  }

  promoItemHeadlines = ({ promo_items: promoItems }) => {
    if (!promoItems) return ''
    const item = Object.values(promoItems)[0]
    return item.caption || (item.headlines && item.headlines.basic)
  }

  render() {
    const {
      globalContent,
      deployment,
      contextPath,
      arcSite,
      siteProperties: { sitemapNewsName = '', siteUrl = '' } = {},
    } = this.props
    const { content_elements: stories } = globalContent || {}

    console.log('----=-=-=-=-=-=>', stories)
    if (!stories) {
      return null
    }

    const storyData = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize: 'sm',
    })

    const sitemap = {
      urlset: stories.map(story => {
        storyData.__data = story
        return {
          url: {
            loc: `${siteUrl}${storyData.link}`,
            lastmod: this.localISODate(storyData.publishDate),
            'news:news': {
              'news:publication': {
                'news:name': sitemapNewsName,
                'news:language': 'es',
              },
              'news:publication_date': this.localISODate(storyData.date),
              'news:title': storyData.title,
              'news:keywords': {
                '#cdata':
                  storyData.seoKeywords.toString() ||
                  storyData.tags.toString() ||
                  arcSite,
              },
            },
            'image:image': {
              'image:loc': storyData.multimediaLandscapeL,
              'image:title': {
                '#cdata': this.promoItemHeadlines(story),
              },
            },
            changefreq: 'hourly',
            priority: '0.5',
          },
        }
      }),
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

export default XmlStoriesSitemap
