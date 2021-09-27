import * as React from 'react'

import importRetry from '../../../../utilities/core/import-retry'

const SignwallCallout = React.lazy(() =>
  importRetry(
    () => import(/* webpackChunkName: 'signwall-callout' */ './CallMobile')
  )
)

type CalloutProps = {
  fallback: React.SuspenseProps['fallback']
  onClose: (e?: React.MouseEventHandler<HTMLButtonElement>) => void
}

const Callout: React.FC<CalloutProps> = ({ fallback, onClose }) => (
  <React.Suspense fallback={fallback}>
    <SignwallCallout onClose={onClose} />
  </React.Suspense>
)

export default React.memo(Callout)
