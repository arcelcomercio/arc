import FingerprintJS from '@fingerprintjs/fingerprintjs'
import * as React from 'react'

import { setCookie } from '../../../utilities/client/cookies'

type UseFingerprintValue = {
  FingerprintJS: typeof FingerprintJS
}

const useFingerprint = (): UseFingerprintValue => {
  React.useEffect(() => {
    const fpPromise = FingerprintJS.load()
    fpPromise
      .then((fp) => fp.get())
      .then((result) => {
        setCookie('gecdigarc', result.visitorId, 365)
      })
      .catch((error) => {
        window.console.error(
          'Ha ocurrido un error al crear la cookie - gecdigarc: ',
          error
        )
      })
  }, [])

  return {
    FingerprintJS,
  }
}
export default useFingerprint
