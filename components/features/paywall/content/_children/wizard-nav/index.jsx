import React from 'react'
import './wizard-nav.css'
import c from '../../../_dependencies/tools'

function Nav({ totalSteps, stepsNames, currentStep, right = () => {} }) {
  const steps = new Array(totalSteps).fill(0)
  return (
    <div className="wizard-nav">
      <div className="wizard-nav__wrap">
        {steps.map((item, index) => {
          const step = index + 1
          return (
            <div
              key={step}
              className={c([
                'wizard-nav__content',
                ['wizard-nav__content--active', step === currentStep],
              ])}>
              <div className="wizard-nav__step">
                <span className="wizard-nav__number">{step}</span>
              </div>
              <span className="wizard-nav__step-name">{stepsNames[index]}</span>
            </div>
          )
        })}
      </div>
      <div className="wizard-nav__right">{right}</div>
    </div>
  )
}

export default Nav
