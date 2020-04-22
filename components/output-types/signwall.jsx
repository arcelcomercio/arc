import React from 'react'
import ENV from 'fusion:environment'
import PropTypes from 'prop-types'
import TagManager from './_children/tag-manager'
import FbPixel from './_children/fb-pixel'
import { getAssetsPath } from '../utilities/constants'

const Signwall = props => {
  const { children, contextPath, siteProperties, deployment, arcSite } = props

  const { siteName, siteDescription } = siteProperties

  const C_ENVIRONMENT = ENV.ENVIRONMENT === 'elcomercio' ? 'prod' : 'sandbox'

  return (
    <html lang="es">
      <head>
        <TagManager {...siteProperties} />
        <FbPixel {...props} />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <title>Signwall {siteName}</title>
        <meta name="description" content={siteDescription} />
        <meta name="theme-color" content="#444444" />
        <meta name="msapplication-TileColor" content="#444444" />
        <meta name="robots" content="noindex,follow" />
        <link
          rel="shortcut icon"
          type="image/png"
          href={deployment(
            `${getAssetsPath(
              arcSite,
              contextPath
            )}/resources/dist/${arcSite}/images/favicon.png`
          )}
        />
        <props.Libs />
        <link
          rel="stylesheet"
          href={deployment(
            `${contextPath}/resources/dist/${arcSite}/css/signwall.css`
          )}
        />

        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />

        {siteProperties.activeSignwall && (
          <script
            src={`https://arc-subs-sdk.s3.amazonaws.com/${C_ENVIRONMENT}/sdk-identity.min.js?v=07112019`}
            defer
          />
        )}
        {siteProperties.activePaywall && (
          <>
            <script
              src={`https://arc-subs-sdk.s3.amazonaws.com/${C_ENVIRONMENT}/sdk-sales.min.js?v=07112019`}
              defer
            />
          </>
        )}
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
          <img
            alt=""
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${siteProperties.fbPixelId}&ev=PageView&noscript=1`}
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

// Signwall.fallback = false

Signwall.propTypes = {
  children: PropTypes.node,
}

export default Signwall
