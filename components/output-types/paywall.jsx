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

  const {
    theme: { color },
    siteName,
    assets,
    paywall: { title, description, canonical, image },
  } = siteProperties

  const fullAssets = assets.fullAssets.call(assets, contextPath, deployment)

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
        <title>{metaValue('title') || title}</title>

        {/* METAS SUGERIDOS */}
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta name="theme-color" content="#444444" />
        <meta name="msapplication-TileColor" content="#444444" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@Gestionpe" />
        <meta name="twitter:title" content="Suscripciones Digitales" />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:description" content={description} />
        <meta property="og:title" content="Suscripciones Digitales" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={canonical} />
        <meta property="og:site_name" content="Gestión" />
        <meta property="og:type" content="website" />
        {/* METAS SUGERIDOS */}

        <props.Libs />
        <props.CssLinks />
        <Meta.Theme color={color} {...siteName} />
        <Meta.Icon assets={fullAssets} />
        <link
          rel="stylesheet"
          href={deployment(
            `${contextPath}/resources/dist/${arcSite}/css/paywall.css`
          )}
        />
        <props.MetaTags />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,700&display=swap"
          rel="stylesheet"
        />
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
