import React from 'react'
import CardPrice from '../card-price'
import Summary from './_children/summary'
import * as S from './styled'

function WizardPlan({ nextStep, summary, plans }) {
  return (
    <S.WizardPlan>
      <S.Wrap>
        <Summary {...summary} />
        <S.WrapPlan>
          <S.PlanTitle>Selecciona un plan de pago:</S.PlanTitle>
          <S.Plans>
            {plans.map((plan, index) => {
              return <CardPrice
                key={plan.priceCode}
                {...plan}
                nextStep={nextStep}
              />
            })}
          </S.Plans>
        </S.WrapPlan>
      </S.Wrap>
    </S.WizardPlan>
  )
}

export default WizardPlan
