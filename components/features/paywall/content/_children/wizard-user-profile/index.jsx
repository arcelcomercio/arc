import React from 'react'
import UserPerfil from '../../../_children/user-profile'
import Panel from '../../../_children/panel'
import Summary from '../../../_children/summary'
import './wizard-user-profile.css'

function WizardUserProfile() {
  return (
    <div className="wizard-user-profile">
      <Panel type="content" valing="jc-center">
        <UserPerfil />
      </Panel>
      <Panel type="summary">
        <Summary />
      </Panel>
    </div>
  )
}

export default WizardUserProfile
