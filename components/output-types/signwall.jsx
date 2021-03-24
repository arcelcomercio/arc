import * as React from 'react'
import PropTypes from 'prop-types'

import { env } from '../utilities/arc/env'
import { getAssetsPath } from '../utilities/constants'

import TagManager from './_children/tag-manager'
import FbPixel from './_children/fb-pixel'
import FinallyPolyfill from './_children/finallyPolyfill'

const Signwall = ({
  Libs,
  Fusion,
  children,
  contextPath,
  siteProperties,
  deployment,
  arcSite,
}) => {
  const {
    activePaywall,
    activeSignwall,
    fbPixelId,
    googleTagManagerId,
    siteName,
    siteDescription,
  } = siteProperties

  return (
    <html lang="es">
      <head>
        <TagManager googleTagManagerId={googleTagManagerId} />
        <FbPixel fbPixelId={fbPixelId} />
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
        <Libs />
        <link
          rel="stylesheet"
          href={deployment(
            `${contextPath}/resources/dist/${arcSite}/css/signwall.css`
          )}
        />

        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />

        {activeSignwall && (
          <script
            src={`https://arc-subs-sdk.s3.amazonaws.com/${env}/sdk-identity.min.js?v=07112019`}
            defer
          />
        )}
        {activePaywall && (
          <script
            src={`https://arc-subs-sdk.s3.amazonaws.com/${env}/sdk-sales.min.js?v=07112019`}
            defer
          />
        )}
        <FinallyPolyfill />
      </head>
      <body>
        <noscript>
          <iframe
            title="Google Tag Manager - No Script"
            src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
          <img
            alt=""
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${fbPixelId}&ev=PageView&noscript=1`}
          />
        </noscript>

        <div id="fusion-app" role="application">
          {children}
        </div>

        <Fusion hydrateOnly />
      </body>
    </html>
  )
}

Signwall.fallback = false

Signwall.propTypes = {
  children: PropTypes.node,
}

export default Signwall
