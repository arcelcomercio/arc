import * as Sentry from '@sentry/browser'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { PropertiesCommon } from '../features/subscriptions/_dependencies/Properties'
import { env } from '../utilities/arc/env'
import { PROD } from '../utilities/constants/environment'

let isConfigured = false

type UseSentryValue = {
  isConfigured: boolean
}

const useSentry = (dsn: string): UseSentryValue => {
  const { arcSite, deployment } = useAppContext()

  React.useEffect(() => {
    if (!isConfigured) {
      const { urls } = PropertiesCommon
      Sentry.init({
        dsn: dsn || urls.sentrySubs,
        debug: env !== PROD,
        release: `arc-deployment@${deployment}`,
        environment: env,
        denyUrls: [
          // Google & ads
          /delivery\.adrecover\.com/,
          /analytics/,
          /gtm\.js/,
          // Facebook flakiness
          /graph\.facebook\.com/i,
          // Facebook blocked
          /connect\.facebook\.net/i,
          // Chrome extensions
          /extensions\//i,
          /^chrome:\/\//i,
          // Other plugins
          /webappstoolbarba\.texthelp\.com\//i,
          /metrics\.itunes\.apple\.com\.edgesuite\.net\//i,
        ],
        ignoreErrors: [
          // Random plugins/extensions
          'top.GLOBALS',
          // See: http://blog.errorception.com/2012/03/tale-of-unfindable-js-error.html
          'originalCreateNotification',
          'canvas.contentDocument',
          'MyApp_RemoveAllHighlights',
          'http://tt.epicplay.com',
          "Can't find variable: ZiteReader",
          'jigsaw is not defined',
          'ComboSearch is not defined',
          'http://loading.retry.widdit.com/',
          'atomicFindClose',
          // Facebook borked
          'fb_xd_fragment',
          // ISP "optimizing" proxy - `Cache-Control: no-transform` seems to reduce this. (thanks @acdha)
          // See http://stackoverflow.com/questions/4113268/how-to-stop-javascript-injection-from-vodafone-proxy
          'bmi_SafeAddOnload',
          'EBCallBackMessageReceived',
          // See http://toolbar.conduit.com/Developer/HtmlAndGadget/Methods/JSInjection.aspx
          'conduitPage',
          // Generic error code from errors outside the security sandbox
          // You can delete this if using raven.js > 1.0, which ignores these automatically.
          'Script error.',
        ],
        // beforeSend(event, hint) {
        //   const error = hint.originalException
        //   if (
        //     error &&
        //     error.message &&
        //     error.message.match(/database unavailable/i)
        //   ) {
        //     event.fingerprint = ['database-unavailable']
        //   }
        //   return event
        // },
      })
      Sentry.configureScope((scope) => {
        scope.setTag('brand', arcSite)
      })
      isConfigured = true
    }
  }, [])

  return {
    isConfigured,
  }
}

export default useSentry
