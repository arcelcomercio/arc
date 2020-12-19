import Consumer from 'fusion:consumer'
import getProperties from 'fusion:properties'
import md5 from 'md5'
import StoryData from '../../../utilities/story-data'
import { getMultimediaAnalitycs, nbspToSpace } from '../../../utilities/helpers'
import { localISODate, getActualDate } from '../../../utilities/date-time/dates'
import formatTime from '../../../utilities/date-time/format-time'
import buildHtml from './_dependencies/build-html'
import customFields from './_dependencies/custom-fields'
import { includePromoItems } from '../../../utilities/included-fields'
import schemaFilter from '../../stories-lists/recommender-by-site/_dependencies/schema-filter'
import {
  SITE_ELCOMERCIO,
  SITE_ELCOMERCIOMAG,
} from '../../../utilities/constants/sitenames'

/**
 * @description Feed para Facebook Instant Articles.
 *
 * @returns {Object} Objeto con estructura manipulable por
 * xmlBuilder, para construir Feed de noticias para Facebook Instant Articles.
 */

const DESCRIPTION = 'Todas las Noticias'

@Consumer
class XmlFacebookInstantArticles {
  constructor(props) {
    this.props = props
    const { globalContent, arcSite } = props
    const { content_elements: stories = [] } = globalContent || {}
    this.stories = stories

    // Módulo recomendador por marca
    if (arcSite === SITE_ELCOMERCIO || arcSite === SITE_ELCOMERCIOMAG) {
      const {
        customFields: {
          enabledContentManual,
          storiesManualConfig: {
            contentService: contentServiceManual = '',
            contentConfigValues: contentConfigManualValues = {},
          } = {},
          storiesConfig: { contentService = '', contentConfigValues = {} } = {},
          titleField = '',
        } = {},
      } = this.props
      const { website: websiteRecommenderManual } = contentConfigManualValues
      const { website: websiteRecommender } = contentConfigValues
      const { siteUrl: siteUrlRecommenderManual } =
        getProperties(websiteRecommenderManual || arcSite) || {}
      const { siteUrl: siteUrlRecommender } =
        getProperties(websiteRecommender || arcSite) || {}
      const presets = 'no-presets'
      const includedFieldsManual = `headlines.basic,promo_items.basic_html.content,${includePromoItems},websites.${websiteRecommenderManual ||
        arcSite}.website_url`
      const includedFields = `headlines.basic,promo_items.basic_html.content,${includePromoItems},websites.${websiteRecommender ||
        arcSite}.website_url`

      this.state = {
        websiteRecommenderManual,
        websiteRecommender,
        siteUrlRecommenderManual,
        siteUrlRecommender,
        titleRecommender: titleField,
      }

      if (enabledContentManual)
        this.fetchContent({
          recommenderDataManual: {
            source: contentServiceManual,
            query: Object.assign(contentConfigManualValues, {
              presets,
              includedFieldsManual,
            }),
            filter: schemaFilter(websiteRecommenderManual || arcSite),
          },
        })

      this.fetchContent({
        recommenderData: {
          source: contentService,
          query: Object.assign(contentConfigValues, {
            presets,
            includedFields,
          }),
          filter: schemaFilter(websiteRecommender || arcSite),
        },
      })
    }
    // FIN recomendador por marca

    /* if (siteUrl === 'https://elcomercio.pe') {
      this.fetchContent({
        magStories: {
          source: 'story-feed-by-section-mag',
          transform: data => {
            if (!data) return []
            const { content_elements: magStories } = data
            return magStories
          },
        },
      })
    } */
  }

