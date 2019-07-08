import React from 'react'
import Panel from '../../../_children/panel'
import CardPrice from '../card-price'
import './wizard-plan.css'

function WizardPlan({ plans }) {
  return (
    <div className="wizard-plan">
      <div className="wizard-plan__wrap">
        <Panel type="summary" valing="jc-center">
          test
        </Panel>
        <div className="wizard-plan__wrap-plan">
          <div className="wizard-plan__title">Selecciona un plan de pago:</div>
          <div className="wizard-plan__plans">
            {plans.map(plan => {
              ;<Panel type="card-price">
                <CardPrice
                  amount={plan.rates[0].amount}
                  billingFrequency={plan.rates[0].billingFrequency}
                />
              </Panel>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WizardPlan
