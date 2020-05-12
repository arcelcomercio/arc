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
    const { globalContentConfig, arcSite } = props
    const { query: { year, month, day } = {} } = globalContentConfig || {}

    this.fetchContent({
      data: {
        source: 'story-feed-by-section-and-date-v2',
        query: {
          section: '',
          date: `${year}-${month}-${day}`,
          size: 100,
          presets: 'no-presets',
          includedFields: `websites.${arcSite}.website_url,display_date,publish_date`,
        },
      },
    })
  }

  render() {
    const {
      deployment,
      contextPath,
      arcSite,
      siteProperties: { siteUrl = '' } = {},
    } = this.props

    const { data } = this.state || {}
    const { content_elements: stories } = data || {}

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
            loc: `${siteUrl}${storyData.websiteLink || ''}`,
            lastmod: localISODate(
              arcSite === 'elcomercio'
                ? storyData.publishDate
                : storyData.date || ''
            ),
            changefreq: arcSite === 'elcomercio' ? 'always' : 'hourly',
            priority: arcSite === 'elcomercio' ? '0.5' : '1.0',
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
