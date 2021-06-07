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

export const SdksContext = React.createContext({})

export const useSdksContext = (): Pick<SdksProviderProps, 'disableSales'> =>
  React.useContext(SdksContext)

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

export default SdksProvider
