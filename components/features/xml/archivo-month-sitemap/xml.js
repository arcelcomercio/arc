import Consumer from 'fusion:consumer'
import { localISODate } from '../../../utilities/helpers'

const SITEMAP = '/sitemap/archivo'
const SITEMAP_OPTIONS = ['web', 'news']
const OUTPUTTYPE = '?outputType=xml'

/**
 * @description Muestra los sitemaps de archivo disponible, por mes.
 * 
 * @returns {Object} Objeto con estructura manipulable por
 * xmlBuilder, para construir los sitemaps de archivo disponible, por mes.
 */

@Consumer
class XmlArchivoMonthSitemap {
    constructor(props) {
        this.props = props
        const date = new Date(localISODate())
        this.year = date.getFullYear()
        this.month = date.getMonth()
        this.day = date.getDate()
    }

    render() {
        const { globalContent, siteProperties: { siteUrl = '' } = {} } = this.props
        const { year, month } = globalContent || {}

        const sitemaps = {
            sitemapindex: [{
                '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
            }]
        }

        for (let d = this.day; d >= 1; d--) {
            sitemaps.sitemapindex = [
                ...sitemaps.sitemapindex,
                ...SITEMAP_OPTIONS.map(option => (
                    {
                        sitemap: {
                            loc: `${siteUrl}${SITEMAP}/${year}-${month}-${d >= 10 ? d : `0${d}`}-${option}/${OUTPUTTYPE}`,
                            lastmod: year === this.year && month - 1 === this.month && d === this.day
                                ? localISODate() // Momento actual
                                : `${new Date(year, month, d, 24, 0, -1).toISOString().split('.')[0]}-5:00` // Ultima hora del dia,

                        }
                    }
                ))
            ]
        }

        return sitemaps
    }
}

export default XmlArchivoMonthSitemap
