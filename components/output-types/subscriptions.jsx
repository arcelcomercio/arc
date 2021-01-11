import React from 'react'
import ENV from 'fusion:environment'
import PropTypes from 'prop-types'
import TagManager from './_children/tag-manager'
import FbPixel from './_children/fb-pixel'

const Subscriptions = props => {
  const { children, arcSite, siteProperties, deployment, contextPath } = props

  const {
    siteName,
    colorPrimary,
    paywall: { urls, title, description },
    social: { twitter: { user: twitterSite = '' } = {} } = {},
  } = siteProperties

  const arcEnv = ENV.ENVIRONMENT === 'elcomercio' ? 'prod' : 'sandbox'

  return (
    <html lang="es">
      <head>
        <TagManager {...siteProperties} />
        <FbPixel {...props} />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content=" width=device-width, initial-scale=1, maximum-scale=1"
        />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={urls.canonical} />
        <meta name="theme-color" content={colorPrimary} />
        <meta name="msapplication-TileColor" content={colorPrimary} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={twitterSite} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:image" content={urls.image} />
        <meta name="twitter:description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={urls.image} />
        <meta property="og:url" content={urls.canonical} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:type" content="website" />
        <link
          rel="shortcut icon"
          type="image/png"
          href={`https://${arcSite}.pe/pf/resources/dist/${arcSite}/images/favicon.png?d=1038`}
        />

        <props.Libs />

        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link
          rel="preconnect dns-prefetch"
          href="//arc-subs-sdk.s3.amazonaws.com"
        />
        <link
          rel="stylesheet"
          href={deployment(
            `${contextPath}/resources/dist/${arcSite}/css/subscriptions.css`
          )}
        />
        <script
          src={`https://arc-subs-sdk.s3.amazonaws.com/${arcEnv}/sdk-identity.min.js`}
          defer
        />
      </head>
      <body>
        <noscript>
          <iframe
            title="Google Tag Manager - No Script"
            src={`https://www.googletagmanager.com/ns.html?id=${siteProperties.googleTagManagerId}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <div id="fusion-app" role="application">
          {children}
        </div>
        <props.Fusion />
      </body>
    </html>
  )
}

Subscriptions.fallback = false

Subscriptions.propTypes = {
  children: PropTypes.node,
}

export default Subscriptions
