import * as React from 'react'

import useProfile from '../../../../../hooks/useProfile'
import UpdateLocation from './_children/update-location'
import UpdatePass from './_children/update-pass'
import UpdateProfile from './_children/update-profile'

const MiPerfil = (): JSX.Element => {
  const { composeUserProfile, userProfile, updateUserProfile } = useProfile()
  const { identities = [] } = userProfile || {}
  const [identitie = { type: 'Password' }] = identities || []
  const disabledSocial = identitie.type !== 'Password'

  const composedProfile = composeUserProfile(userProfile)

  return (
    <div>
      <div className="sign-profile_general-wrapper">
        <UpdateProfile
          userProfile={composedProfile}
          updateUserProfile={updateUserProfile}
        />
      </div>
      <div className="space-40" />
      <div className="sign-profile_general-wrapper">
        <UpdateLocation
          userProfile={composedProfile}
          updateUserProfile={updateUserProfile}
        />
      </div>
      {disabledSocial ? null : (
        <>
          <div className="space-40" />
          <div className="sign-profile_general-wrapper">
            <UpdatePass />
          </div>
        </>
      )}
    </div>
  )
}

export default MiPerfil
