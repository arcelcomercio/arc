import PropTypes from 'prop-types'
import * as React from 'react'
import { OT, OutputProps } from 'types/output-types'

import { env } from '../utilities/arc/env'
import { ORGANIZATION, PROD } from '../utilities/constants/environment'
import FbPixel from './_children/fb-pixel'
import FinallyPolyfill from './_children/finallyPolyfill'
import TagManager from './_children/tag-manager'
import listenCounterMag from './_dependencies/counter-mag'
import { getMetaValue } from './_dependencies/utils'

const Subscriptions: OT<OutputProps> = ({
  children,
  arcSite,
  siteProperties,
  deployment,
  contextPath,
  requestUri,
  Libs,
  Fusion,
}) => {
  const {
    siteName,
    colorPrimary,
    googleTagManagerId,
    googleTagManagerIdSandbox,
    fbPixelId,
    paywall: { urls, title: defaultTitle, description: defaultDescription },
    social: { twitter: { user: twitterSite = '' } = {} } = {},
  } = siteProperties

  const GTMContainer =
    env === PROD ? googleTagManagerId : googleTagManagerIdSandbox

  const isExternalCounter = /\/paywall-counter-external\//.test(requestUri)
  const isEmpresaPage = /^\/([\w-]+)\/(empresa)\//.test(requestUri)
  const isFaqsPage = /^\/([\w-]+)\/(faqs)\//.test(requestUri)
  const isSubscriptionPage = /^\/suscripciones\//.test(requestUri)

  const title = getMetaValue('title') || defaultTitle
  const description = getMetaValue('description') || defaultDescription
  const stylesheet =
    isEmpresaPage || isFaqsPage || isSubscriptionPage
      ? 'subs-landing'
      : 'subs-payment'

  return (
    <>
      {isExternalCounter ? (
        <html lang="es">
          <head>
            <title>Contador Externo Paywall</title>
            <script
              src={`https://${ORGANIZATION}-${arcSite}-${env}.cdn.arcpublishing.com/arc/subs/p.min.js?v=${new Date()
                .toISOString()
                .slice(0, 10)}`}
              async
            />
            <script
              src={`https://arc-subs-sdk.s3.amazonaws.com/${env}/sdk-identity.min.js`}
              defer
            />
          </head>
          <body>
            <script
              type="text/javascript"
              dangerouslySetInnerHTML={{
                __html: listenCounterMag(env, arcSite),
              }}
            />
          </body>
        </html>
      ) : (
        <html lang="es">
          <head>
            <TagManager googleTagManagerId={GTMContainer} />
            <FbPixel fbPixelId={fbPixelId} />
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

            <Libs />

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
                `${contextPath}/resources/dist/${arcSite}/css/${stylesheet}.css`
              )}
            />
            <script
              src={`https://arc-subs-sdk.s3.amazonaws.com/${env}/sdk-identity.min.js`}
              defer
            />
            {isEmpresaPage && (
              <script
                src="https://www.google.com/recaptcha/api.js?hl=es"
                defer
              />
            )}
            <FinallyPolyfill />
          </head>
          <body>
            <noscript>
              <iframe
                title="Google Tag Manager - No Script"
                src={`https://www.googletagmanager.com/ns.html?id=${GTMContainer}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
              />
            </noscript>
            <div id="fusion-app" role="application">
              {children}
            </div>
            <Fusion hydrateOnly />
          </body>
        </html>
      )}
    </>
  )
}

Subscriptions.fallback = false

Subscriptions.propTypes = {
  children: PropTypes.node,
}

export default Subscriptions
