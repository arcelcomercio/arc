import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'

import { localISODate } from '../../../utilities/date-time/dates'
import StoryData from '../../../utilities/story-data'

/**
 * @description Sitemap para Google News. Este feature obtiene los datos que necesita desde "globalContent" y
 * funciona mejor con la content-source "story-feed-by-section"
 *
 * @returns {Object} Objeto con estructura manipulable por
 * xmlBuilder, para construir sitemaps para Google news.
 */

@Consumer
class XmlStoriesSitemapNews {
  constructor(props) {
    this.props = props
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
      globalContent,
      deployment,
      contextPath,
      arcSite,
      siteProperties: { sitemapNewsName = '', siteUrl = '' } = {},
      customFields: { siteName } = {},
    } = this.props
    const { content_elements: stories } = globalContent || {}

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

XmlStoriesSitemapNews.propTypes = {
  customFields: PropTypes.shape({
    siteName: PropTypes.string.tag({
      name: 'Nombre público del sitio',
      description:
        'Nombre del sitio que se mostrará publicamente en este sitemap',
    }),
  }),
}

export default XmlStoriesSitemapNews
