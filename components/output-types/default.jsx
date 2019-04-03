/* eslint-disable strict */

'use strict'

import React from 'react'

import MetaAutor from './_children/MetaAutor'

export default ({
  children,
  contextPath,
  deployment,
  arcSite,
  CssLinks,
  Fusion,
  Libs,
  MetaTags,
  metaValue,
  globalContent
}) => (
  <html lang="es">
    <head>
      <title>{metaValue('title') || 'fallback'}</title>
      <MetaTags />
      <MetaAutor globalContent={globalContent}/>
      <Libs />
      <CssLinks />
      <meta charset="utf-8" />
      <meta httpEquiv="X-UA-C ompatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
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
