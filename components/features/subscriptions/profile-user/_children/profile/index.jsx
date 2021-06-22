import * as React from 'react'

import { ModalConsumer } from '../../../_context/modal'
import { Wrapper } from '../../styled'
import UpdatePass from './_children/update-pass'
import UpdateProfile from './_children/update-profile'

const MiPerfil = () => {
  const { userProfile } = React.useContext(ModalConsumer)
  const { identities = [] } = userProfile
  const [identitie = { type: 'Password' }] = identities || []
  const disabledSocial = identitie.type !== 'Password'

  return (
    <Wrapper>
      <UpdateProfile />
      <div className="space-40" />
      <div hidden={disabledSocial}>
        <UpdatePass />
      </div>
    </Wrapper>
  )
}

export default MiPerfil
