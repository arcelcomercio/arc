import * as React from 'react'

export default React.memo(({ classButton, countOnly }) => {
  const SignwallComponent = React.lazy(() =>
    import(
      /* webpackChunkName: "main-signwall" */
      './_default'
    )
  )

  return (
    <React.Suspense fallback="Cargando...">
      <SignwallComponent classButton={classButton} countOnly={countOnly} />
    </React.Suspense>
  )
})
