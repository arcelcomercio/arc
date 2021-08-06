import Identity from '@arc-publishing/sdk-identity'
import Sales from '@arc-publishing/sdk-sales'
import { useAppContext } from 'fusion:context'
import * as React from 'react'
import { ValuesOf } from 'types/utils'

import { getApiOrigin } from '../utilities/subscriptions'

type StatusOptions = ValuesOf<SdkStatus>
enum SdkStatus {
  Error,
  Loading,
  Ready,
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
  const [value, setValue] = React.useState<SdksProviderValue>({
    status: SdkStatus.Loading,
  })

  const apiOrigin = getApiOrigin(arcSite)

  const initializeSDKs = async (): Promise<SdksProviderValue> => {
    Identity.options({
      apiOrigin,
    })

    Sales.options({
      Identity,
      apiOrigin,
    })

    return {
      status: SdkStatus.Ready,
    }
  }

  React.useEffect(() => {
    initializeSDKs()
      .then((sdks) => {
        setValue(sdks)
      })
      .catch((error) => {
        setValue({
          status: SdkStatus.Error,
          error,
        })
      })
  }, [])

  return <SdksContext.Provider value={value}>{children}</SdksContext.Provider>
}

export { SdksProvider, SdkStatus, useSdksContext }
