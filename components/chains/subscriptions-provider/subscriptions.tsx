import * as React from 'react'
import { FC } from 'types/features'

import SdksProvider from '../../contexts/subscriptions-sdks'
import customFields from './_dependencies/custom-fields'

interface SubscriptionsProviderProps {
  customFields?: {
    disableSales?: boolean
    disableSentry?: boolean
  }
}

const SubscriptionsProvider: FC<SubscriptionsProviderProps> = ({
  children,
  customFields: { disableSales = false, disableSentry = false } = {},
}) => (
  <SdksProvider disableSales={disableSales} disableSentry={disableSentry}>
    {children}
  </SdksProvider>
)

SubscriptionsProvider.label = 'SDKs de Suscripciones'
SubscriptionsProvider.propTypes = {
  customFields,
}

export default SubscriptionsProvider
