'use strict'

import React from 'react'

export default ({
  children,
  contextPath,
  deployment,
  arcSite,
  CssLinks,
  Fusion,
  Libs,
  MetaTags
}) =>
  <html>
    <head>
      <title>Fusion Article</title>
      <MetaTags />
      <Libs />
      <CssLinks />
      <link rel='icon' type='image/x-icon' href={deployment(`${contextPath}/resources/dist/${arcSite}/favicon.ico`)} />
      <link rel='stylesheet' href={deployment(`${contextPath}/resources/dist/${arcSite}/css/style.css`)} />
    </head>
    <body>
      <div id='fusion-app'>
        {children}
      </div>
      <Fusion />
    </body>
  </html>
