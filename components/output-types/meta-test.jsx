'use strict'

import React from 'react'
import CustomMeta from './_children/CustomMeta'

export default ({
  children,
  contextPath,
  deployment,
  CssLinks,
  Fusion,
  Libs,
  MetaTags,
  arcSite,
  siteProperties,
  requestUri
}) =>
  <html>
    <head>
      <title>Fusion Article</title>
      <MetaTags />
      <Libs />
      <CssLinks />
      <link rel='stylesheet' type='text/css' href={deployment(`${contextPath}/resources/dist/${arcSite}/css/style.css`)} />
      <link rel='icon' type='image/x-icon' href={deployment(`${contextPath}/resources/dist/${arcSite}/favicon.ico`)} />
      {/* <CustomMeta 
        properties={siteProperties}
        uri={requestUri}
      /> */}
    </head>
    <body>
      <div id='fusion-app'>
        {children}
      </div>
      <script src={deployment(`${contextPath}/resources/dist/${arcSite}/js/index.js`)}></script>
      <Fusion />
    </body>
  </html>
