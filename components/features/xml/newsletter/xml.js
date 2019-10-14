import Consumer from 'fusion:consumer'
import StoryData from '../../../utilities/story-data'
import { localISODate } from '../../../utilities/helpers'

/**
 * @todo TODO: Verificar si la forma de pasar la version 2.0 es la correcta
 * 
 * @description Feed para Newsletter.
 *
 * @returns {Object} Objeto con estructura manipulable por
 * xmlBuilder, para construir Feed de noticias para Newsletter.
 */

@Consumer
class XmlNewsletterFeed {
  constructor(props) {
    this.props = props
  }

  render() {
    const {
      globalContent,
      deployment,
      contextPath,
      arcSite,
      siteProperties: {
        siteUrl = '',
      } = {},
    } = this.props
    const { content_elements: stories } = globalContent || {}

    if (!stories) {
      return null
    }

    const storyData = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize: 'sm',
    })

    const newsletterFeed = {
      rss: stories.map(story => {

        const {
          tbmax = '',
          tbmin = '',
          tb250x366 = '',
          tb148x83 = '',
          tb210x118 = '',
          tb403x227 = '',
          tb241x136 = '',
          tbgrande = '',
          tbflujo = '',
        } =
          story &&
            story.promo_items &&
            story.promo_items.basic &&
            story.promo_items.basic.resized_urls
            ? story.promo_items.basic.resized_urls
            : {}

        storyData.__data = story

        return {
          article: {
            title: storyData.title,
            url: `${siteUrl}${storyData.websiteLink || ''}`,
            id: storyData.id,
            publishedAt: localISODate(storyData.date || ''),
            imagen: {
              thumbnail_max: tbmax,
              thumbnail_min: tbmin,
              thumbnail_250x366: tb250x366,
              thumbnail_148x83: tb148x83,
              thumbnail_210x118: tb210x118,
              thumbnail_403x227: tb403x227,
              thumbnail_241x136: tb241x136,
              thumbnail_grande: tbgrande,
              thumbnail_flujo: tbflujo
            },
            volada: '',
            epigraph: storyData.subTitle,
            seccion: storyData.primarySection,
            url_seccion: storyData.primarySectionLink,
            autor: {
              nombre: storyData.author,
              url: `${siteUrl}${storyData.authorLink}`,
              cargo: storyData.authorOccupation,
              columna: '',
              twitter: storyData.authorTwitterLink,
              imagen: `${siteUrl}${storyData.authorImage}`,
              thumb: storyData.authorSlug
            }
          }
        }
      })
    }

    // Attr
    newsletterFeed.rss.push({
      '@version': '2.0'
    })

    return newsletterFeed
  }
}

export default XmlNewsletterFeed
