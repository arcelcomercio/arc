import Consumer from 'fusion:consumer'
import md5 from 'md5'
import StoryData from '../../../utilities/story-data'
import { localISODate } from '../../../utilities/helpers'
import buildHtml from './_dependencies/build-html'

/**
 * @description Feed para MSN.
 *
 * @returns {Object} Objeto con estructura manipulable por
 * xmlBuilder, para construir Feed de noticias para MSN.
 */

const DESCRIPTION = 'Todas las Noticias'
const IMAGE_SIZE = 'amp_new'

@Consumer
class XmlMsn {
    constructor(props) {
        this.props = props
    }

    render() {
        const {
            globalContent,
            deployment,
            contextPath,
            arcSite,
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

        const msnFeed = {
            rss: {
                '@version': '2.0',
                '@xmlns:atom': 'http://www.w3.org/2005/Atom',
                '@xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
                '@xmlns:slash': 'http://purl.org/rss/1.0/modules/slash/',
                '@xmlns:mi': 'http://schemas.ingestion.microsoft.com/common/',
                '@xmlns:dcterms': 'http://purl.org/dc/terms/',
                '@xmlns:media': 'http://search.yahoo.com/mrss/',
                '@xmlns:dc': 'http://purl.org/dc/elements/1.1/',
                channel: [
                    { language: 'es' },
                    { title: sitemapNewsName },
                    { description: DESCRIPTION },
                    { lastBuildDate: localISODate() },
                    { link: siteUrl },
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

                        const storyTags = storyData.tags.map(tag => `${tag.text.replace('&', '-')}`)
                        const storyImage = storyData.getMultimediaBySize(IMAGE_SIZE) || storyData.multimedia || ''
                        const imageType = storyImage ? storyImage.match(/\w{3,4}$/) : 'jpeg'

                        return {
                            item: {
                                title: {
                                    '#cdata': storyData.title
                                },
                                pubDate: localISODate(storyData.date || ''),
                                'dcterms:modified': localISODate(storyData.date || ''),
                                'dcterms:alternative': storyData.title.replace('&', '-'),
                                link: `${siteUrl}${storyData.link || ''}`,
                                guid: {
                                    '@isPermaLink': 'false',
                                    '#text': md5(storyData.id)
                                },
                                author: storyData.author,
                                'dc:creator': storyData.author,
                                'media:keywords': storyTags.toString(),
                                description: {
                                    '#cdata': storyData.subTitle
                                    // TODO: debe mostrar caption de la foto
                                },
                                'content:encoded': {
                                    '#cdata': buildHtml(buildHtmlProps),
                                },
                                'media:content': {
                                    '@url': storyImage,
                                    '@type': `image/${imageType}`,
                                    '@medium': 'image',
                                    'media:thumbnail': {
                                        '@url': storyImage,
                                        '@type': `image/${imageType}`,
                                    },
                                    'media:title': storyData.title.replace('&', '-'),
                                    'media:credit': ''
                                }
                            }
                        }
                    })
                ]
            }
        }

        return msnFeed
    }
}

export default XmlMsn
