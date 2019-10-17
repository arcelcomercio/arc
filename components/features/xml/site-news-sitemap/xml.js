import Consumer from 'fusion:consumer'
import StoryData from '../../../utilities/story-data'
import { localISODate } from '../../../utilities/helpers'

/**
 * @description Sitemap principal con historias de todo el sitio. 
 * Este feature obtiene los datos que necesita desde "globalContent" y
 * funciona mejor con la content-source "sitemap-feed-by-section"
 *
 * @returns {Object} Objeto con estructura manipulable por
 * xmlBuilder, para construir sitemaps principal con historias de todo el sitio.
 */

const SOURCE = 'sitemap-feed-by-section'
const OUTPUTTYPE = '?outputType=amp'
const IMAGE_SIZE = 'amp_new'

@Consumer
class XmlSiteNewsSitemap {
    constructor(props) {
        this.props = props
        this.fetchContent({
            data: {
                source: SOURCE,
                query: {
                    section: '/',
                    stories_qty: 100,
                },
            },
        })
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
                        loc: `${siteUrl}${storyData.link || ''}`,
                        'xhtml:link': {
                            '@rel': 'amphtml',
                            '@href': `${siteUrl}${storyData.link || ''}${OUTPUTTYPE}`,
                        },
                        'news:news': {
                            'news:publication': {
                                'news:name': sitemapNewsName,
                                'news:language': 'es',
                            },
                            'news:publication_date': localISODate(storyData.date || ''),
                            'news:title': {
                                '#cdata': storyData.title,
                            },
                        },
                        'image:image': {
                            'image:loc':
                                storyData.getMultimediaBySize(IMAGE_SIZE) || storyData.multimedia || '',
                            'image:title': {
                                '#cdata': this.promoItemHeadlines(story),
                            },
                        },
                        changefreq: 'always',
                        priority: '1',
                    }
                }
            }),
        }

        // Attr
        sitemap.urlset.push({
            '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
            '@xmlns:image': 'http://www.google.com/schemas/sitemap-image/1.1',
            '@xmlns:news': 'http://www.google.com/schemas/sitemap-news/0.9',
            '@xmlns:xhtml': "http://www.w3.org/1999/xhtml"
        })

        return sitemap
    }
}

export default XmlSiteNewsSitemap
