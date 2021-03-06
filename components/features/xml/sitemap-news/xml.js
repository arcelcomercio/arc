import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'
import StoryData from '../../../utilities/story-data'
import { localISODate } from '../../../utilities/helpers'
import {
  includeTags,
  includePromoItems,
  includePromoItemsCaptions,
} from '../../../utilities/included-fields'
import { createResizedParams } from '../../../utilities/resizer/resizer'
import { SITE_ELCOMERCIOMAG } from '../../../utilities/constants/sitenames'

let presets = 'landscape_l:648x374'
/**
 * @description Sitemap para Google News. Este feature obtiene los datos que necesita desde "globalContent" y
 * funciona mejor con la content-source "story-feed-by-section"
 *
 * @returns {Object} Objeto con estructura manipulable por
 * xmlBuilder, para construir sitemaps para Google news.
 */

@Consumer
class XmlSitemapNews {
  constructor(props) {
    this.props = props
    const { globalContentConfig, arcSite } = props
    const { query: { _id: section } = {} } = globalContentConfig || {}

    const includedFields = `websites.${arcSite}.website_url,display_date,publish_date,headlines.basic,taxonomy.seo_keywords,${includeTags},${includePromoItems},${includePromoItemsCaptions},content_elements.url,content_elements.type,content_elements.resized_urls,content_elements.caption`
    if (arcSite === SITE_ELCOMERCIOMAG) presets = 'landscape_l:1200x800'

    this.fetchContent(this.getStates(section, includedFields))
  }

  getStates = (section, includedFields) => {
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
      customFields: { siteName } = {},
    } = this.props

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

    const storyData = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize: 'sm',
    })

    const sitemap = {
      urlset: stories.map(story => {
        storyData.__data = story
        const { content_elements: contentElements = [] } = story || {}
        return {
          url: [
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
                },
            ...contentElements
              .filter(({ type }) => type === 'image')
              .map(({ caption = '', url = '' }) => {
                const { landscape_l: bodyImageUrl = '' } = createResizedParams({
                  url,
                  presets,
                  arcSite,
                })
                // Imagenes del cuerpo de la noticia
                return {
                  'image:image': {
                    'image:loc': bodyImageUrl,
                    'image:title': {
                      '#cdata': caption,
                    },
                  },
                }
              }),
            arcSite === 'elcomercio'
              ? {
                  changefreq: 'hourly',
                }
              : {
                  changefreq: 'hourly',
                  priority: '1.0',
                },
          ],
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

XmlSitemapNews.propTypes = {
  customFields: PropTypes.shape({
    siteName: PropTypes.string.tag({
      name: 'Nombre p??blico del sitio',
      description:
        'Nombre del sitio que se mostrar?? publicamente en este sitemap',
    }),
  }),
}

export default XmlSitemapNews
