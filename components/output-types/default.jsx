import React from 'react'
import ENV from 'fusion:environment'
import MetaSite from './_children/meta-site'
import TwitterCards from './_children/twitter-cards'
import OpenGraph from './_children/open-graph'
import TagManager from './_children/tag-manager'
import renderMetaPage from './_children/render-meta-page'
import AppNexus from './_children/appnexus'
import ChartbeatBody from './_children/chartbeat-body'
import { skipAdvertising, storyTagsBbc } from '../utilities/helpers'

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

  const metaPageData = {
    globalContent,
    requestUri,
    contextPath,
    arcSite,
    siteName: siteProperties.siteName,
    siteUrl: siteProperties.siteUrl,
    socialName: siteProperties.social.facebook,
    siteAssets: siteProperties.assets,
    metaValue,
    deployment,
  }

  const {
    headlines: { basic: storyTitle = '', meta_title: StoryMetaTitle = '' } = {},
    taxonomy: {
      primary_section: { path: nameSeccion = '' } = {},
      tags = [],
    } = {},
    subtype = '',
  } = globalContent || {}

  const isStory =
    requestUri.match(`^(/(.*)/.*-noticia)`) ||
    requestUri.match(`^/preview/([A-Z0-9]{26})/?`)
  const isBlogPost = requestUri.match(`^(/blogs?/.*.html)`)

  let classBody = isStory ? `story ${nameSeccion.split('/')[1]} ${subtype}` : ''
  classBody = isBlogPost ? 'blogPost' : classBody

  const metaSiteData = {
    ...siteProperties,
    requestUri,
    arcSite,
    contextPath,
    deployment,
    isStory,
    isAmp: false,
  }

  const storyTitleRe = StoryMetaTitle || storyTitle

  const seoTitle =
    metaValue('title') &&
    !metaValue('title').match(/content/) &&
    metaValue('title')

  const title = isStory
    ? `${storyTitleRe} ${seoTitle} | ${siteProperties.siteName}`
    : `${seoTitle} | ${siteProperties.siteName}`

  const description =
    metaValue('description') && !metaValue('description').match(/content/)
      ? `${metaValue('description')}`
      : 'Últimas noticias en Perú y el mundo'

  const keywords =
    metaValue('keywords') && !metaValue('keywords').match(/content/)
      ? metaValue('keywords')
      : `Noticias, ${
          siteProperties.siteName
        }, Peru, Mundo, Deportes, Internacional, Tecnologia, Diario, Cultura, Ciencias, Economía, Opinión`

  const twitterCardsData = {
    twitterUser: siteProperties.social.twitter.user,
    title,
    siteUrl: siteProperties.siteUrl,
    contextPath,
    arcSite,
    description,
    twitterCreator: siteProperties.social.twitter.user,
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

  const structuredFacebook = `
    (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id))
        return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v2.4&appId=1626271884277579";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));`

  const { googleFonts = '' } = siteProperties || {}
  const nodas = skipAdvertising(tags)

  const structuredBBC = `
  !function(s,e,n,c,r){if(r=s._ns_bbcws=s._ns_bbcws||r,s[r]||(s[r+"_d"]=s[r+"_d"]||[],s[r]=function(){s[r+"_d"].push(arguments)},s[r].sources=[]),c&&0>s[r].sources.indexOf(c)){var t=e.createElement(n);t.async=1,t.src=c;var a=e.getElementsByTagName(n)[0];a.parentNode.insertBefore(t,a),s[r].sources.push(c)}}
  (window,document,"script","https://news.files.bbci.co.uk/ws/partner-analytics/js/pageTracker.min.js","s_bbcws");
  s_bbcws('partner', 'elcomercio.pe');
          s_bbcws('language', 'mundo');
  s_bbcws('track', 'pageView');`

  return (
    <html lang="es">
      <head>
        <TagManager {...siteProperties} />
        <title>{title}</title>
        <link rel="dns-prefetch" href="//ecoid.pe" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//ajax.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link
          href={`https://fonts.googleapis.com/css?family=${googleFonts}&display=swap`}
          rel="stylesheet"
        />
        {renderMetaPage(metaValue('id'), metaPageData)}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <MetaSite {...metaSiteData} />
        <meta name="description" content={description} />
        {isStory ? '' : <meta name="keywords" content={keywords} />}
        <TwitterCards {...twitterCardsData} />
        <OpenGraph {...openGraphData} />

        <AppNexus
          arcSite={arcSite}
          requestUri={requestUri}
          port={metaValue('port')}
          isStory={isStory}
          globalContent={globalContent}
        />
        {!nodas && <script defer src={`${BASE_URL_ADS}/data_${arcSite}.js`} />}

        {/* Scripts de APPNEXUS */}
        <script
          src="https://d34fzxxwb5p53o.cloudfront.net/prod/output/assets/componentes/ui-flyout/dist/unorm.min.js?v2"
          async
        />
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

        {/* <!-- Identity & Sales & Paywall --> */}
        {siteProperties.activeSignwall && (
          <script
            src={`https://arc-subs-sdk.s3.amazonaws.com/${CURRENT_ENVIRONMENT}/sdk-identity.min.js`}
          />
        )}
        {siteProperties.activePaywall && (
          <>
            <script
              src={`https://elcomercio-${arcSite}-${CURRENT_ENVIRONMENT}.cdn.arcpublishing.com/arc/subs/p.js?v=${new Date()
                .toISOString()
                .slice(0, 10)}`}
            />
            <script
              src={`https://arc-subs-sdk.s3.amazonaws.com/${CURRENT_ENVIRONMENT}/sdk-sales.min.js`}
            />
          </>
        )}
      </head>
      <body className={classBody}>
        <noscript>
          <iframe
            title="Google Tag Manager - No Script"
            src={`https://www.googletagmanager.com/ns.html?id=${
              siteProperties.googleTagManagerId
            }`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {isStory && ( // TODO: pediente por definir comentarios por cada sitio
          <>
            <div id="fb-root" />
            <script dangerouslySetInnerHTML={{ __html: structuredFacebook }} />
          </>
        )}
        <div id="fusion-app" role="application">
          {children}
        </div>
        {!nodas && (
          <script
            defer
            src={deployment(
              `${contextPath}/resources/dist/${arcSite}/js/appnexus.js`
            )}
          />
        )}
        <script
          defer
          src={deployment(
            `${contextPath}/resources/dist/${arcSite}/js/index.js`
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
      </body>
    </html>
  )
}
