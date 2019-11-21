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
class XmlArchiveYearSitemap {
    constructor(props) {
        this.props = props
        const date = new Date(localISODate())
        this.year = date.getFullYear()
        this.month = date.getMonth()
    }

    render() {
        const { globalContent, siteProperties: { siteUrl = '' } = {} } = this.props
        let { year } = globalContent || {}
        year = parseInt(year, 10)

        const sitemaps = {
            sitemapindex: [{
                '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
            }]
        }

        for (let m = year === this.year ? this.month : 11; m >= 0; m--) {
            sitemaps.sitemapindex = [
                ...sitemaps.sitemapindex,
                {
                    sitemap: {
                        loc: `${siteUrl}${SITEMAP}/${year}-${m >= 9 ? m + 1 : `0${m + 1}`}/${OUTPUTTYPE}`,
                        lastmod: year === this.year && m === this.month
                            ? localISODate() // Momento actual
                            : `${new Date(year, m + 1, 0, 24, 0, -1).toISOString().split('.')[0]}-5:00` // Ultimo dia del mes,

                    }
                }
            ]
        }

        return sitemaps
    }
}

export default XmlArchiveYearSitemap
