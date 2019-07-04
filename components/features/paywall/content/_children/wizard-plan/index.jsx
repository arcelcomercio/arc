import React from 'react'
import Panel from '../../../_children/panel'
import './wizard-plan.css'

function WizardPlan() {
  return (
    <div className="wizard-plan">
      <div className="wizard-plan__wrap">
        <Panel type="summary" valing="jc-center">
          test
        </Panel>
        <div className="wizard-plan__wrap-plan">
          <div className="wizard-plan__title">Title</div>
          <div className="wizard-plan__plans">
            <Panel type="card-price">summary</Panel>
            <Panel type="card-price">summary</Panel>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WizardPlan
