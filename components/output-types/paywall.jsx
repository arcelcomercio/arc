import React from 'react'
import PropTypes from 'prop-types'
import * as Meta from './_children/meta'
import TagManager from './_children/tag-manager'
import './paywall.css'

const Paywall = props => {
  const {
    metaValue,
    contextPath,
    children,
    arcSite,
    siteProperties,
    deployment,
  } = props

  const { colorPrimary, siteName, assets } = siteProperties

  return (
    <html lang="es" className={arcSite}>
      <head>
        <TagManager {...siteProperties} />
        <meta charset="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <title>{metaValue('title') || 'Default Title'}</title>

        <props.Libs />
        <props.CssLinks />
        <Meta.Theme {...colorPrimary} {...siteName} />
        <Meta.Icon {...contextPath} assets={assets} />
        <link
          rel="stylesheet"
          href={deployment(
            `${contextPath}/resources/dist/${arcSite}/css/paywall.css`
          )}
        />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,700&display=swap"
          rel="stylesheet"
        />
        <props.MetaTags />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
      </head>
      <body onbeforeunload={() => 'message'}>
        <noscript>
          <iframe
            title="Google Tag Manager - No Script"
            src={`https://www.googletagmanager.com/ns.html?id=${siteProperties.googleTagManagerId}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
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
