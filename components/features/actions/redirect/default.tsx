import * as React from 'react'
import { FC } from 'types/features'

import { addQuery } from '../../../utilities/parse/queries'
import customFields from './_dependencies/custom-fields'

interface ActionsRedirectProps {
  customFields?: {
    redirectUrl?: string
    redirectOutputType?: string
  }
}

const ActionsRedirect: FC<ActionsRedirectProps> = (props): null => {
  const {
    customFields: { redirectUrl = '', redirectOutputType = '' } = {},
  } = props

  React.useLayoutEffect(() => {
    if (redirectUrl) {
      window.location.href = redirectUrl
    } else if (redirectOutputType) {
      window.location.href = addQuery('outputType', redirectOutputType, {
        return: true,
      })
    }
  }, [])

  return null
}

ActionsRedirect.propTypes = {
  customFields,
}

ActionsRedirect.label = 'Redirección temporal'

export default ActionsRedirect
