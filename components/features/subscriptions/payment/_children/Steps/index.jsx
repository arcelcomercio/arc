import * as React from 'react'

const Singwall = React.lazy(() =>
  import(/* webpackChunkName: 'Signwall' */ '../Singwall')
)
const Profile = React.lazy(() =>
  import(/* webpackChunkName: 'Profile' */ '../Profile')
)
const Pay = React.lazy(() => import(/* webpackChunkName: 'Pay' */ '../Pay'))
const Confirmation = React.lazy(() =>
  import(/* webpackChunkName: 'Confirmation' */ '../Confirmation')
)
const PagoEfectivo = React.lazy(() =>
  import(/* webpackChunkName: 'PagoEfectivo' */ '../PagoEfectivo')
)

const PaymentSubscriptionsSteps = ({ step, userLoaded }) => {
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
