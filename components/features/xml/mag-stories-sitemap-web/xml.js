import Consumer from 'fusion:consumer'
import StoryData from '../../../utilities/story-data'
import { localISODate } from '../../../utilities/helpers'

/**
 * @description Sitemap estándar para la web de Mag.
 *
 * @returns {Object} Objeto con estructura manipulable por
 * xmlBuilder, para construir sitemaps estándar para la web de Mag.
 */

const SOURCE = 'story-feed-by-website'
const MAG_PATH = '/mag'

@Consumer
class XmlMagStoriesSitemapWeb {
  constructor(props) {
    this.props = props
    this.fetchContent({
      stories: {
        source: SOURCE,
        query: {
          website: 'elcomerciomag'
        },
        transform: data => {
          if (!data) return []
          const { content_elements: stories } = data
          return stories
        }
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

    const { stories } = this.state || {}

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
            loc: `${siteUrl}${MAG_PATH}${storyData.link || ''}`,
            lastmod: localISODate(storyData.date || ''),
            changefreq: 'always',
            priority: '1',
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

export default XmlMagStoriesSitemapWeb
