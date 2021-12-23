import * as React from 'react'

import PianoAdblock from '../piano/adblock'
import PianoCore from '../piano/core'
import PianoData from '../piano/data'
import { getPreroll } from '../utilities/ads/preroll'
import { env } from '../utilities/arc/env'
import { getAssetsPath } from '../utilities/assets'
import { ContentTiers } from '../utilities/constants/content-tiers'
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
  PARALLAX,
} from '../utilities/constants/subtypes'
import { localISODate } from '../utilities/date-time/dates'
import { deleteQueryString } from '../utilities/parse/queries'
import { addSlashToEnd } from '../utilities/parse/strings'
import StoryData from '../utilities/story-data'
import { storyTagsBbc } from '../utilities/tags'
import AppNexus from './_children/appnexus'
import ChartbeatBody from './_children/chartbeat-body'
import LiteAds from './_children/lite-ads'
import LiveBlogPostingData from './_children/live-blog-posting-data'
import MetaSite from './_children/meta-site'
import MetaStory from './_children/meta-story'
import OpenGraph from './_children/open-graph'
import Preload from './_children/preload'
import Styles from './_children/styles'
import TagManager from './_children/tag-manager'
import TwitterCards from './_children/twitter-cards'
import VallaHtml from './_children/valla-html'
// import RegisterServiceWorker from './_children/register-service-worker'
import WebVitals from './_children/web-vitals'
import htmlScript from './_dependencies/html-script'
import iframeScript from './_dependencies/iframe-script'
import jwplayerScript from './_dependencies/jwplayer-script'
import minutoMinutoScript from './_dependencies/minuto-minuto-lite-script'
import { getOptaWidgetsFromStory } from './_dependencies/opta-widget-utils'
import {
  getEnabledServerside,
  getScriptAdPushup,
} from './_dependencies/serverside'
import {
  getDescription,
  getIsStory,
  getKeywords,
  getSectionPath,
  getTitle,
} from './_dependencies/utils'
import vallaScript from './_dependencies/valla'
import videoScript from './_dependencies/video-script'
import widgets from './_dependencies/widgets'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const LiteOutput = ({
  children,
  contextPath,
  deployment,
  arcSite,
  globalContent,
  Resource,
  siteProperties,
  requestUri,
  metaValue,
  Fusion,
  Libs,
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
    deployment,
  }
  const CURRENT_ENVIRONMENT = env
  const {
    videoSeo,
    idYoutube,
    contentElementsHtml,
    oembedSubtypes,
    embedTwitterAndInst,
    getPremiumValue,
    promoItems: { basic_html: { content = '' } = {} } = {},
    primarySectionLink: storySectionPath,
    jwplayerSeo,
  } = new StoryData({
    data: globalContent,
    arcSite,
    contextPath,
  })

  const {
    credits = {},
    headlines: { basic: storyTitle = '', meta_title: StoryMetaTitle = '' } = {},
    promo_items: promoItems = {},
    taxonomy: { tags = [] } = {},
    subtype = '',
    website_url: url = '',
    content_restrictions: { content_code: contentCode = '' } = {},
    page_number: pageNumber = 1,
  } = globalContent || {}

  const isPreview = /^\/preview\//.test(requestUri)
  const isStory = getIsStory({ metaValue, requestUri })
  const classBody = isStory
    ? `story ${promoItems.basic_gallery && 'basic_gallery'} ${arcSite} ${storySectionPath.split('/')[1]
    } ${subtype} `
    : ''

  const metaSiteData = {
    ...siteProperties,
    requestUri,
    arcSite,
    contextPath,
    deployment,
    isStory,
    isAmp: false,
    isLite: true,
  }

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

  const structuredTaboola = ` 
  window._taboola = window._taboola || [];
  _taboola.push({flush: true});`

  const structuredBBC = `
  !function(s,e,n,c,r){if(r=s._ns_bbcws=s._ns_bbcws||r,s[r]||(s[r+"_d"]=s[r+"_d"]||[],s[r]=function(){s[r+"_d"].push(arguments)},s[r].sources=[]),c&&0>s[r].sources.indexOf(c)){var t=e.createElement(n);t.async=1,t.src=c;var a=e.getElementsByTagName(n)[0];a.parentNode.insertBefore(t,a),s[r].sources.push(c)}}
  (window,document,"script","https://news.files.bbci.co.uk/ws/partner-analytics/js/pageTracker.min.js","s_bbcws");
  s_bbcws('partner', 'elcomercio.pe');
          s_bbcws('language', 'mundo');
  s_bbcws('track', 'pageView');`

  const isPremium = contentCode === ContentTiers.Premium
  const link = deleteQueryString(requestUri).replace(/\/homepage[/]?$/, '/')

  const parameters = {
    googleTagManagerId: siteProperties.googleTagManagerId,
    arcSite,
  }

  const regexYoutube = /<iframe.+youtu\.be|youtube\.com/
  const hasYoutubeVideo =
    idYoutube ||
    regexYoutube.test(content) ||
    regexYoutube.test(contentElementsHtml) ||
    oembedSubtypes.includes('youtube')
  const contenidoVideo =
    content.includes('id="powa-') || videoSeo[0] ? 1 : false

  /**
   * Lógica para las hojas de estilos
   */
  const style = 'lite-story'
  const dstyle = 'dlite-story'
  const mstyle = 'mlite-story'
  const vgalleryStyles = 'dlite-vgallery'

  let inlineStyleUrl = `resources/dist/${arcSite}/css/${dstyle}.css`
  let inlineVgalleryStyles = `resources/dist/${arcSite}/css/${vgalleryStyles}.css`

  let styleUrl = `${contextPath}/resources/dist/${arcSite}/css/${style}.css`
  const mStyleUrl = `${contextPath}/resources/dist/${arcSite}/css/${mstyle}.css`
  if (CURRENT_ENVIRONMENT === 'prod') {
    styleUrl = `https://cdnc.${siteProperties.siteDomain}/dist/${arcSite}/css/${style}.css`
  }
  if (arcSite === SITE_ELCOMERCIOMAG && CURRENT_ENVIRONMENT === 'prod') {
    styleUrl = `https://cdnc.mag.elcomercio.pe/dist/${arcSite}/css/${style}.css`
  }
  if (arcSite === SITE_PERU21G21 && CURRENT_ENVIRONMENT === 'prod') {
    styleUrl = `https://cdnc.g21.peru21.pe/dist/${arcSite}/css/${style}.css`
  }

  if (metaValue('section_style') === 'parallax') {
    inlineStyleUrl = `resources/dist/elcomercio/css/dlite-parallax.css`
    styleUrl = `${contextPath}/resources/dist/elcomercio/css/lite-parallax.css`

    if (arcSite === SITE_TROME) {
      styleUrl = `${contextPath}/resources/dist/trome/css/lite-parallax.css`
    }

    if (CURRENT_ENVIRONMENT === 'prod') {
      if (CURRENT_ENVIRONMENT === 'prod') {
        styleUrl = `https://cdnc.${siteProperties.siteDomain}/dist/elcomercio/css/lite-parallax.css`
      }
      if (arcSite === SITE_ELCOMERCIOMAG && CURRENT_ENVIRONMENT === 'prod') {
        styleUrl = `https://cdnc.mag.elcomercio.pe/dist/elcomercio/css/lite-parallax.css`
      }
      if (arcSite === SITE_PERU21G21 && CURRENT_ENVIRONMENT === 'prod') {
        styleUrl = `https://cdnc.g21.peru21.pe/dist/elcomercio/css/lite-parallax.css`
      }

      if (arcSite === SITE_TROME && CURRENT_ENVIRONMENT === 'prod') {
        styleUrl = `https://cdnc.g21.peru21.pe/dist/trome/css/lite-parallax.css`
      }
    }
  }

  if (metaValue('section_style') === 'story-v2-standard') {
    inlineStyleUrl = `resources/dist/elcomercio/css/story-v2-standard.css`
    styleUrl = ''
    inlineVgalleryStyles = ''
  }
  if (metaValue('section_style') === 'story-v2-video') {
    inlineStyleUrl = `resources/dist/elcomercio/css/story-v2-video.css`
    styleUrl = ''
  }

  if (metaValue('section_style') === 'video') {
    inlineStyleUrl = `resources/dist/${arcSite}/css/dlite-video.css`
    styleUrl = `${contextPath}/resources/dist/${arcSite}/css/lite-video.css`
    inlineVgalleryStyles = ''

    if (CURRENT_ENVIRONMENT === 'prod') {
      styleUrl = `https://cdnc.${siteProperties.siteDomain}/dist/${arcSite}/css/lite-video.css`
    }
  }

  /** */

  let lang = 'es'
  if (arcSite === SITE_DEPOR) {
    if (requestUri.match('^/usa')) {
      lang = 'es-us'
    } else if (/^\/mexico/.test(requestUri)) {
      lang = 'es-mx'
    } else if (/^\/colombia/.test(requestUri)) {
      lang = 'es-co'
    }
  }

  const parametersValla = {
    arcSite,
    arcEnv: CURRENT_ENVIRONMENT,
    getdata: new Date().toISOString().slice(0, 10),
  }
  const sectionAds = getSectionPath()

  const premiumValue =
    getPremiumValue === ContentTiers.Premium ? true : getPremiumValue
  const isPremiumFree = premiumValue === ContentTiers.Free ? 2 : premiumValue
  const isPremiumMete =
    isPremiumFree === ContentTiers.Metered ? false : isPremiumFree
  const vallaSignwall = isPremiumMete === 'vacio' ? false : isPremiumMete
  const isIframeStory = requestUri.includes('/carga-continua')
  const iframeStoryCanonical = `${siteProperties.siteUrl}${deleteQueryString(
    requestUri
  ).replace(/^\/carga-continua/, '')}`

  const fontFace = `@font-face {font-family: fallback-local; src: local(Arial); ascent-override: 125%; descent-override: 25%; line-gap-override: 0%;}`

  const OptaWidgetsFromStory = getOptaWidgetsFromStory(globalContent)

  const enabledPushup = getEnabledServerside(arcSite)
  const scriptAdpushup = getScriptAdPushup(arcSite)

  return (
    <html itemScope itemType="http://schema.org/WebPage" lang={lang}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="lang" content={lang} />
        {!isIframeStory && (
          <>
            <meta name="resource-type" content="document" />
            <meta content="global" name="distribution" />
            {(arcSite === 'trome' || arcSite === 'depor') && isStory ? (
              <meta
                name="robots"
                content={`${/-agnc-/.test(requestUri)
                  ? 'noindex, follow'
                  : 'index, follow,max-image-preview:large'
                  }`}
              />
            ) : (
              <meta
                name="robots"
                content="index, follow,max-image-preview:large"
              />
            )}
            {arcSite === 'trome' || arcSite === 'depor' ? null : (
              <meta name="GOOGLEBOT" content="index follow" />
            )}
            <meta name="author" content={siteProperties.siteName} />
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
            {isStory && !isPremium && subtype !== PARALLAX && (
              <link
                rel="amphtml"
                href={`${siteProperties.siteUrl}${addSlashToEnd(
                  url
                )}?outputType=amp`}
              />
            )}

            <title>{title}</title>
            {/**
             * dns-prefetch hace solo DNS lookup.
             * preconnect hace DNS lookup, TLS negotiation, y TCP handshake.
             * -----------------
             * Si el la conexion se hace SIEMPRE, vale la pena usar preconnect
             * (con dns-prefetch como fallback). Si la conexion no se hace siempre,
             * sino algunas veces, es mejor usar solo dns-prefetch para evitar la
             * TLS negotiation, y TCP handshake adicionales sin necesidad.
             *
             * https://web.dev/preconnect-and-dns-prefetch/
             */}
            {isStory && (
              <Preload
                arcSite={arcSite}
                sectionStyle={metaValue('section_style')}
              />
            )}
            <link
              rel="preconnect"
              href={`//cdnc.${siteProperties.siteDomain}`}
            />
            <link
              rel="dns-prefetch"
              href={`//cdnc.${siteProperties.siteDomain}`}
            />
            <link
              rel="preconnect"
              href={getAssetsPath(arcSite, contextPath).replace('https:', '')}
            />
            <link
              rel="dns-prefetch"
              href={getAssetsPath(arcSite, contextPath).replace('https:', '')}
            />
            {/* {isPremium && (
              <>
                <link
                  rel="preconnect"
                  href={`//elcomercio-${arcSite}-prod.cdn.arcpublishing.com`}
                />
                <link
                  rel="dns-prefetch"
                  href={`//elcomercio-${arcSite}-prod.cdn.arcpublishing.com`}
                />
              </>
            )} */}
            {isStory &&
              (arcSite === SITE_ELCOMERCIOMAG ||
                arcSite === SITE_PERU21 ||
                arcSite === SITE_DEPOR ||
                arcSite === SITE_ELCOMERCIO) && (
                <>
                  <link
                    rel="preconnect"
                    href="//d2dvq461rdwooi.cloudfront.net"
                  />
                  <link
                    rel="dns-prefetch"
                    href="//d2dvq461rdwooi.cloudfront.net"
                  />
                </>
              )}
            <link rel="preconnect" href="//www.googletagmanager.com/" />
            <link rel="dns-prefetch" href="//www.googletagmanager.com/" />
            <link rel="preconnect" href="//www.google-analytics.com" />
            <link rel="dns-prefetch" href="//www.google-analytics.com" />
            <link rel="preconnect" href="//static.chartbeat.com/" />
            <link rel="dns-prefetch" href="//static.chartbeat.com/" />
            <link rel="preconnect" href="//mab.chartbeat.com/" />
            <link rel="dns-prefetch" href="//mab.chartbeat.com/" />
            <link rel="dns-prefetch" href="//tags.bkrtx.com/" />
            <link rel="preconnect" href="//sb.scorecardresearch.com/" />
            <link rel="dns-prefetch" href="//sb.scorecardresearch.com/" />
            <link rel="dns-prefetch" href="//fonts.gstatic.com" />
            <link rel="dns-prefetch" href="//fonts.googleapis.com" />
            {isStory && (
              <>
                <link rel="dns-prefetch" href="//www.facebook.com/" />
                <link rel="dns-prefetch" href="//connect.facebook.net/" />
                <link rel="preconnect" href="//cds.taboola.com/" />
                <link rel="dns-prefetch" href="//cds.taboola.com/" />
              </>
            )}
            <link rel="dns-prefetch" href="//acdn.adnxs.com/" />
          </>
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
        <LiteAds
          requestUri={requestUri}
          tags={tags}
          contentCode={contentCode}
          siteProperties={siteProperties}
          arcSite={arcSite}
          section={sectionAds}
          subtype={subtype}
        />
        <Styles
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...metaSiteData}
        />
        {!isIframeStory ? (
          <>
            <MetaSite
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...metaSiteData}
            />
            <meta name="description" lang="es" content={description} />
            {isStory ? (
              ''
            ) : (
              <meta name="keywords" lang="es" content={keywords} />
            )}
            <OpenGraph
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...openGraphData}
            />
            <TwitterCards
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...twitterCardsData}
            />
            <PianoAdblock disabled={!siteProperties.activePiano} />
            <PianoData
              tags={tags.map((tag) => tag.slug)}
              contentTier={contentCode}
              storyId={globalContent?._id}
              section={sectionAds}
              publishDate={localISODate(globalContent?.display_date)}
              author={globalContent?.credits?.by?.[0]?.name}
              subtype={subtype}
              disabled={!siteProperties.activePiano}
            />
          </>
        ) : (
          // Solo para iframes de notas continuas
          <>
            <link rel="canonical" href={iframeStoryCanonical} />
            <meta name="twitter:site" content={twitterCardsData.twitterUser} />
          </>
        )}
        <MetaStory
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...metaPageData}
          isIframeStory={isIframeStory}
        />
        {arcSite === SITE_ELCOMERCIOMAG && (
          <meta property="fb:pages" content="530810044019640" />
        )}
        {/* renderMetaPage(metaValue('id'), metaPageData) */}
        <AppNexus
          arcSite={arcSite}
          requestUri={requestUri}
          port={metaValue('port')}
          isStory={isStory}
          globalContent={globalContent}
        />
        <Resource path={inlineStyleUrl}>
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
        {inlineVgalleryStyles && subtype === GALLERY_VERTICAL ? (
          <Resource path={inlineVgalleryStyles}>
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
        {metaValue('section_style') === 'provecho' ? (
          <Resource path="resources/dist/elcomercio/css/lite-provecho.css">
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
        {metaValue('section_style') === 'saltar-intro' ? (
          <Resource path="resources/dist/elcomercio/css/lite-saltar-intro.css">
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
        {isPremium || metaValue('include_fusion_libs') === 'true' ? (
          <Libs />
        ) : null}
        {isPremium &&
          (arcSite === SITE_ELCOMERCIO || arcSite === SITE_GESTION) &&
          !isPreview ? (
          <script
            src={`https://elcomercio-${arcSite}-${CURRENT_ENVIRONMENT}.cdn.arcpublishing.com/arc/subs/p.min.js?v=${new Date()
              .toISOString()
              .slice(0, 10)}`}
            async
          />
        ) : null}
        {!isIframeStory && <TagManager {...parameters} />}
        {arcSite === SITE_TROME && sectionAds !== 'deportes' && (
          <script
            async
            src="https://boot.pbstck.com/v1/tag/6e13d7a6-e4f7-4063-8d09-248ed9b1f70b"
          />
        )}
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
        {arcSite === SITE_PERU21 ||
        (arcSite === SITE_ELCOMERCIO && requestUri.includes('/mundo/')) ? (
          <>
            <script
              type="text/javascript"
              src="https://btloader.com/tag?o=5634903914840064&upapi=true"
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
        {isPremium || metaValue('include_fusion_libs') === 'true' ? (
          <Fusion />
        ) : null}
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
        {embedTwitterAndInst && (
          <>
            <script
              type="text/javascript"
              dangerouslySetInnerHTML={{ __html: widgets }}
            />
          </>
        )}
        {contenidoVideo && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `window.preroll='${getPreroll({
                  section: storySectionPath,
                  arcSite,
                  siteDomain: siteProperties.siteDomain,
                  metaValue,
                }) || siteProperties.urlPreroll
                  }'`,
              }}
            />
            <script
              defer
              src={deployment(
                `${contextPath}/resources/assets/js/powaSettings.min.js`
              )}
            />
            <script
              src={`https://d1tqo5nrys2b20.cloudfront.net/${CURRENT_ENVIRONMENT}/powaBoot.js?org=elcomercio`}
              defer
            />
            <script
              dangerouslySetInnerHTML={{
                __html: videoScript,
              }}
            />
          </>
        )}

        {jwplayerSeo[0] && (
          <script
            dangerouslySetInnerHTML={{
              __html: jwplayerScript,
            }}
          />
        )}

        {metaValue('section_style') !== 'story-v2-standard' &&
          (subtype === MINUTO_MINUTO || subtype === GALLERY_VERTICAL) ? (
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
        {hasYoutubeVideo && (
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
        <script
          dangerouslySetInnerHTML={{
            __html: iframeScript,
          }}
        />
        <script
          src={`${getAssetsPath(
            arcSite,
            contextPath
          )}/resources/assets/js/lazyload.js?d=1`}
        />

        <style
          dangerouslySetInnerHTML={{
            __html: fontFace,
          }}
        />

        <WebVitals
          report={
            !isIframeStory &&
            arcSite === SITE_ELBOCON &&
            requestUri.includes('/wikibocon/')
          }
        />
        {arcSite === SITE_ELCOMERCIOMAG ||
        arcSite === SITE_PERU21 ||
        arcSite === SITE_TROME ||
        arcSite === SITE_ELBOCON ||
        arcSite === SITE_DEPOR ||
        arcSite === SITE_DIARIOCORREO ||
        arcSite === SITE_PERUCOM ||
        arcSite === SITE_GESTION ||
        arcSite === SITE_OJO ||
        arcSite === SITE_GESTION ||
        arcSite === SITE_ELCOMERCIO ? (
          <script
            defer
            src={`https://d1r08wok4169a5.cloudfront.net/gpt-adtmp/ads-formats-v2/public/js/main.min.js?v=${new Date()
              .toISOString()
              .slice(0, 10)}`}
          />
        ) : (
          <script
            type="module"
            defer
            src={`https://d1r08wok4169a5.cloudfront.net/gpt-adtmp/ads-formats-development/public/js/main.js?v=${new Date()
              .toISOString()
              .slice(0, 10)}`}
          />
        )}
        {isStory && styleUrl && (
          <>
            {arcSite === SITE_ELBOCON ? (
              <>
                <noscript id="deferred-styles-m">
                  <link
                    rel="stylesheet"
                    type="text/css"
                    href={`${deployment(mStyleUrl)}`}
                  />
                </noscript>
                <noscript id="deferred-styles">
                  <link
                    rel="stylesheet"
                    type="text/css"
                    href={`${deployment(styleUrl)}`}
                  />
                </noscript>
                <script
                  dangerouslySetInnerHTML={{
                    __html: `"use strict";var loadDeferredStyles=function loadDeferredStyles(){var addStylesNode= site === 'boc' && isMobiles ?document.getElementById("deferred-styles-m"):document.getElementById("deferred-styles");var replacement=document.createElement("div");replacement.innerHTML=addStylesNode.textContent;document.body.appendChild(replacement);addStylesNode.parentElement.removeChild(addStylesNode)};var raf=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame;if(raf)raf(function(){window.requestIdle(loadDeferredStyles)});else window.addEventListener("load",loadDeferredStyles)`,
                  }}
                />
              </>
            ) : (
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
                    __html: `"use strict";var loadDeferredStyles=function loadDeferredStyles(){var addStylesNode=document.getElementById("deferred-styles");var replacement=document.createElement("div");replacement.innerHTML=addStylesNode.textContent;document.body.appendChild(replacement);addStylesNode.parentElement.removeChild(addStylesNode)};var raf=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame;if(raf)raf(function(){window.requestIdle(loadDeferredStyles)});else window.addEventListener("load",loadDeferredStyles)`,
                  }}
                />
              </>
            )}
          </>
        )}
        {enabledPushup &&
        !requestUri.includes('/publirreportaje/') &&
        !requestUri.includes('/publireportaje/') ? (
          <>
            <script
              type="text/javascript"
              dangerouslySetInnerHTML={{ __html: scriptAdpushup }}
            />
          </>
        ) : null}
        {vallaSignwall === false &&
          (arcSite === SITE_ELCOMERCIO || arcSite === SITE_GESTION) &&
          !isPreview ? (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: vallaScript(parametersValla),
              }}
            />
            {!isIframeStory && <VallaHtml />}
          </>
        ) : null}

        {contentElementsHtml.includes('graphics.afpforum.com') && (
          <script dangerouslySetInnerHTML={{ __html: htmlScript }} />
        )}
        {isIframeStory ? (
          <script
            defer
            src={deployment(
              `${contextPath}/resources/assets/js/storyIframe.min.js`
            )}
          />
        ) : (
          <PianoCore
            aid={siteProperties.pianoID?.[env]}
            disabled={!siteProperties.activePiano}
          />
        )}
        {arcSite === 'elcomercio' &&
        isStory &&
        metaValue('opta_scraping_path') &&
        OptaWidgetsFromStory.length > 0 ? (
          <LiveBlogPostingData OptaWidgetsFromStory={OptaWidgetsFromStory} />
        ) : null}
        {/*  <RegisterServiceWorker path={deployment("/sw.js")}/> */}
      </body>
    </html>
  )
}

LiteOutput.fallback = false

export default LiteOutput
