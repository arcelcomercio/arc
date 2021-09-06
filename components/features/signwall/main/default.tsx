import * as React from 'react'

import { SignwallDefaultProps } from './_default'

export default React.memo<SignwallDefaultProps>(
  ({ classButton, countOnly }) => {
    const SignwallComponent = React.lazy(
      () =>
        import(
          /* webpackChunkName: "main-signwall" */
          './_default'
        )
    )

    return (
      <React.Suspense fallback="...">
        <SignwallComponent classButton={classButton} countOnly={countOnly} />
      </React.Suspense>
    )
  }
)
