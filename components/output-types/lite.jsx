import React from 'react'
import ENV from 'fusion:environment'

import { deleteQueryString } from '../utilities/parse/queries'
import { addSlashToEnd } from '../utilities/parse/strings'
import { storyTagsBbc } from '../utilities/tags'
import {
  SITE_ELCOMERCIOMAG,
  SITE_PERU21G21,
  SITE_ELCOMERCIO,
  SITE_DEPOR,
} from '../utilities/constants/sitenames'
import { getAssetsPath } from '../utilities/assets'
import StoryData from '../utilities/story-data'

import MetaSite from './_children/meta-site'
import TwitterCards from './_children/twitter-cards'
import OpenGraph from './_children/open-graph'
import TagManager from './_children/tag-manager'
import LiteAds from './_children/lite-ads'
import ChartbeatBody from './_children/chartbeat-body'
import AppNexus from './_children/appnexus'
import VallaHtml from './_children/valla-html'
import MetaStory from './_children/meta-story'

import videoScript from './_dependencies/video-script'
import iframeScript from './_dependencies/iframe-script'
import widgets from './_dependencies/widgets'
import vallaScript from './_dependencies/valla'
import {
  getIsStory,
  getTitle,
  getDescription,
  getKeywords,
} from './_dependencies/utils'

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
  const CURRENT_ENVIRONMENT =
    ENV.ENVIRONMENT === 'elcomercio' ? 'prod' : 'sandbox' // se reutilizó nombre de ambiente

  const {
    headlines: { basic: storyTitle = '', meta_title: StoryMetaTitle = '' } = {},
    promo_items: { basic_gallery: basicGallery = 0 } = {},
    taxonomy: {
      primary_section: { path: nameSeccion = '' } = {},
      tags = [],
    } = {},
    subtype = '',
    website_url: url = '',
    content_restrictions: { content_code: contentCode = '' } = {},
    page_number: pageNumber = 1,
  } = globalContent || {}

  const isStory = getIsStory({ metaValue, requestUri })
  const classBody = isStory
    ? `story ${basicGallery && 'basic_gallery'} ${arcSite} ${
        nameSeccion.split('/')[1]
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

  const isPremium = contentCode === 'premium' || false
  const htmlAmpIs = isPremium ? '' : true
  const link = deleteQueryString(requestUri).replace(/\/homepage[/]?$/, '/')

  const parameters = {
    googleTagManagerId: siteProperties.googleTagManagerId,
    arcSite,
  }

  const {
    videoSeo,
    embedTwitterAndInst = [],
    getPremiumValue,
    promoItems: { basic_html: { content = '' } = {} } = {},
  } = new StoryData({
    data: globalContent,
    arcSite,
    contextPath,
  })
  const contenidoVideo =
    content.includes('id="powa-') || videoSeo[0] ? 1 : false

  let styleUrl = `${contextPath}/resources/dist/${arcSite}/css/lite-story.css`
  if (CURRENT_ENVIRONMENT === 'prod') {
    styleUrl = `https://cdnc.${siteProperties.siteDomain}/dist/${arcSite}/css/lite-story.css`
  }
  if (arcSite === SITE_ELCOMERCIOMAG && CURRENT_ENVIRONMENT === 'prod') {
    styleUrl = `https://cdnc.mag.elcomercio.pe/dist/${arcSite}/css/lite-story.css`
  }
  if (arcSite === SITE_PERU21G21 && CURRENT_ENVIRONMENT === 'prod') {
    styleUrl = `https://cdnc.g21.peru21.pe/dist/${arcSite}/css/lite-story.css`
  }

  let lang = 'es'
  if (arcSite === SITE_DEPOR) {
    if (requestUri.match('^/usa')) lang = 'es-us'
  }

  const parametersValla = {
    arcSite,
    arcEnv: CURRENT_ENVIRONMENT,
    getdata: new Date().toISOString().slice(0, 10),
  }

  const premiumValue = getPremiumValue === 'premium' ? true : getPremiumValue
  const isPremiumFree = premiumValue === 'free' ? 2 : premiumValue
  const isPremiumMete = isPremiumFree === 'metered' ? false : isPremiumFree
  const vallaSignwall = isPremiumMete === 'vacio' ? false : isPremiumMete

  return (
    <html itemScope itemType="http://schema.org/WebPage" lang={lang}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="lang" content={lang} />
        <meta name="resource-type" content="document" />
        <meta content="global" name="distribution" />
        <meta name="robots" content="index, follow" />
        <meta name="GOOGLEBOT" content="index follow" />
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
        {isStory && htmlAmpIs && (
          <link
            rel="amphtml"
            href={`${siteProperties.siteUrl}${addSlashToEnd(
              url
            )}?outputType=amp`}
          />
        )}
        {arcSite === SITE_ELCOMERCIOMAG && (
          <link
            rel="alternate"
            href={`${siteProperties.siteUrlAlternate}${link}`}
            hrefLang="es"
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
        {arcSite === SITE_ELCOMERCIO && (
          <link
            rel="preload"
            href="https://cdna.elcomercio.pe/resources/dist/elcomercio/fonts/georgia-latin-regular.woff2"
            as="font"
            type="font/woff2"
          />
        )}
        <link rel="preconnect" href={`//cdnc.${siteProperties.siteDomain}`} />
        <link rel="dns-prefetch" href={`//cdnc.${siteProperties.siteDomain}`} />
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
        <link rel="preconnect" href="//www.googletagmanager.com/" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com/" />
        <link rel="preconnect" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="preconnect" href="//static.chartbeat.com/" />
        <link rel="dns-prefetch" href="//static.chartbeat.com/" />
        <link rel="preconnect" href="//mab.chartbeat.com/" />
        <link rel="dns-prefetch" href="//mab.chartbeat.com/" />
        <link rel="dns-prefetch" href="//tags.bkrtx.com/" />
        <link rel="dns-prefetch" href="//tags.bluekai.com/" />
        <link rel="preconnect" href="//cdn.cxense.com/" />
        <link rel="dns-prefetch" href="//cdn.cxense.com/" />
        <link rel="preconnect" href="//scdn.cxense.com/" />
        <link rel="dns-prefetch" href="//scdn.cxense.com/" />
        <link rel="preconnect" href="//scomcluster.cxense.com/" />
        <link rel="dns-prefetch" href="//scomcluster.cxense.com/" />
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
              }
            */
            __html: `"undefined"!=typeof window&&(window.requestIdle=window.requestIdleCallback||function(e){const n=Date.now();return setTimeout(function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-n))}})},1)});`,
          }}
        />
        <LiteAds
          requestUri={requestUri}
          tags={tags}
          contentCode={contentCode}
          siteProperties={siteProperties}
        />
        <MetaSite {...metaSiteData} />
        <meta name="description" lang="es" content={description} />
        {arcSite === SITE_ELCOMERCIOMAG && (
          <meta property="fb:pages" content="530810044019640" />
        )}
        {isStory ? '' : <meta name="keywords" lang="es" content={keywords} />}
        <TwitterCards {...twitterCardsData} />
        <OpenGraph {...openGraphData} />
        <MetaStory {...metaPageData} />
        {/* renderMetaPage(metaValue('id'), metaPageData) */}
        <AppNexus
          arcSite={arcSite}
          requestUri={requestUri}
          port={metaValue('port')}
          isStory={isStory}
          globalContent={globalContent}
        />
        <Resource path={`resources/dist/${arcSite}/css/dlite-story.css`}>
          {({ data }) => {
            return data ? (
              <style
                dangerouslySetInnerHTML={{
                  __html: data
                    .replace('@charset "UTF-8";', '')
                    .replace('-----------', ''),
                }}
              />
            ) : null
          }}
        </Resource>

        {/* Scripts de Chartbeat */}
        <script async src="//static.chartbeat.com/js/chartbeat_mab.js" />
        {isPremium && arcSite === SITE_ELCOMERCIO && (
          <>
            <Libs></Libs>
            <script
              src={`https://elcomercio-${arcSite}-${CURRENT_ENVIRONMENT}.cdn.arcpublishing.com/arc/subs/p.js?v=${new Date()
                .toISOString()
                .slice(0, 10)}`}
              async
            />
            <script
              src={`https://arc-subs-sdk.s3.amazonaws.com/${CURRENT_ENVIRONMENT}/sdk-identity.min.js?v=07112019`}
              defer
            />
          </>
        )}
        <TagManager {...parameters} />
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
        {isPremium && <Fusion />}
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
        {embedTwitterAndInst[0] && (
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
              type="text/javascript"
              dangerouslySetInnerHTML={{
                __html: videoScript,
              }}
            />
          </>
        )}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: iframeScript,
          }}
        />
        <script
          defer
          src={`${getAssetsPath(
            arcSite,
            contextPath
          )}/resources/assets/js/lazyload.js?d=1`}
        />
        {isStory && (
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
        {vallaSignwall === false && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: vallaScript(parametersValla),
              }}
            />
            <VallaHtml />
          </>
        )}
      </body>
    </html>
  )
}

LiteOutput.fallback = false

export default LiteOutput
