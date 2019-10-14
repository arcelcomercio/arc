import Consumer from 'fusion:consumer'
import StoryData from '../../../utilities/story-data'
import { localISODate } from '../../../utilities/helpers'

/**
 * @todo TODO: Es necesario pasar al outputType que la version que queremos
 * de XML es la 2.0
 * 
 * @description Feed para Google News.
 *
 * @returns {Object} Objeto con estructura manipulable por
 * xmlBuilder, para construir Feed de noticias para Google news.
 */

@Consumer
class XmlGoogleNews {
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
                siteDecription = '',
                siteDomain = '',
                googleNewsImage = ''
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
            defaultImgSize: 'sm',
        })

        const googleNewsFeed = {
            rss: {
                link: siteUrl,
                description: siteDecription,
                title: sitemapNewsName,
                image: {
                    url: googleNewsImage,
                    title: siteDomain,
                    link: siteUrl
                },
                ...stories.map(story => {
                    storyData.__data = story
                    return {
                        item: {
                            title: {
                                '#cdata': storyData.title,
                            },
                            link: {
                                '#cdata': `${siteUrl}${storyData.link || ''}`,
                            },
                            description: {
                                '#cdata': storyData.subTitle,
                            },
                            pubDate: {
                                '#cdata': localISODate(storyData.date || ''),
                            },
                            'dc:creator': {
                                '#cdata': storyData.author,
                            }
                        }
                    }
                })
            }
        }

        // Attr
        googleNewsFeed.rss.push({
            '@xmlns:dc': 'http://purl.org/dc/elements/1.1/',
            '@version': '2.0'
        })

        return googleNewsFeed
    }
}

export default XmlGoogleNews
