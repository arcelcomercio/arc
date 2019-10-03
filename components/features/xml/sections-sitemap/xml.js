import Consumer from 'fusion:consumer'

const SOURCE = 'navigation-by-hierarchy'
const HIERARCHY = 'sitemap-default'

/**
 * @todo TODO: Revisar el tiempo de cache de la content source, debe ser
 * de 5 minutos porque no se ha reducido explicitamente a 2 mins.
 * Si es un requerimiento que se reduzca o se quite el tiempo de
 * cache, tendra que ser en una content source distinta pues la actual
 * "navigation-by-hierarchy" es utilizada por menues y footer,
 * incluso deberian tener un ttl aun mayor.
 */

@Consumer
class XmlSections {
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

  render() {
    const { sectionsId } = this.state || {}

    if (!sectionsId) {
      return null
    }

    const { siteProperties: { siteUrl = '' } = {} } = this.props

    const sitemaps = {
      sitemapindex: sectionsId.map(id => ({
        sitemap: {
          loc: `${siteUrl}${id}/`,
        },
      })),
    }
    sitemaps.sitemapindex['@xmlns'] =
      'http://www.sitemaps.org/schemas/sitemap/0.9'

    return sitemaps
  }
}

export default XmlSections
