import Consumer from 'fusion:consumer'
import md5 from 'md5'
import StoryData from '../../../utilities/story-data'
import { localISODate, getMultimedia, nbspToSpace } from '../../../utilities/helpers'
import buildHtml from './_dependencies/build-html'

/**
 * @description Feed para Facebook Instant Articles.
 *
 * @returns {Object} Objeto con estructura manipulable por
 * xmlBuilder, para construir Feed de noticias para Facebook Instant Articles.
 */

const DESCRIPTION = 'Todas las Noticias'
const SOURCE = 'story-feed-by-section-mag'

@Consumer
class XmlFacebookInstantArticles {
    constructor(props) {
        this.props = props
        const { globalContent, siteProperties: { siteDomain = '' } } = props
        const { content_elements: stories = [] } = globalContent || {}
        this.stories = stories

        if (siteDomain === 'elcomercio.pe') {
            this.fetchContent({
                magStories: {
                    source: SOURCE,
                },
            })
        }
    }

    render() {
        const { magStories } = this.state
        this.stories = [...this.stories, ...magStories || {}]

        const {
            // globalContent,
            deployment,
            contextPath,
            arcSite,
            siteProperties: {
                sitemapNewsName = '',
                siteUrl = '',
                siteDomain = '',
                idGoogleAnalitics = '',
                fbArticleStyle = '',
                listUrlAdvertisings = []
            } = {},
        } = this.props
        // const { content_elements: stories } = globalContent || {}

        if (!this.stories) {
            return null
        }

        const storyData = new StoryData({
            deployment,
            contextPath,
            arcSite,
            defaultImgSize: 'sm',
        })

        const fbInstantArticlesFeed = {
            rss: {
                '@version': '2.0',
                '@xmlns:atom': 'http://www.w3.org/2005/Atom',
                '@xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
                '@xmlns:slash': 'http://purl.org/rss/1.0/modules/slash/',
                channel: [
                    { language: 'es' },
                    { title: sitemapNewsName },
                    { description: DESCRIPTION },
                    { lasBuildDate: localISODate() },
                    { link: siteUrl },
                    ...this.stories.map(story => {
                        storyData.__data = story

                        let storyLink = ''
                        let fiaContent = ''

                        if (storyData.fiaOrigen === true) {

                            if (storyData.canonicalWebsite === 'elcomerciomag') {
                                fiaContent = 'MAG'
                                storyLink = `${siteUrl}/mag${storyData.link}`
                            } else {
                                storyLink = `${siteUrl}${storyData.link}`
                                fiaContent = fbArticleStyle
                            }
                            // const storyLink = `${siteUrl}${storyData.link}`
                            const pageview = `${storyData.link}?outputType=fia`

                            const propsScriptHeader = {
                                siteDomain,
                                title: nbspToSpace(storyData.title),
                                sections: storyData.allSections,
                                tags: storyData.tags,
                                author: nbspToSpace(storyData.author),
                                typeNews: storyData.multimediaType,
                            }

                            const scriptAnaliticaProps = {
                                siteDomain,
                                idGoogleAnalitics,
                                name: siteDomain,
                                section: storyData.sectionsFIA.section,
                                subsection: storyData.sectionsFIA.subsection,
                                newsId: storyData.id,
                                author: nbspToSpace(storyData.author),
                                newsType: getMultimedia(storyData.multimediaType),
                                pageview,
                                newsTitle: nbspToSpace(storyData.title),
                                nucleoOrigen: storyData.nucleoOrigen,
                                formatOrigen: storyData.formatOrigen,
                                contentOrigen: storyData.contentOrigen,
                                genderOrigen: storyData.genderOrigen,
                            }

                            const buildHtmlProps = {
                                scriptAnaliticaProps,
                                propsScriptHeader,
                                title: nbspToSpace(storyData.title),
                                subTitle: nbspToSpace(storyData.subTitle),
                                multimedia: storyData.multimediaNews,
                                author: nbspToSpace(storyData.author),
                                paragraphsNews: storyData.paragraphsNews,
                                fbArticleStyle: fiaContent,
                                listUrlAdvertisings,
                            }

                            return {
                                item: {
                                    title: storyData.title,
                                    pubDate: localISODate(storyData.date || ''),
                                    link: storyLink,
                                    guid: md5(storyData.id),
                                    author: storyData.author,
                                    'content:encoded': {
                                        '#cdata': buildHtml(buildHtmlProps),
                                    },
                                }
                            }
                        } return {}
                    })
                ]
            }
        }

        return fbInstantArticlesFeed
    }
}

export default XmlFacebookInstantArticles
