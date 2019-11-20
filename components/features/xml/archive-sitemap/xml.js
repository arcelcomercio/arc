import Consumer from 'fusion:consumer'
import { localISODate } from '../../../utilities/helpers'

const SITEMAP = '/sitemap/archivo'
const OUTPUTTYPE = '?outputType=xml'
const MIN_YEAR = 2014

/**
 * @description Muestra los sitemaps de archivo disponible, por anio.
 * 
 * @returns {Object} Objeto con estructura manipulable por
 * xmlBuilder, para construir los sitemaps de archivo disponible, por anio.
 */

@Consumer
class XmlArchiveSitemap {
    constructor(props) {
        this.props = props
        this.year = new Date(localISODate()).getFullYear()
    }

    render() {
        const { siteProperties: { siteUrl = '' } = {} } = this.props

        const sitemaps = {
            sitemapindex: [{
                '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
            }]
        }

        for (let i = this.year; i >= MIN_YEAR; i--) {
            sitemaps.sitemapindex = [
                ...sitemaps.sitemapindex,
                {
                    sitemap: {
                        loc: `${siteUrl}${SITEMAP}/${i}/${OUTPUTTYPE}`,
                        lastmod: i === this.year
                            ? localISODate() // Momento actual
                            : `${new Date(i, 11, 31, 24, 0, -1).toISOString().split('.')[0]}-5:00` // 31 de Diciembre de ese anio,

                    }
                }
            ]
        }

        return sitemaps
    }
}

export default XmlArchiveSitemap
