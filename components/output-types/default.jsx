import { ENVIRONMENT } from 'fusion:environment'
import * as React from 'react'

import { getPreroll } from '../utilities/ads/preroll'
import { getAssetsPath } from '../utilities/assets'
import { PREMIUM } from '../utilities/constants/content-tiers'
import { META_HOME } from '../utilities/constants/meta'
import {
  SITE_DEPOR,
  SITE_DIARIOCORREO,
  SITE_ELBOCON,
  SITE_ELCOMERCIO,
  SITE_ELCOMERCIOMAG,
  SITE_GESTION,
  SITE_OJO,
  SITE_PERU21,
  SITE_PERU21G21,
  SITE_PERUCOM,
  SITE_TROME,
} from '../utilities/constants/sitenames'
import {
  GALLERY_VERTICAL,
  MINUTO_MINUTO,
} from '../utilities/constants/subtypes'
import { deleteQueryString } from '../utilities/parse/queries'
import { addSlashToEnd, ifblogType } from '../utilities/parse/strings'
import StoryData from '../utilities/story-data'
import { storyTagsBbc } from '../utilities/tags'
import AppNexus from './_children/appnexus'
import ChartbeatBody from './_children/chartbeat-body'
import Dfp from './_children/dfp'
import MetaSite from './_children/meta-site'
import OpenGraph from './_children/open-graph'
import RegisterServiceWorker from './_children/register-service-worker'
import renderMetaPage from './_children/render-meta-page'
import Styles from './_children/styles'
import TagManager from './_children/tag-manager'
import TwitterCards from './_children/twitter-cards'
import WebVitals from './_children/web-vitals'
import htmlScript from './_dependencies/html-script'
import iframeScript from './_dependencies/iframe-script'
import jwplayerScript from './_dependencies/jwplayer-script'
import minutoMinutoScript from './_dependencies/minuto-minuto-script'
import { getEnablePushud, getPushud } from './_dependencies/pushud'
import { getEnabledServerside, getScriptAdPushup } from './_dependencies/serverside'
import {
  getDescription,
  getIsStory,
  getKeywords,
  getTitle,
  skipAdvertising,
} from './_dependencies/utils'
import videoScript from './_dependencies/video-script'
import widgets from './_dependencies/widgets'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default ({
  children,
  contextPath,
  deployment,
  arcSite,
  globalContent,
  // CssLinks, prueba
  Fusion,
  Libs,
  // MetaTags,
  siteProperties,
  requestUri,
  metaValue,
  Resource,
  isAdmin,
}) => {
  const CURRENT_ENVIRONMENT = ENVIRONMENT === 'elcomercio' ? 'prod' : 'sandbox' // se reutilizó nombre de ambiente

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
    deployment,
  }

  const {
    node_type: nodeType,
    _id: id,
    credits = {},
    headlines: { basic: storyTitle = '', meta_title: StoryMetaTitle = '' } = {},
    promo_items: promoItems = {},
    taxonomy: { tags = [] } = {},
    websites,
    subtype = '',
    website_url: url = '',
    content_restrictions: { content_code: contentCode = '' } = {},
    page_number: pageNumber = 1,
  } = globalContent || {}

  const { website_section: { path: storySectionPath = '' } = {} } =
    websites?.[arcSite] || {}

  const sectionPath = nodeType === 'section' ? id : storySectionPath
  const isStory = getIsStory({ metaValue, requestUri })
  const isVideosSection = /^\/videos\//.test(requestUri)
  const isSearchSection = /^\/buscar\//.test(requestUri)
  const isBlogPost = /^\/blog[s]?\/([\w\d-]+)\/([0-9]{4})\/([0-9]{2})\/([\w\d-]+)(?:\.html)?/.test(
    requestUri
  )

  let classBody = isStory
    ? `story ${promoItems.basic_gallery && 'basic_gallery'} ${arcSite} ${
        storySectionPath.split('/')[1]
      } ${subtype} `
    : ''
  classBody = isBlogPost ? 'blogPost' : classBody

  let lang = 'es'
  if (arcSite === SITE_DEPOR) {
    if (/^\/depor-play/.test(requestUri)) {
      classBody = `${classBody} depor-play`
    } else if (/^\/muchafoto/.test(requestUri)) {
      classBody = `${classBody} muchafoto`
    } else if (/^\/usa/.test(requestUri)) {
      lang = 'es-us'
    } else if (/^\/colombia/.test(requestUri)) {
      lang = 'es-co'
    } else if (/^\/mexico/.test(requestUri)) {
      lang = 'es-mx'
    }
  }

  if (arcSite === SITE_TROME) {
    if (/^\/pollon-eliminatorias/.test(requestUri)) {
      classBody = `${classBody} polla`
    }
  }

  if (/^\/play\//.test(requestUri)) {
    classBody = `${isStory ? 'story' : ''} section-play`
  } else if (/^\/peru21tv\//.test(requestUri)) {
    classBody = `${isStory ? 'story' : ''} section-peru21tv`
  } else if (isVideosSection) {
    classBody = `${
      isStory && arcSite !== SITE_OJO ? 'story' : ''
    } section-videos`
  }

  if (arcSite === SITE_ELCOMERCIO) {
    if (/^\/suscriptor-digital/.test(requestUri)) classBody = `section-premium`
    else if (/^\/saltar-intro/.test(requestUri)) classBody = `saltar-intro`
    else if (/^\/provecho/.test(requestUri)) classBody = `provecho`
  }
  const isHome = metaValue('id') === META_HOME && true
  const scriptAdpush = getPushud(arcSite)
  const enabledPushud = getEnablePushud(arcSite)
  const enabledPushup = getEnabledServerside(arcSite)
  const scriptAdpushup = getScriptAdPushup(arcSite)
  
  const isElcomercioHome = arcSite === SITE_ELCOMERCIO && isHome
  const isTromeHome = arcSite === SITE_TROME && isHome
  const isPreview = /^\/preview\//.test(requestUri)
  const { uuid_match: idMatch = '' } = promoItems

  const metaSiteData = {
    ...siteProperties,
    requestUri,
    arcSite,
    contextPath,
    deployment,
    isStory,
    idMatch,
    isAmp: false,
    CURRENT_ENVIRONMENT,
    Resource,
    isHome,
    metaValue,
  }

  const getPrebid = () => {
    let prebid = true
    if (
      arcSite === SITE_ELCOMERCIO ||
      arcSite === SITE_ELCOMERCIOMAG ||
      arcSite === SITE_ELBOCON ||
      arcSite === SITE_DIARIOCORREO ||
      arcSite === SITE_PERUCOM ||
      (arcSite === 'peru21' && requestUri.match(`^/cheka`))
    ) {
      prebid = false
    }
    return prebid
  }

  const indPrebid = getPrebid()
  const urlArcAds =
    // eslint-disable-next-line no-nested-ternary
    arcSite === SITE_ELCOMERCIOMAG
      ? `https://d1r08wok4169a5.cloudfront.net/ads/elcomerciomag/arcads.js?v=${new Date()
          .toISOString()
          .slice(0, 10)}`
      : indPrebid
      ? `https://d1r08wok4169a5.cloudfront.net/ads/arcads.js?v=${new Date()
          .toISOString()
          .slice(0, 10)}`
      : `https://d1r08wok4169a5.cloudfront.net/ads/ec/arcads.js?v=${new Date()
          .toISOString()
          .slice(0, 10)}`
  const getAfsStyle = () => {
    let styleAfsId = ''
    if (arcSite === SITE_DEPOR) {
      styleAfsId = '9799771650'
    } else if (arcSite === SITE_GESTION) {
      styleAfsId = '2165195451'
    }
    return styleAfsId
  }
  const styleIdAfsGo = getAfsStyle()

  const storyTitleRe = StoryMetaTitle || storyTitle

  const title = getTitle({
    metaValue,
    isStory,
    siteTitle: siteProperties.siteTitle,
    storyTitleRe,
    pageNumber,
    requestUri,
  })

  const description = getDescription({
    metaValue,
    siteName: siteProperties.siteName,
    pageNumber,
    requestUri,
    isStory,
  })

  const keywords = getKeywords({ metaValue, siteName: siteProperties.siteName })

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
    twitterCreator:
      siteProperties.social &&
      siteProperties.social.twitter &&
      siteProperties.social.twitter.user,
    story: isStory, // check data origin - Boolean
    deployment,
    globalContent,
    requestUri,
  }
  const isTrivia = /^\/trivias\//.test(requestUri)

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
    isTrivia,
    globalContent,
  }
  const collapseRetargetly = `"use strict";var _rl_gen_sg=function(){var e="_rl_sg",g=document.cookie.indexOf(e);if(-1==g)return[];g+=e.length+1;var o=document.cookie.indexOf(";",g);return-1==o&&(o=document.cookie.length),document.cookie.substring(g,o).split(",")},googletag=window.googletag||{cmd:[]};googletag.cmd.push(function(){googletag.pubads().collapseEmptyDivs(),googletag.pubads().setTargeting("_rl",_rl_gen_sg()),googletag.enableServices()});`
  const collapseDivs = `var googletag = window.googletag || {cmd: []}; googletag.cmd.push(function() {googletag.pubads().collapseEmptyDivs();console.log('collapse googleads');googletag.enableServices();});`
  const structuredTaboola = ` 
    window._taboola = window._taboola || [];
    _taboola.push({flush: true});`

  const { googleFonts = '', siteDomain = '' } = siteProperties || {}
  const noAds = skipAdvertising(tags)

  const structuredBBC = `!function(s,e,n,c,r){if(r=s._ns_bbcws=s._ns_bbcws||r,s[r]||(s[r+"_d"]=s[r+"_d"]||[],s[r]=function(){s[r+"_d"].push(arguments)},s[r].sources=[]),c&&0>s[r].sources.indexOf(c)){var t=e.createElement(n);t.async=1,t.src=c;var a=e.getElementsByTagName(n)[0];a.parentNode.insertBefore(t,a),s[r].sources.push(c)}}
  (window,document,"script","https://news.files.bbci.co.uk/ws/partner-analytics/js/pageTracker.min.js","s_bbcws");
  s_bbcws('partner', 'elcomercio.pe');
          s_bbcws('language', 'mundo');
  s_bbcws('track', 'pageView');`

  const isCovid = /^\/covid-19\//.test(requestUri)
  const isElecciones = metaValue('section_style') === 'resultados_elecciones'
  const isAgendaPre = metaValue('section_style') === 'agenda_presidencial'
  // const isSaltarIntro = /^\/saltar-intro\//.test(requestUri)
  const isPremium = contentCode === PREMIUM || false
  const htmlAmpIs = isPremium ? '' : true
  const link = deleteQueryString(requestUri).replace(/\/homepage[/]?$/, '/')

  const {
    videoSeo,
    idYoutube,
    contentElementsHtml,
    oembedSubtypes,
    embedTwitterAndInst,
    promoItems: { basic_html: { content = '' } = {} } = {},
    jwplayerSeo = [],
  } = new StoryData({
    data: globalContent,
    arcSite,
    contextPath,
  })

  const regexYoutube = /<iframe.+youtu\.be|youtube\.com/
  const hasYoutubeVideo =
    idYoutube ||
    regexYoutube.test(content) ||
    regexYoutube.test(contentElementsHtml) ||
    oembedSubtypes.includes('youtube')

  const contenidoVideo =
    content.includes('id="powa-') || videoSeo[0] ? 1 : false

  let style = 'style'
  if (
    (arcSite === SITE_ELCOMERCIO ||
      arcSite === SITE_ELCOMERCIOMAG ||
      arcSite === SITE_DEPOR ||
      arcSite === SITE_ELBOCON) &&
    /^\/videos\/(.*)/.test(requestUri)
  )
    style = 'story-video'
  else if (isStory && (arcSite === SITE_ELCOMERCIO || arcSite === SITE_DEPOR))
    style = 'story'
  else if (isElcomercioHome) style = 'dbasic'
  else if (isTromeHome) style = 'home-v2'
  else if (arcSite === SITE_TROME && /^\/pollon-eliminatorias/.test(requestUri))
    style = 'polla'

  let styleUrl = `${contextPath}/resources/dist/${arcSite}/css/${style}.css`
  if (CURRENT_ENVIRONMENT === 'prod') {
    styleUrl = `https://cdnc.${siteDomain}/dist/${arcSite}/css/${style}.css`
  }
  if (arcSite === SITE_ELCOMERCIOMAG && CURRENT_ENVIRONMENT === 'prod') {
    styleUrl = `https://cdnc.mag.elcomercio.pe/dist/${arcSite}/css/${style}.css`
  }
  if (arcSite === SITE_PERU21G21 && CURRENT_ENVIRONMENT === 'prod') {
    styleUrl = `https://cdnc.g21.peru21.pe/dist/${arcSite}/css/${style}.css`
  }
  if (arcSite === SITE_PERUCOM && CURRENT_ENVIRONMENT === 'prod') {
    styleUrl = `https://cdnc.elcomercio.pe/dist/${arcSite}/css/${style}.css`
  }
  const iscriptJwplayer = jwplayerSeo || isVideosSection

  const isStyleBasic = arcSite === 'elcomercio c' && isHome && true
  const isFooterFinal =
    (arcSite === 'elcomercio' || arcSite === SITE_ELBOCON) &&
    style === 'story-video' // isStyleBasic || (style === 'story' && true)

  const isFonts = isTrivia || isCovid

  const robotsIndex = `${
    /(\/(autor|autores)\/)(|[\w\d-]+\/)([0-9]+)\//.test(requestUri) &&
    !/(\/(autor|autores)\/)([\w\d-]+\/|)([1])\//.test(requestUri) &&
    arcSite === 'trome'
      ? 'noindex, follow'
      : 'index, follow,max-image-preview:large'
  }`

  return (
    <html itemScope itemType="http://schema.org/WebPage" lang={lang}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="lang" content={lang} />
        <meta name="resource-type" content="document" />
        <meta content="global" name="distribution" />
        {(arcSite === 'trome' || arcSite === 'depor') && isStory ? (
          <meta
            name="robots"
            content={`${
              /-agnc-/.test(requestUri)
                ? 'noindex, follow'
                : 'index, follow,max-image-preview:large'
            }`}
          />
        ) : (
          <>
            <meta name="robots" content={`${robotsIndex}`} />
          </>
        )}
        {arcSite === 'trome' || arcSite === 'depor' ? null : (
          <meta name="GOOGLEBOT" content="index follow" />
        )}
        <meta name="author" content={siteProperties.siteTitle} />
        {isStory && (
          <>
            <meta name="DC.title" lang="es" content={title} />
            <meta name="DC.description" lang="es" content={description} />
            <meta name="DC.subject" lang="es" content={keywords} />
            <meta
              name="DC.creator"
              content={`NOTICIAS ${siteProperties.siteName.toUpperCase()}`}
            />
            <meta
              name="DC.publisher"
              content={`NOTICIAS ${siteProperties.siteName.toUpperCase()}`}
            />
            <meta name="DC.language" scheme="RFC1766" content="es" />
          </>
        )}

        {isStory && htmlAmpIs && (
          <link
            rel="amphtml"
            href={`${siteProperties.siteUrl}${addSlashToEnd(
              url
            )}?outputType=amp`}
          />
        )}
        <title>{title}</title>
        <link rel="preconnect dns-prefetch" href={`//cdnc.${siteDomain}`} />
        <link
          rel="preconnect dns-prefetch"
          href={getAssetsPath(arcSite, contextPath).replace('https:', '')}
        />
        <link
          rel="preconnect dns-prefetch"
          href="//d1r08wok4169a5.cloudfront.net"
        />
        <link
          rel="preconnect dns-prefetch"
          href="//elcomercio-elcomercio-prod.cdn.arcpublishing.com"
        />
        <link rel="preconnect dns-prefetch" href="//s.go-mpulse.net" />
        <link rel="preconnect dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="preconnect dns-prefetch" href="//ajax.googleapis.com" />
        <link rel="preconnect dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect dns-prefetch" href="//www.google-analytics.com" />
        <link rel="preconnect dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="preconnect dns-prefetch" href="//www.facebook.com" />
        <link rel="preconnect dns-prefetch" href="//connect.facebook.net" />
        <link rel="preconnect dns-prefetch" href="//tags.bkrtx.com" />
        <link rel="preconnect dns-prefetch" href="//static.chartbeat.com" />
        <link rel="preconnect dns-prefetch" href="//sb.scorecardresearch.com" />
        <link rel="preconnect dns-prefetch" href="//ping.chartbeat.net" />
        <link rel="preconnect dns-prefetch" href="//mab.chartbeat.com" />
        <link
          rel="preconnect dns-prefetch"
          href="//arc-subs-sdk.s3.amazonaws.com"
        />
        <link rel="preconnect dns-prefetch" href="//acdn.adnxs.com" />
        {isFonts && (
          <>
            <link
              rel="preload"
              as="font"
              crossOrigin="crossorigin"
              type="font/woff2"
              href="https://cdna.elcomercio.pe/resources/dist/elcomercio/fonts/Prelo-Book.woff2"
            />
            <link
              rel="preload"
              as="font"
              crossOrigin="crossorigin"
              type="font/woff2"
              href="https://cdna.elcomercio.pe/resources/dist/elcomercio/fonts/Prelo-Medium.woff2"
            />
            <link
              rel="preload"
              as="font"
              crossOrigin="crossorigin"
              type="font/woff2"
              href="https://cdna.elcomercio.pe/resources/dist/elcomercio/fonts/Prelo-Bold.woff2"
            />
          </>
        )}
        {arcSite === 'elcomercio' &&
          !isTrivia &&
          !isCovid &&
          !isElecciones &&
          !isAgendaPre && (
            <>
              <link
                rel="preload"
                as="font"
                crossOrigin="crossorigin"
                type="font/woff2"
                href="https://cdna.elcomercio.pe/resources/dist/elcomercio/fonts/libre-franklin-v4-latin-500.woff2"
              />
              <link
                rel="preload"
                as="font"
                crossOrigin="crossorigin"
                type="font/woff2"
                href="https://cdna.elcomercio.pe/resources/dist/elcomercio/fonts/noto-serif-sc-v6-latin-500.woff2"
              />
            </>
          )}

        {/* Este cambio se ha devuelto para evaluar problema 
        de monetizacion con los ads.

        <Preconnects
        siteDomain={siteDomain}
          arcSite={arcSite}
          contextPath={contextPath}
          activePaywall={siteProperties.activePaywall}
          isHome={isHome}
        /> */}
        {googleFonts && (
          <link
            href={`https://fonts.googleapis.com/css?family=${googleFonts}&display=swap`}
            rel="stylesheet"
          />
        )}
        <script
          dangerouslySetInnerHTML={{
            /**
             * if(typeof window !== "undefined"){
                window.requestIdle = window.requestIdleCallback ||
                function (cb) {
                  const start = Date.now();
                  return setTimeout(function () {
                    cb({
                      didTimeout: false,
                      timeRemaining: function () {
                        return Math.max(0, 50 - (Date.now() - start));
                      },
                    });
                  }, 1);
                };

                window.addPrefetch = function addPrefetch(kind, url, as) {
                  const linkElem = document.createElement('link');
                  linkElem.rel = kind;
                  linkElem.href = url;
                  if (as) {
                      linkElem.as = as;
                  }
                  linkElem.crossOrigin = 'true';
                  document.head.append(linkElem);
                }
              }
            */
            __html: `"undefined"!=typeof window&&(window.requestIdle=window.requestIdleCallback||function(e){var n=Date.now();return setTimeout(function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-n))}})},1)},window.addPrefetch=function(e,n,t){var i=document.createElement("link");i.rel=e,i.href=n,t&&(i.as=t),i.crossOrigin="true",document.head.append(i)});`,
          }}
        />
        <Styles
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...metaSiteData}
          isStyleBasic={isStyleBasic}
          isFooterFinal={isFooterFinal}
        />

        <MetaSite
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...metaSiteData}
        />

        <meta name="description" lang="es" content={description} />
        {arcSite === SITE_ELCOMERCIOMAG && (
          <meta property="fb:pages" content="530810044019640" />
        )}
        {isStory ? '' : <meta name="keywords" lang="es" content={keywords} />}
        <TwitterCards
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...twitterCardsData}
        />
        <OpenGraph
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...openGraphData}
        />
        {isBlogPost && (
          <>
            <meta name="section-id" content="/blog" />
            <meta name="content-type" content="story" />
            <meta
              property="article:content_tier"
              content={ifblogType(globalContent)}
            />
          </>
        )}
        {renderMetaPage(metaValue('id'), metaPageData)}
        <AppNexus
          arcSite={arcSite}
          requestUri={requestUri}
          port={metaValue('port')}
          isStory={isStory}
          globalContent={globalContent}
        />
        {(arcSite === SITE_DEPOR || arcSite === SITE_GESTION) &&
          isSearchSection && (
            <>
              <script
                async="async"
                src="https://www.google.com/adsense/search/ads.js"
              />
              <script
                type="text/javascript"
                charset="utf-8"
                dangerouslySetInnerHTML={{
                  __html: `(function(g,o){g[o]=g[o]||function(){(g[o]['q']=g[o]['q']||[]).push(arguments)},g[o]['t']=1*new Date})(window,'_googCsa');`,
                }}
              />
            </>
          )}
        {/* Scripts de AdManager */}
        {!noAds && (
          <>
            {indPrebid && (
              <script
                defer
                src={`https://d2dvq461rdwooi.cloudfront.net/output/assets/js/prebid.js?v=v1${new Date()
                  .toISOString()
                  .slice(0, 10)}`}
              />
            )}
            <script defer src={urlArcAds} />
            {arcSite === SITE_DEPOR ? (
              <script
                defer
                type="text/javascript"
                dangerouslySetInnerHTML={{ __html: collapseRetargetly }}
              />
            ) : (
              <script
                type="text/javascript"
                defer
                dangerouslySetInnerHTML={{ __html: collapseDivs }}
              />
            )}
            <Dfp />
            {indPrebid && arcSite === SITE_TROME && (
              <script
                async
                src="https://boot.pbstck.com/v1/tag/6e13d7a6-e4f7-4063-8d09-248ed9b1f70b"
              />
            )}
          </>
        )}
        {/* Scripts de AdManager - Fin */}
        <ChartbeatBody
          story={isStory}
          hasVideo={contenidoVideo || hasYoutubeVideo}
          requestUri={requestUri}
          metaValue={metaValue}
          tags={tags}
          credits={credits}
          promoItems={promoItems}
          arcSite={arcSite}
          subtype={subtype}
        />
        {(!(metaValue('exclude_libs') === 'true') || isAdmin || isPremium) && (
          <Libs />
        )}
        {/* <!-- Paywall - Inicio --> */}
        {(() => {
          if (
            isElcomercioHome ||
            !siteProperties.activeRulesCounter ||
            isTrivia ||
            isPreview
          ) {
            return null
          }
          return (
            <script
              src={`https://elcomercio-${arcSite}-${CURRENT_ENVIRONMENT}.cdn.arcpublishing.com/arc/subs/p.min.js?v=${new Date()
                .toISOString()
                .slice(0, 10)}`}
              async
            />
          )
        })()}
        {/* <!-- Paywall - Fin --> */}
        {enabledPushud || arcSite !== SITE_PERU21 ? (
          <>
            <script
              type="text/javascript"
              data-cfasync="false"
              dangerouslySetInnerHTML={{ __html: scriptAdpush }}
            />
          </>
        ) : (
          <>
            <script
              type="text/javascript"
              src="https://btloader.com/tag?o=5634903914840064&upapi=true"
              async
            />
          </>
        )}
        <TagManager
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...siteProperties}
        />
        {/* ============== WebTracking */}
        {arcSite === SITE_ELCOMERCIO ? (
          <>
            <script
              defer
              src={deployment(
                `${contextPath}/resources/assets/js/emblue-sdk-worker.js`
              )}
            />
            <script
              src="https://cdn.embluemail.com/pixeltracking/pixeltracking.js?code=01780ae129e2be9f4afea429d618f3ec"
              async
            />
          </>
        ) : null}

        {arcSite === SITE_GESTION ? (
          <>
            <script
              defer
              src={deployment(
                `${contextPath}/resources/assets/js/emblue-sdk-worker.js`
              )}
            />
            <script
              src="https://cdn.embluemail.com/pixeltracking/pixeltracking.js?code=ddc9f70a72959e3037f40dd5359a99d6"
              async
            />
          </>
        ) : null}
        {/* ============== WebTracking */}
        {metaValue('section_style') === 'depor-play' ? (
          <Resource path="resources/dist/depor/css/depor-play.css">
            {({ data }) =>
              data ? (
                <style
                  dangerouslySetInnerHTML={{
                    __html: data
                      .replace('@charset "UTF-8";', '')
                      .replace('-----------', ''),
                  }}
                />
              ) : null
            }
          </Resource>
        ) : null}
      </head>
      <body
        className={classBody}
        itemScope
        itemType="http://schema.org/WebPage">
        <noscript>
          <iframe
            title="Google Tag Manager - No Script"
            src={`https://www.googletagmanager.com/ns.html?id=${siteProperties.googleTagManagerId}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <div id="fusion-app" role="application">
          {children}
        </div>
        {(!(metaValue('exclude_fusion') === 'true') ||
          isAdmin ||
          isPremium) && <Fusion />}
        {isStory && (
          <script
            type="text/javascript"
            defer
            dangerouslySetInnerHTML={{ __html: structuredTaboola }}
          />
        )}
        {isStory && storyTagsBbc(tags) && (
          <>
            <script
              type="text/javascript"
              defer
              dangerouslySetInnerHTML={{ __html: structuredBBC }}
            />
            <noscript>
              <img
                src="//a1.api.bbc.co.uk/hit.xiti?&x8=[synd_v5.7.0_nojs]&s=598346"
                height="1"
                width="1"
                border="0"
                alt=""
              />
            </noscript>
          </>
        )}
        <script
          defer
          src={`${getAssetsPath(
            arcSite,
            contextPath
          )}/resources/assets/js/lazyload.js?d=1`}
        />
        <script
          defer
          src={`https://d1r08wok4169a5.cloudfront.net/gpt-adtmp/gpt-adtmp.js?v=${new Date()
            .toISOString()
            .slice(0, 10)}`}
        />
        {enabledPushup && !requestUri.includes('/publirreportaje/') && !requestUri.includes('/publireportaje/') ? (
          <>
            <script
              type="text/javascript"
              dangerouslySetInnerHTML={{ __html: scriptAdpushup }}
            />
          </>
        ) : null}
        {(arcSite === SITE_DEPOR || arcSite === SITE_GESTION) &&
          isSearchSection && (
            <script
              dangerouslySetInnerHTML={{
                __html: `"use strict";!function(){var e="";null!=document.querySelector("input.search-input")&&(e=document.querySelector("input.search-input").value);_googCsa("ads",{pubId:"partner-pub-8088376505685131",query:e,styleId:"${styleIdAfsGo}"},{container:"afs_container_1"})}();`,
              }}
            />
          )}
        {(contenidoVideo || isVideosSection) && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `window.preroll='${
                  getPreroll({
                    section: sectionPath,
                    arcSite,
                    siteDomain,
                    metaValue,
                  }) || siteProperties.urlPreroll
                }';
                window.addPrefetch('preconnect', 'https://d1tqo5nrys2b20.cloudfront.net/')`,
              }}
            />
            <script
              async
              src={deployment(
                `${contextPath}/resources/assets/js/powaSettings.min.js`
              )}
            />
            <script
              src={`https://d1tqo5nrys2b20.cloudfront.net/${CURRENT_ENVIRONMENT}/powaBoot.js?org=elcomercio`}
              async
            />
          </>
        )}
        {iscriptJwplayer && (
          <script
            dangerouslySetInnerHTML={{
              __html: jwplayerScript,
            }}
          />
        )}
        {contenidoVideo && (
          <script
            dangerouslySetInnerHTML={{
              __html: videoScript,
            }}
          />
        )}
        {subtype === MINUTO_MINUTO || subtype === GALLERY_VERTICAL ? (
          <script
            dangerouslySetInnerHTML={{
              __html: minutoMinutoScript,
            }}
          />
        ) : (
          <></>
        )}
        {subtype === GALLERY_VERTICAL && (
          <Resource path="resources/assets/js/vertical-gallery.min.js">
            {({ data }) =>
              data ? (
                <script
                  dangerouslySetInnerHTML={{
                    __html: data,
                  }}
                />
              ) : null
            }
          </Resource>
        )}

        {(hasYoutubeVideo || isVideosSection) && (
          <>
            <Resource path="resources/assets/lite-youtube/styles.min.css">
              {({ data }) =>
                data ? (
                  <style
                    dangerouslySetInnerHTML={{
                      __html: data,
                    }}
                  />
                ) : null
              }
            </Resource>
            <script
              defer
              src={deployment(
                `${contextPath}/resources/assets/lite-youtube/lite-youtube.min.js`
              )}
            />
          </>
        )}
        {embedTwitterAndInst ? (
          <script dangerouslySetInnerHTML={{ __html: widgets }} />
        ) : null}
        {!isTrivia ? (
          <script dangerouslySetInnerHTML={{ __html: iframeScript }} />
        ) : null}
        <script
          dangerouslySetInnerHTML={{
            __html: `"use strict";(function(){requestIdle(function(){var ua=window.navigator.userAgent;var msie=ua.indexOf('MSIE ');var trident=ua.indexOf('Trident/');if(msie>0||trident>0){;[].slice.call(document.getElementsByClassName('grid')).forEach(function(grid){grid.className=grid.className.replace('grid','ie-flex')})}})})()`,
          }}
        />
        <WebVitals
          report={
            arcSite === SITE_ELBOCON && requestUri.includes('/wikibocon/')
          }
        />
        {isFooterFinal && (
          <>
            <noscript id="deferred-styles">
              <link
                rel="stylesheet"
                type="text/css"
                href={`${deployment(styleUrl)}`}
              />
            </noscript>

            <script
              dangerouslySetInnerHTML={{
                __html: `"use strict";var loadDeferredStyles=function loadDeferredStyles(){var addStylesNode=document.getElementById("deferred-styles");var replacement=document.createElement("div");replacement.innerHTML=addStylesNode.textContent;document.body.appendChild(replacement);addStylesNode.parentElement.removeChild(addStylesNode)};var raf=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame;if(raf)raf(function(){window.setTimeout(loadDeferredStyles,0)});else window.addEventListener("load",loadDeferredStyles)`,
              }}
            />
          </>
        )}
        {contentElementsHtml.includes('graphics.afpforum.com') && (
          <script dangerouslySetInnerHTML={{ __html: htmlScript }} />
        )}
        {arcSite === SITE_ELBOCON ? (
          <RegisterServiceWorker path={deployment('/sw.js')} />
        ) : null}
      </body>
    </html>
  )
}
