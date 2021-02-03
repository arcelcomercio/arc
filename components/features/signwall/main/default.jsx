import * as React from 'react'

export default () => {
  const SignwallComponent = React.lazy(() =>
    import(
      /* webpackChunkName: "main-signwall" */
      './_default'
    )
  )

  return (
    <React.Suspense fallback="Cargando...">
      <SignwallComponent />
    </React.Suspense>
  )
}
