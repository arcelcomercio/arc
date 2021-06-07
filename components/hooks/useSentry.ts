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

const useSentry = (): UseSentryValue => {
  const { arcSite, deployment } = useAppContext()

  React.useEffect(() => {
    if (!isConfigured) {
      const { urls } = PropertiesCommon
      Sentry.init({
        dsn: urls.dsnSentry,
        debug: env !== PROD,
        release: `arc-deployment@${deployment}`,
        environment: env,
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
