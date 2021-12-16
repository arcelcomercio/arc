/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types'
import * as React from 'react'

import { originByEnv } from '../utilities/arc/env'
import { METERED, PREMIUM } from '../utilities/constants/content-tiers'
import {
  SITE_DEPOR,
  SITE_DIARIOCORREO,
  SITE_ELBOCON,
  SITE_ELCOMERCIO,
  SITE_GESTION,
  SITE_OJO,
  SITE_PERU21,
  SITE_TROME,
} from '../utilities/constants/sitenames'
import { addSlashToEnd } from '../utilities/parse/strings'
import RedirectError from '../utilities/redirect-error'
import StoryData from '../utilities/story-data'
import AmpTagManager from './_children/amp-tag-manager'
import MetaSite from './_children/meta-site'
import MetaStory from './_children/meta-story'
import OpenGraph from './_children/open-graph'
import Styles from './_children/styles'
import TwitterCards from './_children/twitter-cards'
import { BaseMarkup, Html, ScriptAmp } from './_dependencies/baseAMP'

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
    // _id: storyId,
  } = globalContent || {}

  const envOrigin = originByEnv(arcSite)
  const { activePaywall, activeRulesCounter } = siteProperties

  const isMetered = contentCode === METERED
  const isPremium = contentCode === PREMIUM
  // Redirecciona a la version original si noticia es premium
  if (isPremium) throw new RedirectError(`${envOrigin}${canonicalUrl}`, 301)

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
  const sectionName = requestUri && requestUri.split('/')[1].toUpperCase()
  const siteTitleSuffixR = siteTitleSuffix.replace('NOTICIAS ', '')
  const title = `${storyTitleRe} | ${sectionName} | ${siteTitleSuffixR}`

  let description =
    metaValue('description') && !metaValue('description').includes('content')
      ? `${metaValue('description')} `
      : 'Últimas noticias en Perú y el mundo'

  if (isStory) {
    description =
      globalContent?.description?.basic ||
      (metaValue('description') && !metaValue('description').includes('content')
        ? `${metaValue('description')} `
        : 'Últimas noticias en Perú y el mundo')
  }

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
    isAmp: true,
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
    isMetered && activeRulesCounter && activePaywall && arcSite === SITE_GESTION

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
    arcSite === SITE_ELBOCON ||
    arcSite === SITE_DIARIOCORREO ||
    arcSite === SITE_GESTION ||
    arcSite === SITE_ELCOMERCIO ||
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

  const isTrivia = /^\/trivias\//.test(requestUri)
  return (
    <Html lang={lang}>
      <head>
        <BaseMarkup
          canonicalUrl={`${envOrigin}${addSlashToEnd(canonicalUrl)}`}
        />
        <title>{title}</title>
        {arcSite === SITE_DEPOR && (
          <>
            <link rel="preconnect" href="//cdn.ampproject.org" />
            <link rel="preconnect" href="//cdna.depor.com" />
          </>
        )}
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
        <ScriptAmp
          mp3Path={mp3Path}
          hasPowaVideoDate={hasPowaVideoDate}
          hasGallery={hasGallery}
          metaValue={metaValue}
          hasEmbedCard={hasEmbedCard}
          hasIframe={hasIframe}
          hasYoutube={hasYoutube}
          arcSite={arcSite}
          promoItemJwplayer={promoItemJwplayer}
          jwplayerSeo={jwplayerSeo}
          haveJwplayerMatching={haveJwplayerMatching}
          hasInstagram={hasInstagram}
          hasTwitter={hasTwitter}
          hasFacebook={hasFacebook}
          isTrivia={isTrivia}
          hasSoundcloud={hasSoundcloud}
          hasJwVideo={hasJwVideo}
        />
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
            ) : null
          }
        </Resource>
        {
          //* TODO habilitar subscriptions en AMP
          // isPremium && ( <script async custom-element="amp-subscriptions" src="https://cdn.ampproject.org/v0/amp-subscriptions-0.1.js"  /> )*/
        }
      </head>
      <body className={subtype}>
        {!isTrivia && (
          <>
            <AmpTagManager {...parametros} />
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
