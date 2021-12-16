import * as React from 'react'

import importRetry from '../../../utilities/core/import-retry'

const SignwallLanding = React.lazy(() =>
  importRetry(() =>
    import(
      /* webpackChunkName: 'signwall-landing' */ '../../signwall/_children/landing/index'
    )
  )
)

const Signwall = ({
  fallback,
  typeDialog,
  nameDialog,
  onLogged,
  onLoggedFail,
  onClose,
}) => (
  <React.Suspense fallback={fallback}>
    <SignwallLanding
      typeDialog={typeDialog}
      nameDialog={nameDialog}
      onLogged={onLogged}
      onLoggedFail={onLoggedFail}
      onClose={onClose}
    />
  </React.Suspense>
)

export default React.memo(Signwall)
