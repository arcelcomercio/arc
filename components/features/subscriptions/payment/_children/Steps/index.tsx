import * as React from 'react'

import importRetry from '../../../../../utilities/core/import-retry'

const Singwall = React.lazy(() =>
  importRetry(() => import(/* webpackChunkName: 'Signwall' */ '../Singwall'))
)
const Profile = React.lazy(() =>
  importRetry(() => import(/* webpackChunkName: 'Profile' */ '../Profile'))
)
const Pay = React.lazy(() =>
  importRetry(() => import(/* webpackChunkName: 'Pay' */ '../Pay'))
)
const Confirmation = React.lazy(() =>
  importRetry(
    () => import(/* webpackChunkName: 'Confirmation' */ '../Confirmation')
  )
)
const PagoEfectivo = React.lazy(() =>
  importRetry(
    () => import(/* webpackChunkName: 'PagoEfectivo' */ '../PagoEfectivo')
  )
)

type PaymentSubscriptionsStepsProps = {
  step: number
  userLoaded: boolean
}

const PaymentSubscriptionsSteps: React.FC<PaymentSubscriptionsStepsProps> = ({
  step,
  userLoaded,
}) => {
  if (typeof window === 'undefined') return null

  switch (step) {
    case 2:
      return userLoaded ? (
        <React.Suspense fallback={<div>Cargando...</div>}>
          <Profile />
        </React.Suspense>
      ) : (
        <React.Suspense fallback={<div>Cargando...</div>}>
          <Singwall />
        </React.Suspense>
      )
    case 3:
      return userLoaded ? (
        <React.Suspense fallback={<div>Cargando...</div>}>
          <Pay />
        </React.Suspense>
      ) : (
        <React.Suspense fallback={<div>Cargando...</div>}>
          <Singwall />
        </React.Suspense>
      )
    case 4:
      return userLoaded ? (
        <React.Suspense fallback={<div>Cargando...</div>}>
          <Confirmation />
        </React.Suspense>
      ) : (
        <React.Suspense fallback={<div>Cargando...</div>}>
          <Singwall />
        </React.Suspense>
      )
    case 5:
      return userLoaded ? (
        <React.Suspense fallback={<div>Cargando...</div>}>
          <PagoEfectivo />
        </React.Suspense>
      ) : (
        <React.Suspense fallback={<div>Cargando...</div>}>
          <Singwall />
        </React.Suspense>
      )
    default:
      return (
        <React.Suspense fallback={<div>Cargando...</div>}>
          <Singwall />
        </React.Suspense>
      )
  }
}

export default React.memo(PaymentSubscriptionsSteps)
