/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'
import PropTypes from 'prop-types'
import { Html, BaseMarkup } from '@arc-core-components/amp-document-boilerplate'
import Styles from './_children/styles'
import MetaSite from './_children/meta-site'
import TwitterCards from './_children/twitter-cards'
import OpenGraph from './_children/open-graph'
import MetaStory from './_children/meta-story'
import AmpTagManager from './_children/amp-tag-manager'
import { addSlashToEnd } from '../utilities/parse/strings'
import {
  SITE_ELCOMERCIO,
  SITE_DEPOR,
  SITE_ELBOCON,
  SITE_GESTION,
  SITE_OJO,
  SITE_TROME,
  SITE_PERU21,
} from '../utilities/constants/sitenames'
import StoryData from '../utilities/story-data'
import RedirectError from '../utilities/redirect-error'
import { publicidadAmpMovil0 } from '../utilities/story/helpers-amp'
import { PREMIUM, METERED } from '../utilities/constants/content-tiers'
import { originByEnv } from '../utilities/arc/env'

const AmpOutputType = ({
  children,
  contextPath,
  deployment,
  arcSite,
  globalContent,
  siteProperties,
  requestUri,
  metaValue,
  Resource,
}) => {
  const metaPageData = {
    globalContent,
    requestUri,
    contextPath,
    arcSite,
    siteName: siteProperties.siteName,
    siteUrl: siteProperties.siteUrl,
    socialName: siteProperties.social && siteProperties.social.facebook,
    siteAssets: siteProperties.assets,
    metaValue,
    isAmp: true,
    deployment,
  }
  const {
    content_elements: contentElements = [{}],
    canonical_url: canonicalUrl = '',
    taxonomy: { sections } = {},
    credits: { by: autors } = {},
    headlines: { basic: storyTitle = '', meta_title: StoryMetaTitle = '' } = {},
    content_restrictions: { content_code: contentCode = '' } = {},
  } = globalContent || {}

  const { activePaywall, activeRulesCounter } = siteProperties

  const isMetered = contentCode === METERED
  const isPremium = contentCode === PREMIUM
  // Redirecciona a la version original si noticia es premium
  if (isPremium)
    throw new RedirectError(`${siteProperties.siteUrl}${canonicalUrl}`, 301)

  const isStory = /^\/.*\/.*-noticia/.test(requestUri)

  const metaSiteData = {
    ...siteProperties,
    requestUri,
    arcSite,
    contextPath,
    deployment,
    isStory,
    isAmp: true,
  }

  const storyTitleRe = StoryMetaTitle || storyTitle

  // const seoTitle =
  //   metaValue('title') &&
  //   !metaValue('title').includes('content') &&
  //   metaValue('title')

  // const title = `${seoTitle}: ${
  //   storyTitleRe ? storyTitleRe.substring(0, 70) : ''
  // } | ${siteProperties.siteTitle.toUpperCase()}`
  const siteTitleSuffix = siteProperties.siteTitle.toUpperCase()
  const sectionName = requestUri.split('/')[1].toUpperCase()
  const siteTitleSuffixR = siteTitleSuffix.replace('NOTICIAS ', '')
  const title = `${storyTitleRe} | ${sectionName} | ${siteTitleSuffixR}`

  const description =
    metaValue('description') && !metaValue('description').includes('content')
      ? `${metaValue('description')} `
      : 'Últimas noticias en Perú y el mundo'

  const twitterCardsData = {
    twitterUser:
      siteProperties.social &&
      siteProperties.social.twitter &&
      siteProperties.social.twitter.user,
    title,
    siteUrl: siteProperties.siteUrl,
    contextPath,
    arcSite,
    description,
    twitterCreator: siteProperties.social && siteProperties.social.twitter.user,
    story: isStory, // check data origin - Boolean
    deployment,
    globalContent,
  }
  const openGraphData = {
    fbAppId: siteProperties.fbAppId,
    title,
    description,
    siteUrl: siteProperties.siteUrl,
    contextPath,
    arcSite,
    requestUri,
    siteName: siteProperties.siteName,
    story: isStory, // check data origin - Boolean
    deployment,
    globalContent,
  }
  const parametros = {
    sections,
    autors,
    siteProperties,
    arcSite,
    globalContent,
    requestUri,
  }
  const {
    mp3Path,
    idYoutube,
    quantityGalleryItem,
    videoSeo,
    hasBodyGallery,
    contentElementsHtml,
    oembedSubtypes,
    promoItems: { basic_html: { content = '' } = {} } = {},
    subtype = '',
    promoItemJwplayer = {},
    jwplayerSeo = [],
    haveJwplayerMatching = false,
    publishDate,
  } = new StoryData({
    data: globalContent,
    arcSite,
    contextPath,
  })
  let rawHtmlContent = contentElementsHtml

  /** Youtube validation */
  const regexYoutube = /<iframe.+youtu\.be|youtube\.com/
  const hasYoutubeIframePromo = regexYoutube.test(content)
  const hasYoutube =
    idYoutube ||
    hasYoutubeIframePromo ||
    regexYoutube.test(rawHtmlContent) ||
    oembedSubtypes.includes('youtube') ||
    (arcSite === SITE_OJO &&
      contentElements.some(
        ({ content: textContent }) =>
          textContent && regexYoutube.test(textContent)
      ))

  /** Facebook validation */
  const hasFacebookIframePromo = /<iframe.+facebook.com\/plugins\//.test(
    content
  )
  const hasFacebook =
    hasFacebookIframePromo ||
    rawHtmlContent.includes('facebook.com/plugins/') ||
    oembedSubtypes.includes('facebook')

  /** Other validations */
  const hasGallery = quantityGalleryItem > 0 || hasBodyGallery
  const hasInstagram =
    rawHtmlContent.includes('instagram-media') ||
    oembedSubtypes.includes('instagram')
  const hasTwitter =
    rawHtmlContent.includes('twitter.com') || oembedSubtypes.includes('twitter')
  const hasSoundcloud = rawHtmlContent.includes('soundcloud.com/playlists/')

  /** ---------------------------- */
  const hasExternalCounterPaywall =
    isMetered &&
    activeRulesCounter &&
    activePaywall &&
    ((arcSite === SITE_GESTION &&
      /^\/(podcast|mundo|tecnologia|tendencias)\//.test(requestUri)) ||
      (arcSite === SITE_ELCOMERCIO &&
        /^\/(tecnologia|somos|opinion)\//.test(requestUri)))

  /** Iframe validation */
  /** Si existe un iframe como promoItem principal pero este iframe es
   * de youtube o facebook, se necesita el script de youtube o facebook
   * respectivamente, no el de iframe, por eso se hace esta validacion.
   */
  const hasIframePromo =
    !hasYoutubeIframePromo &&
    !hasFacebookIframePromo &&
    content.includes('<iframe')
  // SCRIPT AMP IFRAME
  const hasIframe =
    hasIframePromo ||
    arcSite === SITE_OJO ||
    arcSite === SITE_TROME ||
    arcSite === SITE_PERU21 ||
    /<iframe|<amp-iframe|<opta-widget|player.performgroup.com|<mxm-|ECO.Widget/.test(
      rawHtmlContent
    ) ||
    hasExternalCounterPaywall

  const hasEmbedCard = rawHtmlContent.includes('tiktok-embed')

  const hasJwVideo = rawHtmlContent.includes('cdn.jwplayer.com')
  /**
   * Se reemplaza los .mp4 de JWplayer para poder usar el fallback de
   * hasPowaVideo `.includes('.mp4')
   */
  if (hasJwVideo)
    rawHtmlContent = rawHtmlContent.replace(
      /content.jwplatform.com\/videos\/(.+).mp4/g,
      ''
    )

  const hasPowaVideo =
    content.includes('id="powa-') ||
    videoSeo[0] ||
    rawHtmlContent.includes('.mp4')
      ? 1
      : false

  const dataVideo = publishDate && publishDate.split('T')[0]
  const hasPowaVideoDate = dataVideo <= '2021-01-22' && hasPowaVideo

  let lang = 'es'
  if (arcSite === SITE_DEPOR) {
    if (requestUri.match('^/usa')) lang = 'es-us'
  }
  const adsId = arcSite !== 'peru21g21' ? arcSite : 'peru21'
  const dataSlot = `/28253241/${adsId}/amp/post/default/zocalo`
  const parameters = {
    arcSite,
    dataSlot,
  }
  const isTrivia = /^\/trivias\//.test(requestUri)

  return (
    <Html lang={lang}>
      <head>
        <BaseMarkup
          canonicalUrl={`${originByEnv(arcSite)}${addSlashToEnd(canonicalUrl)}`}
        />
        <title>{title}</title>
        <Styles {...metaSiteData} />
        <MetaSite {...metaSiteData} />
        <meta name="description" content={description} />
        {arcSite === SITE_GESTION && (
          <meta name="amp-experiments-opt-in" content="amp-next-page" />
        )}
        <TwitterCards {...twitterCardsData} />
        <OpenGraph {...openGraphData} />
        <MetaStory {...metaPageData} />
        {/* add additional head elements here */}

        {/* add additional head elements here */}

        <Resource
          path={`resources/dist/${arcSite}/css/${
            isTrivia ? 'amp-trivias' : 'amp'
          }.css`}>
          {({ data }) =>
            data ? (
              <style
                amp-custom="amp-custom"
                dangerouslySetInnerHTML={{
                  __html: data
                    .replace('@charset "UTF-8";', '')
                    .replace('-----------', ''),
                }}
              />
            ) : null}
        </Resource>
        {
          //* TODO habilitar subscriptions en AMP
          // isPremium && ( <script async custom-element="amp-subscriptions" src="https://cdn.ampproject.org/v0/amp-subscriptions-0.1.js"  /> )*/
        }
        <script
          async
          custom-element="amp-analytics"
          src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
        />
        {mp3Path && (
          <script
            async
            custom-element="amp-audio"
            src="https://cdn.ampproject.org/v0/amp-audio-0.1.js"
          />
        )}
        {hasGallery && (
          <script
            async
            custom-element="amp-carousel"
            src="https://cdn.ampproject.org/v0/amp-carousel-0.2.js"
          />
        )}
        {hasPowaVideoDate && (
          <>
            <script
              async
              custom-element="amp-ima-video"
              src="https://cdn.ampproject.org/v0/amp-ima-video-0.1.js"
            />
          </>
        )}
        <script
          async
          custom-element="amp-social-share"
          src="https://cdn.ampproject.org/v0/amp-social-share-0.1.js"
        />
        <script
          async
          custom-element="amp-sticky-ad"
          src="https://cdn.ampproject.org/v0/amp-sticky-ad-1.0.js"
        />
        <script
          async
          custom-element="amp-ad"
          src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
        />
        {hasIframe && (
          <script
            async
            custom-element="amp-iframe"
            src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"
          />
        )}
        {hasEmbedCard && (
          <script
            async
            custom-element="amp-embedly-card"
            src="https://cdn.ampproject.org/v0/amp-embedly-card-0.1.js"
          />
        )}
        {hasYoutube && (
          <script
            async
            custom-element="amp-youtube"
            src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"
          />
        )}
        <script
          async
          custom-element="amp-sidebar"
          src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"
        />

        {(arcSite === SITE_DEPOR || arcSite === SITE_ELBOCON) && hasJwVideo && (
          <script
            async
            custom-element="amp-jwplayer"
            src="https://cdn.ampproject.org/v0/amp-jwplayer-0.1.js"
          />
        )}
        {(promoItemJwplayer.key || jwplayerSeo[0] || hasPowaVideoDate) && (
          <script
            async
            custom-element="amp-video-docking"
            src="https://cdn.ampproject.org/v0/amp-video-docking-0.1.js"
          />
        )}
        {(promoItemJwplayer.key || jwplayerSeo[0] || haveJwplayerMatching) && (
          <script
            async
            custom-element="amp-jwplayer"
            src="https://cdn.ampproject.org/v0/amp-jwplayer-0.1.js"
          />
        )}

        {hasTwitter && (
          <script
            async
            custom-element="amp-twitter"
            src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"
          />
        )}
        {hasInstagram && (
          <script
            async
            custom-element="amp-instagram"
            src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"
          />
        )}
        {hasFacebook && (
          <script
            async
            custom-element="amp-facebook"
            src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"
          />
        )}
        <script
          async
          custom-element="amp-fx-flying-carpet"
          src="https://cdn.ampproject.org/v0/amp-fx-flying-carpet-0.1.js"
        />
        {arcSite === SITE_DEPOR && hasSoundcloud && (
          <script
            async
            custom-element="amp-soundcloud"
            src="https://cdn.ampproject.org/v0/amp-soundcloud-0.1.js"
          />
        )}
        <script
          async
          custom-element="amp-bind"
          src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
        />
        <script
          async
          custom-element="amp-fit-text"
          src="https://cdn.ampproject.org/v0/amp-fit-text-0.1.js"
        />
        {arcSite === SITE_GESTION && (
          <script
            async
            custom-element="amp-next-page"
            src="https://cdn.ampproject.org/v0/amp-next-page-0.1.js"
          />
        )}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        {isTrivia && (
          <>
            <link
              rel="preload"
              as="script"
              href="https://cdn.ampproject.org/v0/amp-story-1.0.js"
            />
            <script
              async
              custom-element="amp-story"
              src="https://cdn.ampproject.org/v0/amp-story-1.0.js"
            />
            <script
              async
              custom-element="amp-story-interactive"
              src="https://cdn.ampproject.org/v0/amp-story-interactive-0.1.js"
            />
            <script
              async
              custom-element="amp-story-auto-ads"
              src="https://cdn.ampproject.org/v0/amp-story-auto-ads-0.1.js"
            />
          </>
        )}
      </head>
      <body className={subtype}>
        {!isTrivia && (
          <>
            <AmpTagManager {...parametros} />
            <amp-sticky-ad
              layout="nodisplay"
              class="ad-amp-movil"
              dangerouslySetInnerHTML={publicidadAmpMovil0(parameters)}
            />
          </>
        )}
        {children}
      </body>
    </Html>
  )
}

// If no amp.jsx file exists, this feature will not render.
AmpOutputType.fallback = false

AmpOutputType.propTypes = {
  children: PropTypes.node,
  arcSite: PropTypes.string,
  isAmp: PropTypes.bool,
}

export default AmpOutputType
