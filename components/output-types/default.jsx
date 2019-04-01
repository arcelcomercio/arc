import React from 'react'
import MetaPorSitio from './_children/MetaPorSitio'

export default ({
  children,
  contextPath,
  deployment,
  arcSite,
  CssLinks,
  Fusion,
  Libs,
  MetaTags,
  siteProperties,
  requestUri,
}) => (
  <html lang="es">
    <head>
      <MetaTags />
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
      <script async="" src="//static.chartbeat.com/js/chartbeat_mab.js" />

      <MetaPorSitio siteproperties={siteProperties} requestUri={requestUri} />

      <link
        rel="canonical"
        href={`https://${siteProperties.siteUrl}/url-canonical-de-la-pagina`}
      />
      <link
        rel="icon"
        type="image/x-icon"
        href={deployment(
          `${contextPath}/resources/dist/${arcSite}/favicon.ico`
        )}
      />
      <link
        rel="stylesheet"
        href={deployment(
          `${contextPath}/resources/dist/${arcSite}/css/style.css`
        )}
      />
      <title>Fusion Article</title>
    </head>
    <body>
      <div id="fusion-app">{children}</div>
      <script
        src={deployment(`${contextPath}/resources/dist/${arcSite}/js/index.js`)}
      />
      <Fusion />
    </body>
  </html>
)
