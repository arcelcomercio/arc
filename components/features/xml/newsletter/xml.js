import Consumer from 'fusion:consumer'
import StoryData from '../../../utilities/story-data'
import { localISODate } from '../../../utilities/helpers'
import BuildContent from './_dependencies/build-content'
/**
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
      siteProperties: { siteUrl = '' } = {},
    } = this.props
    const { content_elements: collectionData, websked = {}, stories = [] } =
      globalContent || {}

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
      rss: {
        '@version': '2.0',
        channel: collectionData.map((story, index) => {
          const {
            promo_items: {
              basic: {
                resized_urls: {
                  tbmax = '',
                  tbmin = '',
                  tb250x366 = '',
                  tb148x83 = '',
                  tb210x118 = '',
                  tb403x227 = '',
                  tb241x136 = '',
                  tbgrande = '',
                  tbflujo = '',
                } = {},
              } = {},
            } = {},
          } = story || {}

          storyData.__data = stories[index]

          // const description =
          //   storyData.__data &&
          //   storyData.__data.description &&
          //   storyData.__data.description.basic
          //     ? storyData.__data.description.basic
          //     : storyData.subTitle
          const title =
            story && story.headlines && story.headlines.basic
              ? story.headlines.basic
              : storyData.title
          const description =
            story && story.description && story.description.basic
              ? story.description.basic
              : storyData.subTitle
          return {
            article: {
              title,
              url: `${siteUrl}${storyData.websiteLink || ''}`,
              id: storyData.id,
              description,
              premium: storyData.isPremium,
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
                thumbnail_flujo: tbflujo,
              },
              volada: 'null',
              epigraph: storyData.subTitle,
              seccion: storyData.primarySection,
              url_seccion: `${siteUrl}${storyData.primarySectionLink}`,
              content: {
                '#cdata': BuildContent({
                  paragraphsNews: storyData.paragraphsNews,
                }),
              },
              autor: {
                nombre: storyData.author,
                url: `${siteUrl}${storyData.authorLink}`,
                cargo: storyData.authorRoleByNewsLetter
                  ? storyData.authorRoleByNewsLetter
                  : 'null',
                columna: storyData.authorBiography
                  ? storyData.authorBiography
                  : 'null',
                twitter: storyData.authorTwitterLink,
                imagen: `${siteUrl}${storyData.authorImage}`,
                thumb: storyData.authorSlug,
              },
            },
          }
        }),
      },
    }

    const { name: nameWebsked, description: descriptionWebsked } = websked || {}

    if (nameWebsked)
      newsletterFeed.rss.channel.unshift({
        nameCollection: nameWebsked,
        descriptionCollection: descriptionWebsked,
      })

    return newsletterFeed
  }
}

export default XmlNewsletterFeed
