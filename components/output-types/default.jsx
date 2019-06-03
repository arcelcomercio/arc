import React from 'react'
import MetaSite from './_children/meta-site'
import TwitterCards from './_children/twitter-cards'
import OpenGraph from './_children/open-graph'
import TagManager from './_children/tag-manager'
import renderMetaPage from './_children/render-meta-page'
import AppNexus from './_children/appnexus'

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
  const metaPageData = {
    globalContent,
    requestUri,
    contextPath,
    arcSite,
    siteName: siteProperties.siteName,
    siteUrl: siteProperties.siteUrl,
    metaValue,
    deployment,
  }

  const isArticle = requestUri.match(`^(/(.*)/.*-noticia)`)

  const metaSiteData = {
    ...siteProperties,
    requestUri,
    arcSite,
    contextPath,
    deployment,
    isArticle,
  }

  const title =
    metaValue('title') && !metaValue('title').match(/content/)
      ? `${metaValue('title')} | ${siteProperties.siteName}`
      : siteProperties.siteName

  const description =
    metaValue('description') && !metaValue('description').match(/content/)
      ? `${metaValue('description')} en ${siteProperties.siteName}`
      : 'Últimas noticias en Perú y el mundo'

  const keywords =
    metaValue('keywords') && !metaValue('keywords').match(/content/)
      ? metaValue('keywords')
      : 'Noticias, El Comercio, Peru, Mundo, Deportes, Internacional, Tecnologia, Diario, Cultura, Ciencias, Economía, Opinión'

  const twitterCardsData = {
    twitterUser: siteProperties.social.twitter.user,
    title,
    siteUrl: siteProperties.siteUrl,
    contextPath,
    arcSite,
    description,
    twitterCreator: siteProperties.social.twitter.user,
    article: isArticle, // check data origin - Boolean
    deployment,
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
    article: isArticle, // check data origin - Boolean
    deployment,
    globalContent,
  }

  return (
    <html lang="es">
      <head>
        <Libs />
        <AppNexus arcSite={arcSite} port={metaValue('port')} />
        <TagManager {...siteProperties} />
        <meta charset="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <title>{title}</title>
        {/* TODO: Validar con la nueva platilla
         <link rel="dns-prefetch" href="//ecoid.pe" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//ajax.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" /> 
        <link rel="dns-prefetch" href="//www.google-analytics.com" />        
        */}

        <link
          href="https://fonts.googleapis.com/css?family=Exo|Judson|Lato|Noticia+Text|Noto+Serif|Roboto&display=swap"
          rel="stylesheet"
        />
        <script src="https://jab.pe/f/arc/data_js.js" async />
        <MetaSite {...metaSiteData} />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        {isArticle && <meta name="news_keywords" content={keywords} />}
        <TwitterCards {...twitterCardsData} />
        <OpenGraph {...openGraphData} />
        {renderMetaPage(metaValue('id'), metaPageData)}

        {/* Scripts de APPNEXUS */}
        <script src="https://s3.amazonaws.com/assets-manager-dig/prod/output/assets/componentes/ui-flyout/dist/unorm.min.js" />
        <script
          src="https://d34fzxxwb5p53o.cloudfront.net/output/assets/js/prebid.js"
          async
        />
        <script
          type="text/javascript"
          src="//acdn.adnxs.com/ast/ast.js"
          async
        />
        {/* Scripts de APPNEXUS */}
        <script async src="//static.chartbeat.com/js/chartbeat_mab.js" />

        <Libs />
      </head>
      <body className="article">
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
        <div id="fusion-app" role="application">
          {children}
        </div>
        <script
          async
          src={deployment(
            `${contextPath}/resources/dist/elcomercio/js/appnexus.js`
          )}
        />
        <script
          async
          defer
          src={deployment(
            `${contextPath}/resources/dist/${arcSite}/js/index.js`
          )}
        />
        <Fusion />
      </body>
    </html>
  )
}
