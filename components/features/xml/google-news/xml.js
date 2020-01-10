import Consumer from 'fusion:consumer'
import StoryData from '../../../utilities/story-data'
import { localISODate } from '../../../utilities/helpers'

/**
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
                siteDescription = '',
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
                '@xmlns:dc': 'http://purl.org/dc/elements/1.1/',
                '@version': '2.0',
                channel: [
                    { link: siteUrl },
                    { description: siteDescription },
                    { title: sitemapNewsName },
                    {
                        image: {
                            url: googleNewsImage,
                            title: siteDomain,
                            link: siteUrl
                        }
                    },
                    ...stories.map(story => {
                        storyData.__data = story
                        return {
                            item: {
                                title: {
                                    '#cdata': storyData.title,
                                },
                                link: {
                                    '#cdata': `${siteUrl}${storyData.websiteLink}?outputType=amp`,
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
                ]
            }
        }

        return googleNewsFeed
    }
}

export default XmlGoogleNews
