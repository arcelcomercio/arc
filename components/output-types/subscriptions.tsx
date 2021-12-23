import PropTypes from 'prop-types'
import * as React from 'react'
import { OT, OutputProps } from 'types/output-types'

import PianoAdblock from '../piano/adblock'
import PianoCore from '../piano/core'
import PianoData from '../piano/data'
import { env } from '../utilities/arc/env'
import { ORGANIZATION, PROD } from '../utilities/constants/environment'
import { SITE_ELCOMERCIO } from '../utilities/constants/sitenames'
import FbPixel from './_children/fb-pixel'
import FinallyPolyfill from './_children/finallyPolyfill'
import TagManager from './_children/tag-manager'
import listenCounterMag from './_dependencies/counter-mag'
import { getMetaValue } from './_dependencies/utils'

enum Stylesheets {
  Signwall = 'subs-signwall',
  Landing = 'subs-landing',
  Piano = 'subs-piano',
  Payment = 'subs-payment',
}

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
    siteUrl,
    siteTitle,
    siteDescription,
    colorPrimary,
    googleTagManagerId,
    googleTagManagerIdSandbox,
    fbPixelId,
    activePiano,
    pianoID,
    paywall: {
      urls: { canonical, image } = {},
      title: defaultTitle = siteTitle,
      description: defaultDescription = siteDescription,
    } = {},
    social: { twitter: { user: twitterSite = '' } = {} } = {},
  } = siteProperties

  const GTMContainer =
    env === PROD ? googleTagManagerId : googleTagManagerIdSandbox

  const isExternalCounter = /\/paywall-counter-external\//.test(requestUri)
  const isEmpresaPage = /^\/[a-z-]+\/empresa\//.test(requestUri)
  const isFaqsPage = /^\/[a-z-]+\/faqs\//.test(requestUri)
  const isSubscriptionPage = /^\/suscripciones\//.test(requestUri)
  const isSignwallPage = /^\/signwall\/|\/mi-perfil\//.test(requestUri)
  const isPianoPage = /^\/(mi-cuenta|registro|registrar|ingreso|restaurar|verificacion|nueva-contrasena)\//.test(
    requestUri
  )

  const title = getMetaValue('title') || defaultTitle
  const description = getMetaValue('description') || defaultDescription
  const canonicalUrl = canonical || siteUrl + requestUri

  let stylesheet: Stylesheets
  if (isSignwallPage) {
    stylesheet = Stylesheets.Signwall
  } else if (isEmpresaPage || isFaqsPage || isSubscriptionPage) {
    stylesheet = Stylesheets.Landing
  } else if (isPianoPage) {
    stylesheet = Stylesheets.Piano
  } else {
    stylesheet = Stylesheets.Payment
  }

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
            <PianoAdblock disabled={!activePiano} />
            <FbPixel fbPixelId={fbPixelId} />
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta
              name="viewport"
              content=" width=device-width, initial-scale=1, maximum-scale=1"
            />
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonicalUrl} />
            <meta name="theme-color" content={colorPrimary} />
            <meta name="msapplication-TileColor" content={colorPrimary} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content={twitterSite} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:image" content={image} />
            <meta name="twitter:description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:type" content="website" />
            <link
              rel="shortcut icon"
              type="image/png"
              href={`https://${arcSite}.pe/pf/resources/dist/${arcSite}/images/favicon.png?d=1038`}
            />

            {isSubscriptionPage && arcSite === SITE_ELCOMERCIO ? (
              <link rel="preconnect" href="https://pub.minoticia.pe" />
            ) : null}
            <link rel="preconnect" href="https://s.go-mpulse.net" />
            <link rel="preconnect" href="https://www.facebook.com" />
            <link rel="dns-prefetch" href="//fonts.gstatic.com" />
            <link rel="dns-prefetch" href="//fonts.googleapis.com" />
            <link rel="dns-prefetch" href="//www.google-analytics.com" />
            <link
              rel="preconnect dns-prefetch"
              href="//arc-subs-sdk.s3.amazonaws.com"
            />
            <Libs />

            {arcSite === 'trome' && (
              <link
                href="https://fonts.googleapis.com/css2?family=Encode+Sans+Condensed:wght@300;700&display=swap"
                rel="stylesheet"
              />
            )}

            <link
              rel="stylesheet"
              href={deployment(
                `${contextPath}/resources/dist/${arcSite}/css/${stylesheet}.css`
              )}
            />
            {isEmpresaPage && (
              <script
                src="https://www.google.com/recaptcha/api.js?hl=es"
                defer
              />
            )}
            {/* ============== WebTracking */}
            {requestUri.includes('/suscripcionesdigitales/') ? (
              <>
                <script
                  defer
                  src={deployment(
                    `${contextPath}/resources/assets/js/emblue-sdk-worker.js`
                  )}
                />
                <script
                  src={`https://cdn.embluemail.com/pixeltracking/pixeltracking.js?code=${
                    arcSite === SITE_ELCOMERCIO
                      ? '01780ae129e2be9f4afea429d618f3ec'
                      : 'ddc9f70a72959e3037f40dd5359a99d6'
                  }`}
                  async
                />
              </>
            ) : null}
            <PianoData disabled={!activePiano} />
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
            <PianoCore aid={pianoID?.[env]} disabled={!activePiano} />
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
