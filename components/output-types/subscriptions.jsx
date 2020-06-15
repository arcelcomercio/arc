import React from 'react'
import PropTypes from 'prop-types'
// import TagManager from './_children/tag-manager'

const Subscriptions = (props) => {
  const { children, arcSite, siteProperties } = props

  const {
    siteName,
    paywall: { urls, title, description },
    social: { twitter: { user: twitterSite = '' } = {} } = {},
  } = siteProperties

  return (
    <html lang="es">
      <head>
        {/* <TagManager {...siteProperties} /> */}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content=" width=device-width, initial-scale=1, maximum-scale=1"
        />
        <title>{title}</title>
        <meta name="description" content={description} />
        {/* <link rel="canonical" href={urls.canonical} /> */}
        <meta name="theme-color" content="#444444" />
        <meta name="msapplication-TileColor" content="#444444" />
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

        <script
          src="https://arc-subs-sdk.s3.amazonaws.com/prod/sdk-identity.min.js?v=07112019"
          defer
        />
      </head>
      <body>
        {/* <noscript>
          <iframe
            title="Google Tag Manager - No Script"
            src={`https://www.googletagmanager.com/ns.html?id=${siteProperties.googleTagManagerId}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript> */}
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
