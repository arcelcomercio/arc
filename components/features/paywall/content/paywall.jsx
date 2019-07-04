import React from 'react'
import Wizard from 'react-step-wizard'
import WizardUserProfile from './_children/wizard-user-profile'
import Nav from './_children/wizard-nav'
import WizardPlan from './_children/wizard-plan'

const _stepsNames = ['PLANES', 'DATOS', 'PAGO', 'CONFIRMACIÓN']

const Right = () => {
  return <div>Hola2</div>
}

class Content extends React.PureComponent {
  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 1120 }}>
          <Wizard nav={<Nav stepsNames={_stepsNames} right={<Right />} />}>
            <WizardPlan />
            <WizardUserProfile />
          </Wizard>
        </div>
      </div>
    )
  }
}

export default Content
