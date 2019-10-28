import Consumer from 'fusion:consumer'
import StoryData from '../../../utilities/story-data'
import { localISODate } from '../../../utilities/helpers'
import { sizeImg } from '../../../utilities/config-params'
import buildHtml from './_dependencies/build-html'

/**
 * @description Feed para Google Kiosko.
 *
 * @returns {Object} Objeto con estructura manipulable por
 * xmlBuilder, para construir Feed de noticias para Google Kiosko.
 */

const IMAGE_SIZE = 'amp_new'
const IMAGE_HEIGHT = sizeImg()[IMAGE_SIZE].height.toString()
const IMAGE_WIDTH = sizeImg()[IMAGE_SIZE].width.toString()
const OUTPUTTYPE_BASE = '?outputType='

@Consumer
class XmlGoogleKiosko {
    constructor(props) {
        this.props = props
    }

    promoItemHeadlines = (promoItems, isImage = false) => {
        if (!promoItems) return ''
        const {
            subtitle,
            caption,
            headlines: { basic: headlinesBasic } = {},
            description: { basic: descriptionBasic } = {},
        } = isImage ? (Object.values(promoItems)[0] || {}) : promoItems

        return subtitle || caption || headlinesBasic || descriptionBasic || ''
    }

    render() {
        const {
            globalContent,
            deployment,
            contextPath,
            arcSite,
            requestUri,
            outputType,
            siteProperties: {
                sitemapNewsName = '',
                siteUrl = '',
            } = {},
        } = this.props
        const { content_elements: stories } = globalContent || {}

        if (!stories) {
            return null
        }

        const storyData = new StoryData({
            deployment,
            contextPath,
            arcSite,
            defaultImgSize: 'md',
        })

        const selfHref = `${siteUrl}${requestUri.split('?')[0]}${OUTPUTTYPE_BASE}${outputType}`

        const googleKioskoFeed = {
            rss: {
                '@version': '2.0',
                '@xmlns:atom': 'http://www.w3.org/2005/Atom',
                '@xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
                '@xmlns:dc': 'http://purl.org/dc/elements/1.1/',
                '@xmlns:media': 'http://search.yahoo.com/mrss/',
                '@xmlns:sy': 'http://purl.org/rss/1.0/modules/syndication/',
                channel: [
                    { title: sitemapNewsName },
                    { link: siteUrl },
                    {
                        'atom:link': {
                            '@href': selfHref,
                            '@rel': 'self',
                            '@type': 'application/rss+xml'
                        }
                    },
                    { description: `${sitemapNewsName} News Feed` },
                    { language: 'es' },
                    { lastBuildDate: localISODate() },
                    { ttl: '1' },
                    { 'sy:updatePeriod': 'hourly' },
                    { 'sy:updateFrequency': '1' },
                    ...stories.map(story => {
                        storyData.__data = story

                        const buildHtmlProps = {
                            subTitle: storyData.subTitle,
                            author: storyData.author,
                            paragraphsNews: storyData.paragraphsNews,
                            gallery: storyData.getGallery,
                            video: storyData.getVideoPrincipal,
                            typeNota: storyData.multimediaType,
                        }

                        // Listado de imagenes de promoItems en caso de que se trate de una galeria.
                        const { content_elements: promoImages = [] } = storyData.contentElementGallery || {}
                        // Si no se trata de una galeria, asigna el promoItem basic por defecto
                        if (!promoImages.lenght)
                            promoImages.push({
                                url: storyData.getMultimediaBySize(IMAGE_SIZE) || storyData.multimedia || '',
                                isImage: true
                            })

                        // Listado de imagenes en el contenido de la historia
                        const contentImages = storyData.contentElementsImage

                        return {
                            item: [
                                { title: storyData.title },
                                { link: `${siteUrl}${storyData.link || ''}` },
                                { description: storyData.subTitle },
                                {
                                    guid: {
                                        '@isPermaLink': 'true',
                                        '#text': `${siteUrl}${storyData.link || ''}`
                                    }
                                },
                                { 'dc:creator': storyData.author },
                                { pubDate: localISODate(storyData.date || '') },
                                {
                                    'content:encoded': {
                                        '#cdata': buildHtml(buildHtmlProps)
                                    }
                                },
                                ...promoImages.map(image => {
                                    // Imagen o imagenes de promoItems
                                    const imageUrl = image.isImage
                                        ? image.url
                                        : (image.resized_urls && image.resized_urls[IMAGE_SIZE] || storyData.defaultImg)
                                    const imageType = imageUrl ? imageUrl.match(/\w{3,4}$/) : 'jpeg'

                                    return {
                                        'media:content': {
                                            '@url': imageUrl,
                                            '@type': `image/${imageType}`,
                                            '@height': IMAGE_HEIGHT,
                                            '@width': IMAGE_WIDTH,
                                            'media:description': {
                                                '@type': 'plain',
                                                '#text': this.promoItemHeadlines(image.isImage ? storyData.promoItems : image, image.isImage),
                                            },
                                            /** 
                                             * 'media:credit': '' 
                                             * 
                                             * Por ahora este campo no se encuentra en promo_items
                                            */
                                        }
                                    }
                                }),
                                ...contentImages.map(image => {
                                    // Imagenes en el contenido de la historia
                                    const {
                                        height,
                                        width,
                                        url,
                                        /* additional_properties: { proxyUrl } = {} */
                                    } = image || {}
                                    const imageUrl = url  /* `${siteUrl}${proxyUrl}` */
                                    const imageType = imageUrl ? imageUrl.match(/\w{3,4}$/) : 'jpeg'

                                    return {
                                        'media:content': {
                                            '@url': imageUrl,
                                            '@type': `image/${imageType}`,
                                            '@height': height,
                                            '@width': width,
                                            'media:description': {
                                                '@type': 'plain',
                                                '#text': this.promoItemHeadlines(image),
                                            },
                                            /** 
                                             * 'media:credit': '' 
                                             * 
                                             * Por ahora este campo no se encuentra en promo_items
                                            */
                                        }
                                    }
                                })
                            ]
                        }
                    })
                ]
            }
        }

        return googleKioskoFeed
    }
}

export default XmlGoogleKiosko
