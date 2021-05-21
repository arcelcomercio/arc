import { useAppContext } from 'fusion:context'
import * as React from 'react'

import Loading from '../../../../signwall/_children/loading'
import { ModalConsumer } from '../../../_context/modal'
import { Wrapper } from '../../styled'
import UpdatePass from './_children/update-pass'
import UpdateProfile from './_children/update-profile'

const MiPerfil = () => {
  const { arcSite } = useAppContext() || {}
  const { userProfile } = React.useContext(ModalConsumer)
  const { identities = [] } = userProfile
  const [identitie = { type: 'Password' }] = identities || []
  const [showLoading, setShowLoading] = React.useState(true)
  const disabledSocial = identitie.type !== 'Password'

  React.useEffect(() => {
    setTimeout(() => {
      setShowLoading(false)
    }, 1000)
  }, [])

  return (
    <Wrapper>
      {!showLoading ? (
        <>
          <UpdateProfile />
          <div className="space-40" />
          <div hidden={disabledSocial}>
            <UpdatePass />
          </div>
        </>
      ) : (
        <Loading arcSite={arcSite} typeBg="wait" />
      )}
    </Wrapper>
  )
}

export default MiPerfil
