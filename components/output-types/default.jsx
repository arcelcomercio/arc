import React from 'react'
import MetaSite from './_children/meta-site'
import TwitterCards from './_children/twitter-cards'
import OpenGraph from './_children/open-graph'
import MetaArchive from './_children/meta-archive'

import MetaAuthor from './_children/meta-author'

export default ({
  children,
  contextPath,
  deployment,
  arcSite,
  globalContent,
  CssLinks,
  Fusion,
  Libs,
  MetaTags,
  siteProperties,
  requestUri,
  metaValue,
}) => {
  const metaSiteData = {
    siteProperties,
    requestUri,
    arcSite,
    contextPath,
    deployment,
  }
  const metaSearchData = {
    siteUrl: siteProperties.siteUrl,
    globalContent,
    requestUri,
  }
  const metaAuthorData = {
    globalContent,
    requestUri,
    siteName: siteProperties.siteName,
    siteUrl: siteProperties.siteUrl,
  }
  function createMarkup(html) {
    return { __html: html }
  }
  const { googleTagManagerScript } = siteProperties
  return (
    <html lang="es">
      <head>
        <MetaTags />
        <Libs />
        <CssLinks />
        <MetaArchive
          {...dataSearch}
          /** TODO: No sé si es importante pero creo que debería ir debajo del script de chartbeat */
        />
        <MetaAuthor {...metaAuthorData} />
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
        <script async="" src="//static.chartbeat.com/js/chartbeat_mab.js" />
        <MetaSite {...metaSiteData} />
        <TwitterCards
          twitterUser={siteProperties.social.twitter.user}
          siteUrl={siteProperties.siteUrl}
          arcSite={arcSite}
          title={metaValue('title') || siteProperties.siteName}
          description={metaValue('description') || 'Últimas noticias en Perú'}
          twitterCreator={siteProperties.social.twitter.user}
          article // check data origin - Boolean
        />
        <OpenGraph
          fbAppId={siteProperties.fbAppId}
          title={metaValue('title') || siteProperties.siteName}
          description={metaValue('description') || 'Últimas noticias en Perú'}
          siteUrl={siteProperties.siteUrl}
          arcSite={arcSite}
          requestUri={requestUri}
          siteName={siteProperties.siteName}
          article // check data origin - Boolean
        />
        <title>
          {`${metaValue('title')} | ${siteProperties.siteName}` ||
            siteProperties.siteName}
        </title>
        <meta
          name="description"
          content={metaValue('description') || 'Últimas noticias en Perú'}
        />
        <meta
          name="keywords"
          content={
            metaValue('keywords') ||
            'Noticias, El Comercio, Peru, Mundo, Deportes, Internacional, Tecnologia, Diario, Cultura, Ciencias, Economía, Opinión'
          }
        />
        <script
          dangerouslySetInnerHTML={createMarkup(googleTagManagerScript)}
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
