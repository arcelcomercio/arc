import Consumer from 'fusion:consumer'

const SITEMAP = '/sitemap'
const SITEMAP_OPTIONS = ['web', 'news']
const OUTPUTTYPE = '?outputType=xml'

/**
 * @description Muestra los sitemaps disponibles 
 * por sección. Por ahora son dos /web/ y /news/ 
 * (para Google news).
 * 
 * @returns {Object} Objeto con estructura manipulable por
 * xmlBuilder, para construir sitemap que muestra los sitemaps disponibles 
 * por sección.
 */

@Consumer
class XmlOptionsSitemap {
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
        const { globalContent, siteProperties: { siteUrl = '' } = {} } = this.props
        const { _id: section } = globalContent || {}

        if (!section) {
            return null
        }

        const sitemaps = {
            sitemapindex: SITEMAP_OPTIONS.map(option => ({
                sitemap: {
                    loc: `${siteUrl}${SITEMAP}/${option}${section}/${OUTPUTTYPE}`,
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

export default XmlOptionsSitemap
