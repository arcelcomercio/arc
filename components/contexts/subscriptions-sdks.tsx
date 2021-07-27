import Identity from '@arc-publishing/sdk-identity'
import Sales from '@arc-publishing/sdk-sales'
import { useAppContext } from 'fusion:context'
import * as React from 'react'
import { SubsArcSite } from 'types/subscriptions'

import { PropertiesSite } from '../features/subscriptions/_dependencies/Properties'

type StatusOptions = 'error' | 'loading' | 'ready'

const SdkStatus: Record<StatusOptions, StatusOptions> = {
  error: 'error',
  loading: 'loading',
  ready: 'ready',
}

type SdksProviderProps = {
  children: React.ReactNode
}

type SdksProviderValue = {
  status: StatusOptions | undefined
  error?: any | undefined
}

const SdksContext = React.createContext<SdksProviderValue | undefined>(
  undefined
)

const useSdksContext = (): SdksProviderValue => {
  const context = React.useContext(SdksContext)
  if (context === undefined) {
    throw new Error('useSdksContext debe ser usado dentro de un AuthProvider')
  }
  return context
}

/** @see https://elcomercio.arcpublishing.com/alc/arc-products/subscriptions/user-docs/subscribe-with-google-swg-integration/ */
const SdksProvider: React.FC<SdksProviderProps> = ({ children }) => {
  const { arcSite } = useAppContext()
  const {
    urls: { arcOrigin: apiOrigin },
  } = PropertiesSite[arcSite as SubsArcSite]

  const initializeSDKs = async (): Promise<SdksProviderValue> => {
    Identity.options({
      apiOrigin,
    })

    Sales.options({
      Identity,
      apiOrigin,
    })

    return {
      status: SdkStatus.ready,
    }
  }

  let value: SdksProviderValue = {
    status: SdkStatus.loading,
  }

  initializeSDKs()
    .then((sdks) => {
      value = sdks
    })
    .catch((error) => {
      value = {
        status: SdkStatus.error,
        error,
      }
    })

  return <SdksContext.Provider value={value}>{children}</SdksContext.Provider>
}

export { SdksProvider, SdkStatus, useSdksContext }
