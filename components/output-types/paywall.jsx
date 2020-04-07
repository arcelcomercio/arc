import React from 'react'
import PropTypes from 'prop-types'
import * as Meta from './_children/meta'
import TagManager from './_children/tag-manager'
import FbPixel from './_children/fb-pixel'
import { interpolateUrl } from '../features/paywall/_dependencies/domains'

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
    siteName,
    paywall: { urls, title, description },
    social: { twitter: { user: twitterSite = '' } = {} } = {},
  } = siteProperties

  const canonicalUrl = deployment(interpolateUrl(urls.canonical))
  const imageUrl = deployment(interpolateUrl(urls.image))

  return (
    <html lang="es" className={arcSite}>
      <head>
        <TagManager {...siteProperties} />
        <FbPixel {...props} />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <title>{metaValue('title') || title}</title>

        {/* METAS SUGERIDOS */}
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="theme-color" content="#444444" />
        <meta name="msapplication-TileColor" content="#444444" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={twitterSite} />
        <meta name="twitter:title" content="Suscripciones Digitales" />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:description" content={description} />
        <meta property="og:title" content="Suscripciones Digitales" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:type" content="website" />
        {/* METAS SUGERIDOS */}

        <props.Libs />
        <props.CssLinks />
        <Meta.Icon {...props} />
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
        <script
          src="https://arc-subs-sdk.s3.amazonaws.com/prod/sdk-identity.min.js?v=07112019"
          defer
        />
        <script src="https://www.google.com/recaptcha/api.js?hl=es"></script>
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
          <img
            alt=""
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${siteProperties.fbPixelId}&ev=PageView&noscript=1`}
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
