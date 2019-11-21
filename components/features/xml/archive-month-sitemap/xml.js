import Consumer from 'fusion:consumer'
import { localISODate } from '../../../utilities/helpers'

const SITEMAP = '/sitemap/archivo'
const SITEMAP_OPTIONS = ['web', 'news']
const OUTPUTTYPE = '?outputType=xml'

/**
 * @description Muestra los sitemaps de archivo disponible, por dia.
 * 
 * @returns {Object} Objeto con estructura manipulable por
 * xmlBuilder, para construir los sitemaps de archivo disponible, por dia.
 */

@Consumer
class XmlArchiveMonthSitemap {
    constructor(props) {
        this.props = props
        const date = new Date(localISODate())
        this.year = date.getFullYear()
        this.month = date.getMonth()
        this.day = date.getDate()
    }

    render() {
        const { globalContent, siteProperties: { siteUrl = '' } = {} } = this.props
        let { year, month } = globalContent || {}
        year = parseInt(year, 10)
        month = parseInt(month, 10)

        const sitemaps = {
            sitemapindex: [{
                '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
            }]
        }

        for (let d = year === this.year && month === this.month ? this.day : new Date(year, month + 1, 0).getDate(); d >= 1; d--) {
            sitemaps.sitemapindex = [
                ...sitemaps.sitemapindex,
                ...SITEMAP_OPTIONS.map(option => (
                    {
                        sitemap: {
                            loc: `${siteUrl}${SITEMAP}/${year}-${month}-${d >= 10 ? d : `0${d}`}-${option}/${OUTPUTTYPE}`,
                            lastmod: year === this.year && month - 1 === this.month && d === this.day
                                ? localISODate() // Momento actual
                                : `${new Date(year, month - 1, d, 24, 0, -1).toISOString().split('.')[0]}-5:00` // Ultima hora del dia,

                        }
                    }
                ))
            ]
        }

        return sitemaps
    }
}

export default XmlArchiveMonthSitemap
