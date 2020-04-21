import React from 'react'
import ENV from 'fusion:environment'
import MetaSite from './_children/meta-site'
import TwitterCards from './_children/twitter-cards'
import OpenGraph from './_children/open-graph'
import TagManager from './_children/tag-manager'
import renderMetaPage from './_children/render-meta-page'
import AppNexus from './_children/appnexus'
import Dfp from './_children/dfp'
import ChartbeatBody from './_children/chartbeat-body'
import AdsScriptsFloorPrices from './_children/ads-scripts/floor-prices'
// import FirebaseScripts from './_children/firebase-scripts'
import {
  skipAdvertising,
  storyTagsBbc,
  addSlashToEnd,
  deleteQueryString,
} from '../utilities/helpers'
// import ConfigParams from '../utilities/config-params'
import { getAssetsPath } from '../utilities/constants'
import StoryData from '../utilities/story-data'

import iframeScript from './_dependencies/iframe-script'

export default ({
  children,
  contextPath,
  deployment,
  arcSite,
  globalContent,
  // CssLinks,
  Fusion,
  Libs,
  // MetaTags,
  siteProperties,
  requestUri,
  metaValue,
  Resource,
  isAdmin,
}) => {
  const CURRENT_ENVIRONMENT =
    ENV.ENVIRONMENT === 'elcomercio' ? 'prod' : 'sandbox' // se reutilizó nombre de ambiente

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
    headlines: { basic: storyTitle = '', meta_title: StoryMetaTitle = '' } = {},
    promo_items: { basic_gallery: basicGallery = 0 } = {},
    taxonomy: {
      primary_section: { path: nameSeccion = '' } = {},
      tags = [],
    } = {},
    subtype = '',
    page_number: pageNumber = 1,
  } = globalContent || {}

  const isStory =
    metaValue('id') === 'meta_story' ||
    requestUri.match(`^/preview/([A-Z0-9]{26})/?`) ||
    ''

  const isBlogPost = requestUri.match(`^(/blogs?/.*.html)`)

  let classBody = isStory
    ? `story ${basicGallery && 'basic_gallery'} ${arcSite} ${
        nameSeccion.split('/')[1]
      } ${subtype} `
    : ''
  classBody = isBlogPost ? 'blogPost' : classBody

  if (arcSite === 'depor') {
    if (requestUri.match('^/depor-play')) classBody = `${classBody} depor-play`
    if (requestUri.match('^/muchafoto')) classBody = `${classBody} muchafoto`
  }

  if (requestUri.match(`^(/play/.*)`))
    classBody = `${isStory && 'story'} section-play`
  if (requestUri.match(`^(/videos/.*)`))
    classBody = `${isStory && 'story'} section-videos`
  if (requestUri.match(`^(/peru21tv/.*)`))
    classBody = `${isStory && 'story'} section-peru21tv`

  if (arcSite === 'elcomercio') {
    if (requestUri.match('^/suscriptor-digital')) classBody = `section-premium`
  }

  const metaSiteData = {
    ...siteProperties,
    requestUri,
    arcSite,
    contextPath,
    deployment,
    isStory,
    isAmp: false,
    CURRENT_ENVIRONMENT,
    Resource,
  }

  const storyTitleRe = StoryMetaTitle || storyTitle

  const seoTitle =
    metaValue('title') &&
    !metaValue('title').match(/content/) &&
    metaValue('title')

  const getTitle = () => {
    let title = `${seoTitle} | ${siteProperties.siteName}`
    if (isStory) {
      title = `${storyTitleRe} ${seoTitle} | ${siteProperties.siteName}`
    } else if (
      pageNumber > 1 &&
      (metaValue('id') === 'meta_tag' || metaValue('id') === 'meta_author')
      /*  || metaValue('id') === "meta_search" */
    ) {
      title = `${seoTitle} | Página ${pageNumber} | ${siteProperties.siteName}`
    } else if (metaValue('id') === 'meta_archive') {
      const hasDate = /\d{4}-\d{2}-\d{2}/.test(requestUri)
      const hasSection =
        /\/archivo\/([\w\d-]+)/.test(requestUri) &&
        !/\/archivo\/todas/.test(requestUri)
      if (!hasDate && !hasSection) {
        title = `Archivo de Noticias | ${siteProperties.siteName}`
      }
    }
    return title
  }

  const title = getTitle()

  const getDescription = () => {
    let description = `Últimas noticias, fotos, y videos de Perú y el mundo en ${siteProperties.siteName}.`
    if (
      metaValue('description') &&
      !metaValue('description').match(/content/)
    ) {
      description = `${metaValue('description')}`
      if (
        (pageNumber > 1 && metaValue('id') === 'meta_tag') ||
        metaValue('id') === 'meta_author'
        /*  || metaValue('id') === "meta_search" */
      ) {
        description = `${metaValue('description')} Página ${pageNumber}.`
      } else if (metaValue('id') === 'meta_archive') {
        const hasDate = /\d{4}-\d{2}-\d{2}/.test(requestUri)
        const hasSection =
          /\/archivo\/([\w\d-]+)/.test(requestUri) &&
          !/\/archivo\/todas/.test(requestUri)
        if (!hasDate && !hasSection) {
          description = `Archivo de noticias de ${siteProperties.siteName}. Noticias actualizadas del Perú y el Mundo con fotos, videos y galerías sobre actualidad, deportes, economía y otros.`
        }
      }
    }
    return description
  }

  const description = getDescription()

  const keywords =
    metaValue('keywords') && !metaValue('keywords').match(/content/)
      ? metaValue('keywords')
      : `Noticias, ${siteProperties.siteName}, Peru, Mundo, Deportes, Internacional, Tecnologia, Diario, Cultura, Ciencias, Economía, Opinión`

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
  const collapseDivs = `var googletag = window.googletag || {cmd: []}; googletag.cmd.push(function() {googletag.pubads().collapseEmptyDivs();console.log('collapse googleads');googletag.enableServices();});`
  const structuredTaboola = ` 
    window._taboola = window._taboola || [];
    _taboola.push({flush: true});`

  const structuredDetectIncognito = `(async function() {
    if ("storage" in navigator && "estimate" in navigator.storage) {
      var { usage, quota } = await navigator.storage.estimate();
      if (quota < 120000000) {
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
          event: 'tag_signwall', eventCategory: 'Web_Sign_Wall_Security', eventAction: 'web_sws_mode_incognito',
        })
      }
    }
  })()`

  const { googleFonts = '', siteDomain = '' } = siteProperties || {}
  const nodas = skipAdvertising(tags)

  const isLivePage = arcSite === 'elcomercio' && requestUri.match(`^/en-vivo/`)

  const structuredBBC = `
  !function(s,e,n,c,r){if(r=s._ns_bbcws=s._ns_bbcws||r,s[r]||(s[r+"_d"]=s[r+"_d"]||[],s[r]=function(){s[r+"_d"].push(arguments)},s[r].sources=[]),c&&0>s[r].sources.indexOf(c)){var t=e.createElement(n);t.async=1,t.src=c;var a=e.getElementsByTagName(n)[0];a.parentNode.insertBefore(t,a),s[r].sources.push(c)}}
  (window,document,"script","https://news.files.bbci.co.uk/ws/partner-analytics/js/pageTracker.min.js","s_bbcws");
  s_bbcws('partner', 'elcomercio.pe');
          s_bbcws('language', 'mundo');
  s_bbcws('track', 'pageView');`

  const scriptVideo = `
 const videoObserver = (entries, observer) => {
  entries.forEach(entry => {
    const { isIntersecting, target } = entry
    if (isIntersecting) {
      const uuid = target.getAttribute('data-uuid')
      const preroll = target.getAttribute('data-preroll')
      const api = target.getAttribute('data-api')
      const poster = target.getAttribute('data-poster')
      const streams = target.getAttribute('data-streams')
      const reziser = target.getAttribute('data-reziser')
      const dataVideo = '<div class="powa" id="powa-{uuid}" data-sticky=true data-org="elcomercio" data-env="${CURRENT_ENVIRONMENT}" data-stream="{stream}" data-uuid="{uuid}" data-aspect-ratio="0.562" data-api="${CURRENT_ENVIRONMENT}" data-preload=none ></div>'
      target.innerHTML = dataVideo.replace(/{uuid}/mg,uuid).replace(/{stream}/mg,streams)
      if (window.powaBoot) window.powaBoot()
      setTimeout(function(){  
        if (window.PoWaSettings) {
          window.preroll = preroll
          window.PoWaSettings.advertising = {
            adBar: false,
            adTag: preroll,
          }
        }
      }, 1000);

      window.addEventListener('powaRender',
        function () {
          setTimeout(function(){  
            target.classList.remove("powa-default")
          }, 1000);
        }
     )
  
      observer.unobserve(target)
    }
  })
}

if ('IntersectionObserver' in window) {
  const options = {
    rootMargin: '0px 0px 0px 0px',
  }
  const videos = Array.from(document.querySelectorAll('.lazyload-video'))
  videos.forEach(video => {
         const observer = new IntersectionObserver(videoObserver, options)
      observer.observe(video)
      
  })
}
`
  const {
    website_url: url = '',
    content_restrictions: { content_code: contentCode = '' } = {},
  } = globalContent || {}

  const isPremium = contentCode === 'premium' || false

  const htmlAmpIs = isPremium ? '' : true

  let link = deleteQueryString(requestUri)
  link = link.replace(/\/homepage[/]?$/, '/')

  const {
    videoSeo,
    promoItems: { basic_html: { content = '' } = {} } = {},
  } = new StoryData({
    data: globalContent,
    arcSite,
    contextPath,
  })
  const contenidoVideo =
    content.includes('id="powa-') || videoSeo[0] ? 1 : false

  const stylePwa = `
    .powa-shot { position: absolute; color: rgb(240, 248, 255); font-family: "HelveticaNeue", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;    z-index: 1;    width: 100%; height: 100%;    top: 0px;    left: 0px;}
    .powa-shot-image { position: absolute; width: 100%; height: 100%; overflow: hidden; background-size: cover;         background-repeat: no-repeat;        background-position: center;        display: flex;         align-items: center;        justify-content: space-around;   }
    .powa-shot-play-btn { position: absolute; bottom: 30px;     left: 30px;    }  
    .powa-play-btn { transform: inherit; }
    .powa-default{ background-color: #000;  height: 345px;  }
    @media only screen and (max-width: 600px) { 
    .powa-default {
      height: 157px;
    }}
    `
  const style =
    isStory && (arcSite === 'elcomercio' || arcSite === 'depor')
      ? 'story'
      : 'style'
  let styleUrl = `${contextPath}/resources/dist/${arcSite}/css/${style}.css`
  if (CURRENT_ENVIRONMENT === 'prod') {
    styleUrl = `https://cdnc.${siteDomain}/dist/${arcSite}/css/${style}.css`
  }
  if (arcSite === 'elcomerciomag' && CURRENT_ENVIRONMENT === 'prod') {
    styleUrl = `https://cdnc.mag.elcomercio.pe/dist/${arcSite}/css/${style}.css`
  }
  if (arcSite === 'peru21g21' && CURRENT_ENVIRONMENT === 'prod') {
    styleUrl = `https://cdnc.g21.peru21.pe/dist/${arcSite}/css/${style}.css`
  }

  const isStyleBasic =
    arcSite === 'elcomercio' && metaValue('id') === 'meta_home' && true
  return (
    <html lang="es">
      <head>
        <TagManager {...siteProperties} />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
        <link
          rel="preconnect dns-prefetch"
          href="//arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com"
        />
        <link rel="preconnect dns-prefetch" href="//s.go-mpulse.net" />
        <link rel="preconnect dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="preconnect dns-prefetch" href="//ajax.googleapis.com" />
        <link rel="preconnect dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect dns-prefetch" href="//www.google-analytics.com" />
        <link rel="preconnect dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="preconnect dns-prefetch" href="//www.facebook.com" />
        <link rel="preconnect dns-prefetch" href="//connect.facebook.net" />
        <link rel="preconnect dns-prefetch" href="//tags.bluekai.com" />
        <link rel="preconnect dns-prefetch" href="//tags.bkrtx.com" />
        <link rel="preconnect dns-prefetch" href="//static.chartbeat.com" />
        <link rel="preconnect dns-prefetch" href="//scomcluster.cxense.com" />
        <link rel="preconnect dns-prefetch" href="//sb.scorecardresearch.com" />
        <link rel="preconnect dns-prefetch" href="//ping.chartbeat.net" />
        <link rel="preconnect dns-prefetch" href="//mab.chartbeat.com" />
        <link rel="preconnect dns-prefetch" href="//cdn.cxense.com" />
        <link
          rel="preconnect dns-prefetch"
          href="//arc-subs-sdk.s3.amazonaws.com"
        />
        <link rel="preconnect dns-prefetch" href="//acdn.adnxs.com" />
        {arcSite === 'elcomercio' && (
          <>
            <link
              rel="preload"
              as="font"
              crossOrigin="crossorigin"
              type="font/woff"
              href="https://cdna.elcomercio.pe/resources/dist/elcomercio/fonts/libre-franklin-v4-latin-500.woff"
            />
            <link
              rel="preload"
              as="font"
              crossOrigin="crossorigin"
              type="font/woff"
              href="https://cdna.elcomercio.pe/resources/dist/elcomercio/fonts/noto-serif-sc-v6-latin-500.woff"
            />
          </>
        )}
        {googleFonts && (
          <link
            href={`https://fonts.googleapis.com/css?family=${googleFonts}&display=swap`}
            rel="stylesheet"
          />
        )}

        <MetaSite {...metaSiteData} isStyleBasic={isStyleBasic} />
        <meta name="description" content={description} />
        {arcSite === 'elcomerciomag' && (
          <meta property="fb:pages" content="530810044019640" />
        )}
        {isStory ? '' : <meta name="keywords" content={keywords} />}
        <TwitterCards {...twitterCardsData} />
        <OpenGraph {...openGraphData} />
        {renderMetaPage(metaValue('id'), metaPageData)}
        <AppNexus
          arcSite={arcSite}
          requestUri={requestUri}
          port={metaValue('port')}
          isStory={isStory}
          globalContent={globalContent}
        />

        <AdsScriptsFloorPrices />
        {contenidoVideo && (
          <>
            <style
              dangerouslySetInnerHTML={{
                __html: stylePwa,
              }}></style>
          </>
        )}
        {/* Scripts de AdManager */}
        {!nodas && !isLivePage && (
          <>
            {arcSite === 'ojo' && requestUri.match('^/ojo-show') && (
              <script
                defer
                src="https://d34fzxxwb5p53o.cloudfront.net/output/assets/js/prebid.js"
              />
            )}
            <script
              defer
              src={deployment(
                `https://d1r08wok4169a5.cloudfront.net/ads/arcads.js`
              )}
            />
            <script
              type="text/javascript"
              defer
              dangerouslySetInnerHTML={{ __html: collapseDivs }}
            />
            <Dfp />
          </>
        )}
        {/* Scripts de AdManager - Fin */}

        {/* Scripts de Chartbeat */}
        <script async src="//static.chartbeat.com/js/chartbeat_mab.js" />

        {/* <FirebaseScripts /> */}

        {(!(metaValue('exclude_libs') === 'true') || isAdmin) && <Libs />}
        {contenidoVideo && (
          <>
            <script
              src={`https://d1tqo5nrys2b20.cloudfront.net/${CURRENT_ENVIRONMENT}/powaBoot.js?org=elcomercio`}
              async></script>
          </>
        )}
        {/* <!-- Identity & Paywall - Inicio --> */}
        {(() => {
          if (arcSite === 'elcomercio' && metaValue('id') === 'meta_home') {
            return null
          }
          if (
            arcSite === 'depor' ||
            arcSite === 'elcomercio' ||
            arcSite === 'peru21' ||
            arcSite === 'gestion' ||
            arcSite === 'peru21g21'
          ) {
            return (
              <script
                src={`https://arc-subs-sdk.s3.amazonaws.com/${CURRENT_ENVIRONMENT}/sdk-identity.min.js?v=07112019`}
                defer
              />
            )
          }
          return null
        })()}
        {(() => {
          if (siteProperties.activePaywall) {
            if (arcSite === 'elcomercio' && metaValue('id') === 'meta_home') {
              return null
            }
            return (
              <script
                src={`https://elcomercio-${arcSite}-${CURRENT_ENVIRONMENT}.cdn.arcpublishing.com/arc/subs/p.js?v=${new Date()
                  .toISOString()
                  .slice(0, 10)}`}
                async
              />
            )
          }
          return null
        })()}
        {/* <!-- Identity & Sales & Paywall - Fin --> */}
      </head>
      <body className={classBody}>
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

        {(!(metaValue('exclude_fusion') === 'true') || isAdmin) && <Fusion />}
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
        <ChartbeatBody story={isStory} {...metaPageData} />
        <script
          async
          dangerouslySetInnerHTML={{ __html: structuredDetectIncognito }}
        />

        <script
          defer
          src={`${getAssetsPath(
            arcSite,
            contextPath
          )}/resources/assets/js/lazyload.js?d=1`}
        />

        {/* Rubicon BlueKai - Inicio */}
        {arcSite === 'elcomercio' && metaValue('id') === 'meta_home' ? (
          <>
            <script
              type="text/javascript"
              defer
              src="https://tags.bluekai.com/site/42540?ret=js&limit=1"
            />
            <script
              type="text/javascript"
              defer
              src="https://tags.bluekai.com/site/56584?ret=js&limit=1"
            />
          </>
        ) : (
          <>
            <script
              type="text/javascript"
              async
              src="https://tags.bluekai.com/site/42540?ret=js&limit=1"
            />
            <script
              type="text/javascript"
              async
              src="https://tags.bluekai.com/site/56584?ret=js&limit=1"
            />
          </>
        )}
        {contenidoVideo && (
          <>
            <script
              type="text/javascript"
              defer
              dangerouslySetInnerHTML={{ __html: scriptVideo }}
            />
          </>
        )}

        <script
          type="text/javascript"
          defer
          dangerouslySetInnerHTML={{ __html: iframeScript() }}
        />
        {/* Rubicon BlueKai - Fin */}
        <script
          dangerouslySetInnerHTML={{
            __html: `"use strict";(function(){setTimeout(function(){var ua=window.navigator.userAgent;var msie=ua.indexOf('MSIE ');var trident=ua.indexOf('Trident/');if(msie>0||trident>0){;[].slice.call(document.getElementsByClassName('grid')).forEach(function(grid){grid.className=grid.className.replace('grid','ie-flex')})}},0)})()`,
          }}
        />

        {isStyleBasic && (
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
      </body>
    </html>
  )
}
