import Consumer from 'fusion:consumer'

import { localISODate } from '../../../utilities/date-time/dates'
import StoryData from '../../../utilities/story-data'

/**
 * @description Sitemap para Google News. Este feature obtiene la seccion que necesita desde "globalContent" y
 * funciona mejor con la content-source "sitemap-feed-by-section-and-date"
 *
 * @returns {Object} Objeto con estructura manipulable por
 * xmlBuilder, para construir sitemaps para Google news.
 */

@Consumer
class XmlSitemapNewsRecent {
  constructor(props) {
    this.props = props
    const { globalContent } = props
    const { section } = globalContent || {}

    this.fetchContent(this.getStates(section))
  }

  getStates = (section) => {
    const interval = 100
    const states = {}

    let count = 0

    // MAX 1000 historias
    while (count <= 9) {
      states[`data${count}`] = {
        source: 'sitemap-feed-by-section-and-date',
        query: {
          section: `/${section || ''}`,
          from: count * interval,
          size: interval,
        },
      }
      count += 1
    }
    return { ...states }
  }

  promoItemHeadlines = ({ promo_items: promoItems }) => {
    if (!promoItems) return ''
    const {
      subtitle,
      caption,
      headlines: { basic: headlinesBasic } = {},
      description: { basic: descriptionBasic } = {},
    } = Object.values(promoItems)[0] || {}

    return subtitle || caption || headlinesBasic || descriptionBasic || ''
  }

  render() {
    const {
      deployment,
      contextPath,
      arcSite,
      siteProperties: { sitemapNewsName = '', siteUrl = '' } = {},
      customFields: { siteName } = {},
    } = this.props

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

    const storyData = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize: 'sm',
    })

    const sitemap = {
      urlset: stories.map((story) => {
        storyData.__data = story
        return {
          url:
            arcSite === 'elcomercio'
              ? {
                  loc: `${siteUrl}${storyData.websiteLink || ''}`,
                  lastmod: localISODate(storyData.publishDate || ''),
                  'news:news': {
                    'news:publication': {
                      'news:name': siteName || sitemapNewsName,
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
                          .map((tag) => tag && tag.description)
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
                      '#cdata': this.promoItemHeadlines(story),
                    },
                  },
                  changefreq: 'hourly',
                }
              : {
                  loc: `${siteUrl}${storyData.websiteLink || ''}`,
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
                          .map((tag) => tag && tag.description)
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
                      '#cdata': this.promoItemHeadlines(story),
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

export default XmlSitemapNewsRecent
