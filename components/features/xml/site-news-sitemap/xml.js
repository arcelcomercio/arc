import Consumer from 'fusion:consumer'
import StoryData from '../../../utilities/story-data'
import { localISODate } from '../../../utilities/helpers'
import {
  includePromoItems,
  includePromoItemsCaptions,
} from '../../../utilities/included-fields'

const SOURCE = 'story-feed-by-section'
const OUTPUTTYPE = '?outputType=amp'
const IMAGE_SIZE = 'amp_new'

/**
 * @description Sitemap principal con historias de todo el sitio.
 * Este feature obtiene los datos que necesita desde "globalContent" y
 * funciona mejor con la content-source "story-feed-by-section"
 *
 * @returns {Object} Objeto con estructura manipulable por
 * xmlBuilder, para construir sitemaps principal con historias de todo el sitio.
 */

@Consumer
class XmlSiteNewsSitemap {
  constructor(props) {
    this.props = props
    const { arcSite } = props

    this.fetchContent({
      data: {
        source: SOURCE,
        query: {
          section: '/',
          stories_qty: 100,
          presets: `${IMAGE_SIZE}:1200x800`,
          includedFields: `websites.${arcSite}.website_url,publish_date,headlines.basic,${includePromoItems},${includePromoItemsCaptions}`,
        },
      },
    })
  }

  promoItemHeadlines = ({ promo_items: promoItems }) => {
    if (!promoItems) return ''
    const { subtitle, caption } = Object.values(promoItems)[0] || {}

    return subtitle || caption || ''
  }

  render() {
    const {
      deployment,
      contextPath,
      arcSite,
      siteProperties: { sitemapNewsName, siteUrl = '' } = {},
    } = this.props

    const { data: { content_elements: stories = [] } = {} } = this.state || {}

    if (!stories) {
      return null
    }

    const storyData = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize: 'lg',
    })

    const sitemap = {
      urlset: stories.map(story => {
        storyData.__data = story
        return {
          url: {
            loc: `${siteUrl}${storyData.websiteLink || ''}`,
            lastmod: localISODate(storyData.publishDate || ''),
            'xhtml:link': {
              '@rel': 'amphtml',
              '@href': `${siteUrl}${storyData.websiteLink || ''}${OUTPUTTYPE}`,
            },
            'news:news': {
              'news:publication': {
                'news:name': sitemapNewsName,
                'news:language': 'es',
              },
              'news:publication_date': localISODate(
                storyData.publishDate || ''
              ),
              'news:title': {
                '#cdata': storyData.title,
              },
            },
            'image:image': {
              'image:loc':
                storyData.getMultimediaBySize(IMAGE_SIZE) ||
                storyData.multimedia ||
                '',
              'image:title': {
                '#cdata': this.promoItemHeadlines(story) || storyData.title,
              },
            },
            changefreq: 'hourly',
            priority: '1.0',
          },
        }
      }),
    }

    // Attr
    sitemap.urlset.push({
      '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
      '@xmlns:image': 'http://www.google.com/schemas/sitemap-image/1.1',
      '@xmlns:news': 'http://www.google.com/schemas/sitemap-news/0.9',
      '@xmlns:xhtml': 'http://www.w3.org/1999/xhtml',
    })

    return sitemap
  }
}

export default XmlSiteNewsSitemap
