import React from 'react'
import PropTypes from 'prop-types'
import MetaSite from './_children/meta-site'

const Paywall = props => {
  const {
    metaValue,
    deployment,
    contextPath,
    children,
    arcSite,
    siteProperties,
    requestUri,
  } = props
  const metaSiteData = {
    ...siteProperties,
    requestUri,
    arcSite,
    contextPath,
    deployment,
    isAmp: false,
  }

  return (
    <html lang="es" className={arcSite}>
      <head>
        <meta charset="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <title>{metaValue('title') || 'Default Title'}</title>
        <props.MetaTags />
        <props.Libs />
        <props.CssLinks />
        <link
          rel="icon"
          type="image/x-icon"
          href={deployment(`${contextPath}/resources/img/favicon.ico`)}
        />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <MetaSite {...metaSiteData} />
      </head>
      <body>
        <div id="fusion-app" role="application" className="layout-paywall">
          {children}
        </div>
        <props.Fusion />
      </body>
    </html>
  )
}

Paywall.fallback = false

Paywall.propTypes = {
  children: PropTypes.node,
}

export default Paywall
