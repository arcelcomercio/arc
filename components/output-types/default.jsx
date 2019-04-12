import React from 'react'
import MetaSite from './_children/meta-site'
import TwitterCards from './_children/twitter-cards'
import OpenGraph from './_children/open-graph'
import renderMetaPage from './_children/render-meta-page'

export default ({
  children,
  contextPath,
  deployment,
  arcSite,
  globalContent,
  CssLinks,
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
    siteName: siteProperties.siteName,
    siteUrl: siteProperties.siteUrl,
  }
  const metaSiteData = {
    ...siteProperties,
    requestUri,
    arcSite,
    contextPath,
    deployment,
  }
  const twitterCardsData = {
    twitterUser: siteProperties.social.twitter.user,
    title:
      metaValue('title') && !metaValue('title').match(/content/)
        ? `${metaValue('title')} | ${siteProperties.siteName}`
        : siteProperties.siteName,
    siteUrl: siteProperties.siteUrl,
    contextPath,
    arcSite,
    description:
      metaValue('description') && !metaValue('description').match(/content/)
        ? `${metaValue('description')} en ${siteProperties.siteName}`
        : 'Últimas noticias en Perú y el mundo',
    twitterCreator: siteProperties.social.twitter.user,
    article: false, // check data origin - Boolean
    deployment,
  }
  const openGraphData = {
    fbAppId: siteProperties.fbAppId,
    title:
      metaValue('title') && !metaValue('title').match(/content/)
        ? `${metaValue('title')} | ${siteProperties.siteName}`
        : siteProperties.siteName,
    description:
      metaValue('description') && !metaValue('description').match(/content/)
        ? `${metaValue('description')} en ${siteProperties.siteName}`
        : 'Últimas noticias en Perú y el mundo',
    siteUrl: siteProperties.siteUrl,
    contextPath,
    arcSite,
    requestUri,
    siteName: siteProperties.siteName,
    article: false, // check data origin - Boolean
    deployment,
  }
  return (
    <html lang="es">
      <head>
        <Libs />
        <CssLinks />
        <meta charset="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="dns-prefetch" href="//ecoid.pe" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//ajax.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <script async src="//static.chartbeat.com/js/chartbeat_mab.js" />

        {renderMetaPage(metaValue('id'), metaPageData)}
        <MetaSite {...metaSiteData} />
        <TwitterCards {...twitterCardsData} />
        <OpenGraph {...openGraphData} />

        <title>
          {metaValue('title') && !metaValue('title').match(/content/)
            ? `${metaValue('title')} | ${siteProperties.siteName}`
            : siteProperties.siteName}
        </title>
        <meta
          name="description"
          content={
            metaValue('description') &&
            !metaValue('description').match(/content/)
              ? `${metaValue('description')} en ${siteProperties.siteName}`
              : 'Últimas noticias en Perú y el mundo'
          }
        />
        <meta
          name="keywords"
          content={
            metaValue('keywords') && !metaValue('keywords').match(/content/)
              ? metaValue('keywords')
              : 'Noticias, El Comercio, Peru, Mundo, Deportes, Internacional, Tecnologia, Diario, Cultura, Ciencias, Economía, Opinión'
          }
        />
      </head>
      <body>
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
        <div id="fusion-app">{children}</div>
        <script
          async
          src={deployment(
            `${contextPath}/resources/dist/${arcSite}/js/index.js`
          )}
        />
        <Fusion />
      </body>
    </html>
  )
}
