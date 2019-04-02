/* eslint-disable strict */

'use strict'

import React from 'react'
import MetaSearch from './_children/meta-search'

export default ({
  children,
  contextPath,
  deployment,
  arcSite,
  globalContent,
  globalContentConfig,
  CssLinks,
  Fusion,
  Libs,
  MetaTags,
  siteProperties,
}) => (
  <html lang="es">
    <head>
      <MetaTags />
      <Libs />
      <CssLinks />
      <MetaSearch
        siteName={siteProperties.siteName}
        globalContent={globalContent}
        config={globalContentConfig}
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
