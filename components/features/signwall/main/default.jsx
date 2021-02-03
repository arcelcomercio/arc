import * as React from 'react'

export default () => {
  const SignwallComponent = React.lazy(() => import('./_default'))

  return (
    <React.Suspense fallback="Cargando...">
      <SignwallComponent />
    </React.Suspense>
  )
}
