import Consumer from 'fusion:consumer'
import { localISODate } from '../../../utilities/helpers'

const SITEMAP = '/sitemap/archivo'
const OUTPUTTYPE = '?outputType=xml'

/**
 * @description Muestra los sitemaps de archivo disponible, por mes.
 * 
 * @returns {Object} Objeto con estructura manipulable por
 * xmlBuilder, para construir los sitemaps de archivo disponible, por mes.
 */

@Consumer
class XmlArchivoYearSitemap {
    constructor(props) {
        this.props = props
        this.month = new Date(localISODate()).getMonth()
    }

    render() {
        const { globalContent, siteProperties: { siteUrl = '' } = {} } = this.props
        const { year } = globalContent || {}

        const sitemaps = {
            sitemapindex: [{
                '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
            }]
        }

        for (let m = this.month; m >= 0; m--) {
            sitemaps.sitemapindex = [
                ...sitemaps.sitemapindex,
                {
                    sitemap: {
                        loc: `${siteUrl}${SITEMAP}/${year}-${m}/${OUTPUTTYPE}`,
                        lastmod: m === this.month
                            ? localISODate() // Momento actual
                            : `${new Date(year, m + 1, 0, 24, 0, -1).toISOString().split('.')[0]}-5:00` // Ultimo dia del mes,

                    }
                }
            ]
        }

        return sitemaps
    }
}

export default XmlArchivoYearSitemap
