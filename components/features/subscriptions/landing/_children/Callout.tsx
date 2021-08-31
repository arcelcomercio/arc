import * as React from 'react'

const SignwallCallout = React.lazy(
  () =>
    import(
      /* webpackChunkName: 'signwall-callout' */ '../../../signwall/_children/callout/index'
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
