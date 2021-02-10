import * as React from 'react'

import { OutputComponent, OutputProps } from '../../types/output-types'
import { SITE_ELBOCON } from '../utilities/constants/sitenames'
import RegisterServiceWorker from './_children/register-service-worker'
import WebVitals from './_children/web-vitals'
import { getIframeStory, getLang } from './_dependencies/utils'

const MonorepoOutput: OutputComponent<OutputProps> = ({
  children,
  contextPath,
  deployment,
  arcSite,
  globalContent,
  Resource,
  siteProperties,
  requestUri,
  metaValue,
  Fusion,
  Libs,
}) => {
  const { googleTagManagerId } = siteProperties
  const lang = getLang()
  const isIframeStory = getIframeStory()

  return (
    <html itemScope itemType="http://schema.org/WebPage" lang={lang}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="lang" content={lang} />
      </head>
      <body className="" itemScope itemType="http://schema.org/WebPage">
        <noscript>
          <iframe
            title="Google Tag Manager - No Script"
            src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <div id="fusion-app" role="application">
          {children}
        </div>
        <Fusion hydrateOnly />
        <Libs />
        <WebVitals
          report={
            !isIframeStory &&
            arcSite === SITE_ELBOCON &&
            requestUri.includes('/wikibocon/')
          }
        />
        <RegisterServiceWorker path={deployment('/sw.js')} />
      </body>
    </html>
  )
}

MonorepoOutput.fallback = false

export default MonorepoOutput
