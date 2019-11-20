import Consumer from 'fusion:consumer'
import StoryData from '../../../utilities/story-data'
import { localISODate } from '../../../utilities/helpers'

/**
 * @description Muestra listado de historias para fecha especifica.
 * 
 * @returns {Object} Objeto con estructura manipulable por
 * xmlBuilder, para construir listado de historias para fecha especifica.
 */

@Consumer
class XmlArchiveDayNewsSitemap {
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
        const { globalContent, deployment, contextPath, arcSite, siteProperties: { sitemapNewsName = '', siteUrl = '' } = {} } = this.props
        const {
            content_elements: contentElements,
            // params: { date } = {},
        } = globalContent || {}
        const stories = contentElements || []

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
                        loc: `${siteUrl}${storyData.link || ''}`,
                        // lastmod: localISODate(storyData.date || ''),
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
                                storyData.multimediaLandscapeL || storyData.multimedia || '',
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

export default XmlArchiveDayNewsSitemap
