import * as React from 'react'

const SignwallCallout = React.lazy(() =>
  import(
    /* webpackChunkName: 'signwall-callout' */ '../../../signwall/_children/callout/index'
  )
)

const Callout = ({
  fallback,
  typeDialog,
  nameDialog,
  onLoggedFail,
  onClose,
}) => {
  return (
    <React.Suspense fallback={fallback}>
      <SignwallCallout
        typeDialog={typeDialog}
        nameDialog={nameDialog}
        onLoggedFail={onLoggedFail}
        onClose={onClose}
      />
    </React.Suspense>
  )
}

export default React.memo(Callout)
