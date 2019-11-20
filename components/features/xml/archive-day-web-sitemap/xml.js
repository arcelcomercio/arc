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
class XmlArchiveDayWebSitemap {
    constructor(props) {
        this.props = props
    }

    render() {
        const { globalContent, deployment, contextPath, arcSite, siteProperties: { siteUrl = '' } = {} } = this.props
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
                        lastmod: localISODate(storyData.date || ''),
                        changefreq: 'hourly',
                        priority: '1.0',
                    },
                }
            }),
        }

        sitemap.urlset.push({
            '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
        })

        return sitemap
    }
}

export default XmlArchiveDayWebSitemap
