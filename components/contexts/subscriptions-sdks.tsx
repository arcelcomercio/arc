import Identity from '@arc-publishing/sdk-identity'
import Sales from '@arc-publishing/sdk-sales'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { PropertiesSite } from '../features/subscriptions/_dependencies/Properties'

type SubsArcSite = 'elcomercio' | 'gestion'

type SdksProviderProps = {
  children: React.ReactNode
  disableSales?: boolean
}

const SdksContext = React.createContext<
  Pick<SdksProviderProps, 'disableSales'> | undefined
>(undefined)

const useSdksContext = (): Pick<SdksProviderProps, 'disableSales'> => {
  const context = React.useContext(SdksContext)
  if (context === undefined) {
    throw new Error('useSdksContext debe ser usado dentro de un AuthProvider')
  }
  return context
}

const SdksProvider: React.FC<SdksProviderProps> = ({
  children,
  disableSales,
}) => {
  const { arcSite } = useAppContext()
  const {
    urls: { arcOrigin: apiOrigin },
  } = PropertiesSite[arcSite as SubsArcSite]

  const initializeSDKs = async () => {
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
    }
  }

  const value = {
    disableSales,
  }

  initializeSDKs().then((sdks) => {
    // esto sera funcional cuando se implemente SubscribeWithGoogle
    // value = sdks
    console.log('SDKs inicializadas')
  })

  return <SdksContext.Provider value={value}>{children}</SdksContext.Provider>
}

export { SdksProvider, useSdksContext }
