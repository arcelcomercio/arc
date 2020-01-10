import Consumer from 'fusion:consumer'
import { localISODate } from '../../../utilities/helpers'

const SOURCE = 'story-feed-by-section'

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
    const { arcSite } = props

    this.fetchContent({
      data: {
        source: SOURCE,
        query: {
          section: '/',
          stories_qty: 100,
          presets: 'no-presets',
          includedFields: `websites.${arcSite}.website_url,display_date,headlines.basic,subheadlines.basic,credits.by.name`,
        },
      },
    })
  }

  render() {
    const {
      arcSite,
      siteProperties: {
        sitemapNewsName = '',
        siteUrl = '',
        siteDescription = '',
        siteDomain = '',
        googleNewsImage = '',
      } = {},
    } = this.props

    const { data: { content_elements: stories = [] } = {} } = this.state || {}

    if (!stories) {
      return null
    }

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
              link: siteUrl,
            },
          },
          ...stories.map(story => {
            const {
              display_date: date,
              headlines: { basic: title = '' } = {},
              subheadlines: { basic: subTitle = '' } = {},
              credits: { by: [{ name: author } = {}] = [] } = {},
              websites = {},
            } = story || {}
            const { website_url: websiteLink = '' } = websites[arcSite] || {}

            return {
              item: {
                title: {
                  '#cdata': title,
                },
                link: {
                  '#cdata': `${siteUrl}${websiteLink}?outputType=amp`,
                },
                description: {
                  '#cdata': subTitle,
                },
                pubDate: {
                  '#cdata': localISODate(date || ''),
                },
                'dc:creator': {
                  '#cdata': author,
                },
              },
            }
          }),
        ],
      },
    }

    return googleNewsFeed
  }
}

export default XmlGoogleNews
