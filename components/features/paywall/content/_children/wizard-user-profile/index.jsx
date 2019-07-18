import React from 'react'
import UserPerfil from '../../../_children/user-profile'
import Panel from '../../../_children/panel'
import Summary from '../summary'
import * as S from './styled'
import { devices } from '../../../_dependencies/devices'

const { styled } = S

const PanelUserProfile = styled(Panel)`
  @media (${devices.mobile}) {
    margin-top: 30px;
  }
`

function WizardUserProfile({ profile, summary, nextStep }) {
  return (
    <S.WizardUserProfile>
      <PanelUserProfile type="content" valing="jc-center">
        {profile && (
          <UserPerfil
            profile={profile}
            onClick={nextStep}
            title="Ingrese sus datos"
          />
        )}
      </PanelUserProfile>
      <Summary summary={summary} />
    </S.WizardUserProfile>
  )
}

export default WizardUserProfile
