import Consumer from 'fusion:consumer'
import { localISODate } from '../../../utilities/helpers'

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
                    lastmod: localISODate(),
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
