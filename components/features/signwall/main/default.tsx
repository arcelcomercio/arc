import * as React from 'react'

import importRetry from '../../../utilities/core/import-retry'
import { SignwallDefaultProps } from './_default'

export default React.memo<SignwallDefaultProps>(
  ({ classButton, countOnly }) => {
    const SignwallComponent = React.lazy(() =>
      importRetry(
        () =>
          import(
            /* webpackChunkName: "main-signwall" */
            './_default'
          )
      )
    )

    return (
      <React.Suspense fallback="...">
        <SignwallComponent classButton={classButton} countOnly={countOnly} />
      </React.Suspense>
    )
  }
)
