import React from 'react'
import Panel from '../../../_children/panel'
import CardPrice from '../card-price'
import './wizard-plan.css'

function WizardPlan() {
  return (
    <div className="wizard-plan">
      <div className="wizard-plan__wrap">
        <Panel type="summary" valing="jc-center">
          test
        </Panel>
        <div className="wizard-plan__wrap-plan">
          <div className="wizard-plan__title">Selecciona un plan de pago:</div>
          <div className="wizard-plan__plans">
            <CardPrice amount="29" billingFrequency="month" />
            <CardPrice amount="350" billingFrequency="year" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default WizardPlan
