import Consumer from 'fusion:consumer'

const SOURCE = 'navigation-by-hierarchy'
const HIERARCHY = 'sitemap-default'
const OUTPUTTYPE = '?outputType=xml'
const SITEMAP = '/sitemap'

/**
 * @todo TODO: Revisar el tiempo de cache de la content source, debe ser
 * de 5 minutos porque no se ha reducido explicitamente a 2 mins.
 * Si es un requerimiento que se reduzca o se quite el tiempo de
 * cache, tendra que ser en una content source distinta pues la actual
 * "navigation-by-hierarchy" es utilizada por menues y footer,
 * incluso deberian tener un ttl aun mayor.
 *
 * @returns {Object} Objeto con estructura manipulable por
 * xmlBuilder, para construir sitemaps.
 */

@Consumer
class XmlSectionsSitemap {
  constructor(props) {
    this.props = props
    this.fetchContent({
      sectionsId: {
        source: SOURCE,
        query: {
          hierarchy: HIERARCHY,
        },
        filter: `{
          children {
            _id
          }
        }`,
        transform: data => {
          const { children: sections } = data || {}
          const ids = sections && sections.map(section => section._id)
          return ids
        },
      },
    })
  }

  localISODate = date => {
    let localDate = date ? new Date(date) : new Date()
    localDate.setHours(localDate.getHours() - 5)
    localDate = `${localDate.toISOString().split('.')[0]}-05:00`
    return localDate
  }

  render() {
    const { sectionsId } = this.state || {}

    if (!sectionsId) {
      return null
    }

    const { siteProperties: { siteUrl = '' } = {} } = this.props

    const sitemaps = {
      sitemapindex: sectionsId.map(id => ({
        sitemap: {
          loc: `${siteUrl}${SITEMAP}${id}/${OUTPUTTYPE}`,
          lastmod: this.localISODate(),
        },
      })),
    }

    // Attr
    sitemaps.sitemapindex.push({
      '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
    })

    return sitemaps
  }
}

export default XmlSectionsSitemap
