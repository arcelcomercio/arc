import Consumer from 'fusion:consumer'
import StoryData from '../../../utilities/story-data'

/**
 * @description Sitemap estándar para la web. Este feature obtiene los datos que necesita desde "globalContent" y
 * funciona mejor con la content-source "sitemap-feed-by-section"
 *
 * @returns {Object} Objeto con estructura manipulable por
 * xmlBuilder, para construir sitemaps estándar para la web.
 */

@Consumer
class XmlStoriesSitemapWeb {
  constructor(props) {
    this.props = props
  }

  localISODate = date => {
    let localDate = date ? new Date(date) : new Date()
    /* localDate.setHours(localDate.getHours() - 5)
    localDate = `${localDate.toISOString().split('.')[0]}-05:00` */
    localDate = localDate.toISOString()
    return localDate
  }

  render() {
    const {
      globalContent,
      deployment,
      contextPath,
      arcSite,
      siteProperties: { siteUrl = '' } = {},
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

    const sitemap = {
      urlset: stories.map(story => {
        storyData.__data = story
        return {
          url: {
            loc: `${siteUrl}${storyData.link || ''}`,
            lastmod: this.localISODate(storyData.date || ''),
            changefreq: 'always',
            priority: '0.5',
          },
        }
      }),
    }

    // Attr
    sitemap.urlset.push({
      '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
    })

    return sitemap
  }
}

export default XmlStoriesSitemapWeb
