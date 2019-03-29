import React from 'react'
import MetaPorSitio from './MetaPorSitio'

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
}) => (
  <html lang="es">
    <head>
      <title>Fusion Article</title>
      <MetaTags />
      <Libs />
      <CssLinks />
      <MetaPorSitio siteproperties={siteProperties.metaSitio} />
      <meta charset="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <link rel="shortcut icon" href="https://sitio.pe/favicon.ico" />
      <link
        rel="apple-touch-icon"
        href="https://sitio.pe/apple-touch-icon.png"
      />
      <link
        rel="canonical"
        href="https://sitio.pe/url-canonical-de-la-pagina"
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