  render() {
    // const { magStories } = this.state || {}
    // if (magStories) this.stories = [...this.stories, ...magStories]

    const {
      deployment,
      contextPath,
      arcSite,
      siteProperties: {
        siteName = '',
        siteUrl = '',
        siteDomain = '',
        idGoogleAnalitics = '',
        fbArticleStyle = '',
        listUrlAdvertisings = [],
        ids: { opta },
      } = {},
    } = this.props

    if (!this.stories) {
      return null
    }

    const storyData = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize: 'sm',
    })

    const {
      websiteRecommender = '',
      websiteRecommenderManual = '',
      titleRecommender = '',
      siteUrlRecommenderManual = '',
      siteUrlRecommender = '',
      recommenderDataManual = {},
      recommenderData: recommenderDa = {},
    } = this.state || {}
    const { content_elements: contentElementsRecommenderManual = [] } =
      recommenderDataManual || {}
    const { content_elements: contentElementsRecommender = [] } =
      recommenderDa || {}
    const recommenderData = {
      dataOne: contentElementsRecommenderManual,
      dataTwo: contentElementsRecommender,
      websiteOne: websiteRecommenderManual,
      websiteTwo: websiteRecommender,
      siteUrlOne: siteUrlRecommenderManual,
      siteUrlTwo: siteUrlRecommender,
      title: titleRecommender,
    }

    const fbInstantArticlesFeed = {
      rss: {
        '@version': '2.0',
        '@xmlns:atom': 'http://www.w3.org/2005/Atom',
        '@xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
        '@xmlns:slash': 'http://purl.org/rss/1.0/modules/slash/',
        channel: [
          { language: 'es' },
          { title: siteName },
          { description: DESCRIPTION },
          { lastBuildDate: localISODate() },
          { link: siteUrl },
          ...this.stories.map(story => {
            storyData.__data = story

            const {
              related_by_tags: { content_elements: rawTagsUrls = [] } = {},
            } = story || {}
            const websiteUrlsBytag = rawTagsUrls.map(({ websites = {} }) => {
              const { website_url: websiteUrlBytag = '' } =
                websites[arcSite] || {}
              return `${siteUrl}${websiteUrlBytag}`
            })

            let storyLink = ''
            let fiaContent = ''
            if (storyData.fiaOrigen === true) {
              if (
                siteUrl === 'https://elcomercio.pe' &&
                storyData.canonicalWebsite === 'elcomerciomag'
              ) {
                fiaContent = 'MAG'
                const {
                  websites: {
                    elcomerciomag: { website_url: magWebsiteUrl = '' } = {},
                  } = {},
                } = story || {}
                storyLink = `${siteUrl}/mag${magWebsiteUrl}`
              } else {
                storyLink = `${siteUrl}${storyData.websiteLink}`
                fiaContent = fbArticleStyle
              }
              const pageview = `${storyLink.replace(
                siteUrl,
                ''
              )}?outputType=fia`

              const propsScriptHeader = {
                siteDomain,
                title: nbspToSpace(storyData.title),
                sections: storyData.allSections,
                tags: storyData.tags,
                author: nbspToSpace(storyData.author),
                typeNews: storyData.multimediaType,
                premium: storyData.isPremium,
              }

              const scriptAnaliticaProps = {
                siteDomain,
                idGoogleAnalitics,
                name: siteDomain,
                section: storyData.sectionsFIA.section,
                subsection: storyData.sectionsFIA.subsection,
                newsId: storyData.id,
                author: nbspToSpace(storyData.author),
                newsType: getMultimediaAnalitycs(
                  storyData.multimediaType,
                  storyData.subtype
                ),
                pageview,
                newsTitle: nbspToSpace(storyData.title),
                nucleoOrigen: storyData.nucleoOrigen,
                formatOrigen: storyData.formatOrigen,
                contentOrigen: storyData.contentOrigen,
                genderOrigen: storyData.genderOrigen,
                arcSite,
              }

              const buildHtmlProps = {
                scriptAnaliticaProps,
                propsScriptHeader,
                title: nbspToSpace(storyData.title),
                subTitle: nbspToSpace(storyData.subTitle),
                canonical: storyLink,
                oppublished: localISODate(storyData.date || ''),
                multimedia: storyData.multimediaNews,
                author: nbspToSpace(storyData.author),
                paragraphsNews: storyData.paragraphsNews,
                fbArticleStyle: fiaContent,
                listUrlAdvertisings,
                websiteUrlsBytag,
                arcSite,
                section: storyData.sectionsFIA.section,
                getPremiumValue: storyData.getPremiumValue,
                siteUrl,
                opta,
                defaultImage: storyData.defaultImg,
                recommenderData,
                videoPrincipal: storyData.videoStreams,
                subtype: storyData.subtype,
                contentElementGallery: storyData.contentElementGallery,
                promoItemJwplayer: storyData.promoItemJwplayer,
              }
              const today = new Date()
              const localTime = new Date(today.setHours(today.getHours() - 5))

              return {
                item: {
                  title: {
                    '#cdata': storyData.title,
                  },
                  pubDate: localISODate(storyData.date || ''),
                  link: storyLink,
                  guid: md5(storyData.id),
                  author: nbspToSpace(storyData.author),
                  premium: storyData.isPremium,
                  captureDate: `${getActualDate()}, ${formatTime(localTime)}`,
                  'content:encoded': {
                    '#cdata': buildHtml(buildHtmlProps),
                  },
                  'slash:comments': '0',
                },
              }
            }
            return { '#text': '' }
          }),
        ],
      },
    }

    return fbInstantArticlesFeed
  }
}

XmlFacebookInstantArticles.propTypes = {
  customFields,
}
XmlFacebookInstantArticles.static = true

export default XmlFacebookInstantArticles
