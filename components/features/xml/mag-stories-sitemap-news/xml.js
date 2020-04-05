import Consumer from 'fusion:consumer'
import StoryData from '../../../utilities/story-data'
import { localISODate } from '../../../utilities/helpers'
import {
  includeTags,
  includePromoItems,
  includePromoItemsCaptions,
} from '../../../utilities/included-fields'

const SOURCE = 'story-feed-by-section'
const MAG_PATH = '/mag'

/**
 * @description Sitemap para Google News de Mag.
 *
 * @returns {Object} Objeto con estructura manipulable por
 * xmlBuilder, para construir sitemaps para Google news de Mag.
 */

@Consumer
class XmlMagStoriesSitemapNews {
  constructor(props) {
    this.props = props

    this.fetchContent({
      data: {
        source: SOURCE,
        query: {
          website: 'elcomerciomag',
          stories_qty: 100,
          presets: 'landscape_l:648x374',
          includedFields: `websites.elcomerciomag.website_url,display_date,publish_date,headlines.basic,taxonomy.seo_keywords,${includeTags},${includePromoItems},${includePromoItemsCaptions}`,
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
      siteProperties: { sitemapNewsName = '', siteUrl = '' } = {},
    } = this.props

    const { data } = this.state || {}
    const { content_elements: stories = [] } = data || {}

    if (!stories) {
      return null
    }

    const storyData = new StoryData({
      deployment,
      contextPath,
      arcSite: 'elcomerciomag',
      defaultImgSize: 'sm',
    })

    const sitemap = {
      urlset: stories.map(story => {
        storyData.__data = story
        return {
          url:
            arcSite === 'elcomercio'
              ? {
                  loc: `${siteUrl}${MAG_PATH}${storyData.websiteLink || ''}`,
                  lastmod: localISODate(storyData.publishDate || ''),
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
                    'news:keywords': {
                      '#cdata':
                        storyData.seoKeywords.toString() ||
                        storyData.tags
                          .map(tag => tag && tag.description)
                          .toString() ||
                        arcSite,
                    },
                  },
                  'image:image': {
                    'image:loc':
                      storyData.multimediaLandscapeL ||
                      storyData.multimedia ||
                      '',
                    'image:title': {
                      '#cdata':
                        this.promoItemHeadlines(story) || storyData.title,
                    },
                  },
                  changefreq: 'hourly',
                }
              : {
                  loc: `${siteUrl}${MAG_PATH}${storyData.websiteLink || ''}`,
                  'news:news': {
                    'news:publication': {
                      'news:name': sitemapNewsName,
                      'news:language': 'es',
                    },
                    'news:publication_date': localISODate(storyData.date || ''),
                    'news:title': {
                      '#cdata': storyData.title,
                    },
                    'news:keywords': {
                      '#cdata':
                        storyData.seoKeywords.toString() ||
                        storyData.tags
                          .map(tag => tag && tag.description)
                          .toString() ||
                        arcSite,
                    },
                  },
                  'image:image': {
                    'image:loc':
                      storyData.multimediaLandscapeL ||
                      storyData.multimedia ||
                      '',
                    'image:title': {
                      '#cdata':
                        this.promoItemHeadlines(story) || storyData.title,
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
      '@xmlns:news': 'http://www.google.com/schemas/sitemap-news/0.9',
      '@xmlns:image': 'http://www.google.com/schemas/sitemap-image/1.1',
    })

    return sitemap
  }
}

export default XmlMagStoriesSitemapNews
