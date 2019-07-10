import React from 'react'
import CardPrice from '../card-price'
import Summary from './_children/summary'
import * as S from './styled'

function WizardPlan({ nextStep }) {
  return (
    <S.WizardPlan>
      <S.Wrap>
        <Summary />
        <S.WrapPlan>
          <S.PlanTitle>Selecciona un plan de pago:</S.PlanTitle>
          <S.Plans>
            <CardPrice
              amount="29"
              billingFrequency="month"
              nextStep={nextStep}
            />
            <CardPrice amount="350" billingFrequency="year" />
          </S.Plans>
        </S.WrapPlan>
      </S.Wrap>
    </S.WizardPlan>
  )
}

export default WizardPlan
