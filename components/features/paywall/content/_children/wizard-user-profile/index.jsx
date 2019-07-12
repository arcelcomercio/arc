import React from 'react'
import UserPerfil from '../../../_children/user-profile'
import Panel from '../../../_children/panel'
import Summary from './_children/summary'
import * as S from './styled'

function WizardUserProfile({ profile }) {
  return (
    <S.WizardUserProfile>
      <Panel type="content" valing="jc-center" margin="30px 0 0 0">
        {profile && <UserPerfil profile={profile} title="Ingrese sus datos" />}
      </Panel>
      <Summary />
    </S.WizardUserProfile>
  )
}

export default WizardUserProfile
