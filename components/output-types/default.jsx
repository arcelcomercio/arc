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
import {
  skipAdvertising,
  storyTagsBbc,
  addSlashToEnd,
  deleteQueryString,
} from '../utilities/helpers'
// import ConfigParams from '../utilities/config-params'
import { getAssetsPath } from '../utilities/constants'

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
}) => {
  const CURRENT_ENVIRONMENT =
    ENV.ENVIRONMENT === 'elcomercio' ? 'prod' : 'sandbox' // se reutilizó nombre de ambiente
  const BASE_URL_ADS =
    CURRENT_ENVIRONMENT === 'prod'
      ? `https://d1r08wok4169a5.cloudfront.net/ads-${arcSite}`
      : 'https://jab.pe/f/arc'

  const BASE_URL_ADS_ESPACIOS =
    CURRENT_ENVIRONMENT === 'prod'
      ? `https://d2dvq461rdwooi.cloudfront.net/ads-${arcSite}`
      : `https://d37z8six7qdyn4.cloudfront.net/ads-${arcSite}`

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

  const { googleFonts = '' } = siteProperties || {}
  const nodas = skipAdvertising(tags)

  const isLivePage = arcSite === 'elcomercio' && requestUri.match(`^/en-vivo/`)

  const structuredBBC = `
  !function(s,e,n,c,r){if(r=s._ns_bbcws=s._ns_bbcws||r,s[r]||(s[r+"_d"]=s[r+"_d"]||[],s[r]=function(){s[r+"_d"].push(arguments)},s[r].sources=[]),c&&0>s[r].sources.indexOf(c)){var t=e.createElement(n);t.async=1,t.src=c;var a=e.getElementsByTagName(n)[0];a.parentNode.insertBefore(t,a),s[r].sources.push(c)}}
  (window,document,"script","https://news.files.bbci.co.uk/ws/partner-analytics/js/pageTracker.min.js","s_bbcws");
  s_bbcws('partner', 'elcomercio.pe');
          s_bbcws('language', 'mundo');
  s_bbcws('track', 'pageView');`

  const {
    website_url: url = '',
    content_restrictions: { content_code: contentCode = '' } = {},
  } = globalContent || {}

  const isPremium = contentCode === 'premium' || false

  const htmlAmpIs = isPremium ? '' : true

  let link = deleteQueryString(requestUri)
  link = link.replace(/\/homepage[/]?$/, '/')

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
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//ajax.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com/" />
        <link rel="dns-prefetch" href="//www.facebook.com/" />
        <link rel="dns-prefetch" href="//connect.facebook.net/" />
        <link rel="dns-prefetch" href="//tags.bluekai.com/" />
        <link rel="dns-prefetch" href="//tags.bkrtx.com/" />
        <link rel="dns-prefetch" href="//static.chartbeat.com/" />
        <link rel="dns-prefetch" href="//scomcluster.cxense.com/" />
        <link rel="dns-prefetch" href="//sb.scorecardresearch.com/" />
        <link rel="dns-prefetch" href="//ping.chartbeat.net/" />
        <link rel="dns-prefetch" href="//mab.chartbeat.com/" />
        <link rel="dns-prefetch" href="//cdn.cxense.com/" />
        <link rel="dns-prefetch" href="//arc-subs-sdk.s3.amazonaws.com/" />
        <link rel="dns-prefetch" href="//acdn.adnxs.com/" />
        {googleFonts && (
          <link
            href={`https://fonts.googleapis.com/css?family=${googleFonts}&display=swap`}
            rel="stylesheet"
          />
        )}

        <MetaSite {...metaSiteData} />
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

        {(arcSite === 'publimetro' ||
          arcSite === 'depor' ||
          arcSite === 'elcomercio' ||
          arcSite === 'elcomerciomag' ||
          arcSite === 'peru21' ||
          arcSite === 'gestion' ||
          arcSite === 'peru21g21' ||
          arcSite === 'diariocorreo' ||
          arcSite === 'ojo' ||
          arcSite === 'elbocon' ||
          arcSite === 'trome') &&
          !nodas &&
          !isLivePage && (
            <script
              defer
              src={deployment(
                `${getAssetsPath(
                  arcSite,
                  contextPath
                )}/resources/assets/js/arcads.js`
              )}
            />
          )}

        {!(
          arcSite === 'publimetro' ||
          arcSite === 'depor' ||
          arcSite === 'elcomercio' ||
          arcSite === 'elcomerciomag' ||
          arcSite === 'peru21' ||
          arcSite === 'gestion' ||
          arcSite === 'peru21g21' ||
          arcSite === 'diariocorreo' ||
          arcSite === 'ojo' ||
          arcSite === 'elbocon' ||
          arcSite === 'trome'
        ) && (
          <>
            {!nodas && !isLivePage && (
              <script
                defer
                src={`${BASE_URL_ADS_ESPACIOS}/spaces_${arcSite}.js`}
              />
            )}
            {!nodas && !isLivePage && (
              <script defer src={`${BASE_URL_ADS}/data_${arcSite}.js`} />
            )}

            {/* Scripts de APPNEXUS */}

            {!nodas && (
              <>
                <script
                  src="https://d34fzxxwb5p53o.cloudfront.net/output/assets/js/prebid.js"
                  async
                />
                <script
                  type="text/javascript"
                  src="//acdn.adnxs.com/ast/ast.js"
                  async
                />
              </>
            )}
          </>
        )}
        {/* Scripts de Chartbeat */}
        <script async src="//static.chartbeat.com/js/chartbeat_mab.js" />

        {/* Rubicon BlueKai - Inicio */}
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
        {/* <!-- Rubicon BlueKai - Fin --> */}

        <Libs />

        {/* <!-- Identity & Paywall - Inicio --> */}
        {siteProperties.activeSignwall && (
          <script
            src={`https://arc-subs-sdk.s3.amazonaws.com/${CURRENT_ENVIRONMENT}/sdk-identity.min.js?v=07112019`}
            defer
          />
        )}
        {siteProperties.activePaywall && (
          <script
            src={`https://elcomercio-${arcSite}-${CURRENT_ENVIRONMENT}.cdn.arcpublishing.com/arc/subs/p.js?v=${new Date()
              .toISOString()
              .slice(0, 10)}`}
            async
          />
        )}
        {/* <!-- Identity & Sales & Paywall - Fin --> */}
        {(arcSite === 'publimetro' ||
          arcSite === 'depor' ||
          arcSite === 'elcomercio' ||
          arcSite === 'elcomerciomag' ||
          arcSite === 'peru21' ||
          arcSite === 'gestion' ||
          arcSite === 'peru21g21' ||
          arcSite === 'diariocorreo' ||
          arcSite === 'ojo' ||
          arcSite === 'elbocon' ||
          arcSite === 'trome') &&
          !nodas &&
          !isLivePage && (
            <script
              type="text/javascript"
              defer
              dangerouslySetInnerHTML={{ __html: collapseDivs }}
            />
          )}
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
        {!(
          arcSite === 'publimetro' ||
          arcSite === 'depor' ||
          arcSite === 'elcomercio' ||
          arcSite === 'elcomerciomag' ||
          arcSite === 'peru21' ||
          arcSite === 'gestion' ||
          arcSite === 'peru21g21' ||
          arcSite === 'diariocorreo' ||
          arcSite === 'ojo' ||
          arcSite === 'elbocon' ||
          arcSite === 'trome'
        ) &&
          !nodas && (
            <script
              defer
              src={deployment(
                `${getAssetsPath(
                  arcSite,
                  contextPath
                )}/resources/assets/js/appnexus-min.js`
              )}
            />
          )}
        <script
          defer
          src={deployment(
            `${getAssetsPath(
              arcSite,
              contextPath
            )}/resources/dist/${arcSite}/js/index.js`
          )}
        />
        <Fusion />
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
          src={deployment(
            `${getAssetsPath(
              arcSite,
              contextPath
            )}/resources/assets/js/lazyload.js`
          )}
        />
        {(arcSite === 'publimetro' ||
          arcSite === 'depor' ||
          arcSite === 'elcomercio' ||
          arcSite === 'elcomerciomag' ||
          arcSite === 'peru21' ||
          arcSite === 'gestion' ||
          arcSite === 'peru21g21' ||
          arcSite === 'diariocorreo' ||
          arcSite === 'ojo' ||
          arcSite === 'elbocon' ||
          arcSite === 'trome') &&
          !nodas &&
          !isLivePage && <Dfp />}
      </body>
    </html>
  )
}
