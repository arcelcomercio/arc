import Consumer from 'fusion:consumer'

import { localISODate } from '../../../utilities/date-time/dates'

/**
 * @description Sitemap para autores. Este feature obtiene los datos que necesita desde la content-source "authors-by-website-v1"
 *
 * @returns {Object} Objeto con estructura manipulable por
 * xmlBuilder, para construir sitemaps estándar para la web.
 */

@Consumer
class XmlAuthorsSitemapWeb {
  constructor(props) {
    this.props = props
    this.fetchContent({
      data: {
        source: 'authors-by-website-v1',
      },
    })
  }

  render() {
    const { siteProperties: { siteUrl = '' } = {} } = this.props

    const { authors } = this.state.data || {}

    if (!authors) {
      return null
    }

    const sitemap = {
      urlset: authors.map((author) => ({
        url: {
          loc: `${siteUrl}${author.bio_page || ''}/`,
          lastmod: localISODate(author.last_updated_date),
        },
      })),
    }
    // Attr
    sitemap.urlset.push({
      '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
    })

    return sitemap
  }
}

export default XmlAuthorsSitemapWeb
