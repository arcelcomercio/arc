// eslint-disable-next-line simple-import-sort/imports
import * as React from 'react'

import { useModalContext } from '../../../_context/modal'
import UpdatePass from './_children/update-pass'
import UpdateProfile from './_children/update-profile-hooks'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import esLocale from 'date-fns/locale/es'

const MiPerfil = (): JSX.Element => {
  const { userProfile } = useModalContext()
  const { identities = [] } = userProfile || {}
  const [identitie = { type: 'Password' }] = identities || []
  const disabledSocial = identitie.type !== 'Password'

  return (
    <div className="sign-profile_general-wrapper">
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
        <UpdateProfile />
      </MuiPickersUtilsProvider>
      <div className="space-40" />
      <div hidden={disabledSocial}>
        <UpdatePass />
      </div>
    </div>
  )
}

export default MiPerfil
