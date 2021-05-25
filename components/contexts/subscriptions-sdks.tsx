import Identity from '@arc-publishing/sdk-identity'
import Sales from '@arc-publishing/sdk-sales'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

import {
  PropertiesCommon,
  PropertiesSite,
} from '../features/subscriptions/_dependencies/Properties'
import { env } from '../utilities/arc/env'
import { PROD } from '../utilities/constants/environment'

type SubsArcSite = 'elcomercio' | 'gestion'

type SdksProviderProps = {
  children: React.ReactNode
  disableSales?: boolean
  disableSentry?: boolean
}

export const SdksContext = React.createContext({})

export const useSdksContext = (): Pick<
  SdksProviderProps,
  'disableSales' | 'disableSentry'
> => React.useContext(SdksContext)

const SdksProvider: React.FC<SdksProviderProps> = ({
  children,
  disableSales,
  disableSentry,
}) => {
  const { arcSite, deployment } = useAppContext()
  const {
    urls: { arcOrigin: apiOrigin },
  } = PropertiesSite[arcSite as SubsArcSite]

  const initializeSDKs = async () => {
    if (!disableSentry) {
      import('@sentry/browser')
        .then(({ default: Sentry }) => {
          const { urls: commonUrls } = PropertiesCommon
          Sentry.init({
            dsn: commonUrls.dsnSentry,
            debug: env !== PROD,
            release: `arc-deployment@${deployment}`,
            environment: env,
          })
          Sentry.configureScope((scope) => {
            scope.setTag('brand', arcSite)
          })
        })
        .catch((error) =>
          console.error(
            'Ha ocurrido un error al importar @sentry/browser: ',
            error
          )
        )
    }

    Identity.options({
      apiOrigin,
    })

    if (!disableSales) {
      Sales.options({
        Identity,
        apiOrigin,
      })
    }

    return {
      Identity,
      Sales,
    }
  }

  const value = {
    disableSales,
    disableSentry,
  }

  initializeSDKs().then((sdks) => {
    // esto sera funcional cuando se implemente SubscribeWithGoogle
    // value = sdks
    console.log('SDKs inicializadas')
  })

  return <SdksContext.Provider value={value}>{children}</SdksContext.Provider>
}

export default SdksProvider
