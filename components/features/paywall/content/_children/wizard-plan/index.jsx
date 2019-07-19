import React, { useState, useRef } from 'react'
import { useFusionContext } from 'fusion:context'

import CardPrice from './_children/card-price'
import Summary from './_children/summary'
import * as S from './styled'
import { addSales } from '../../../_dependencies/sales'

function WizardPlan(props) {
  const {
    memo,
    nextStep,
    summary,
    plans,
    onBeforeNextStep = (res, goNextStep) => goNextStep(),
  } = props

  const fusionContext = useFusionContext()
  const [loading, setLoading] = useState()
  const [errors, setErrors] = useState([])

  const { siteProperties } = fusionContext
  const Sales = addSales(siteProperties)

  function subscribePlanHandler(e, plan) {
    Sales.then(sales => {
      setLoading(true)
      return sales
        .addItemToCart(plan.sku, plan.priceCode, 1)
        .then(res => {
          setLoading(false)
          onBeforeNextStep(plan, props)
        })
        .catch(e => {
          setLoading(false)
          setErrors([...errors, e])
        })
    })
  }

  return (
    <S.WizardPlan>
      <S.Wrap>
        <Summary {...summary} />
        <S.WrapPlan>
          <S.PlanTitle>Selecciona un plan de pago:</S.PlanTitle>
          <S.Plans>
            {plans.map(plan => {
              return (
                <CardPrice
                  key={plan.priceCode}
                  plan={plan}
                  onClick={subscribePlanHandler}
                  loading={loading}
                />
              )
            })}
          </S.Plans>
        </S.WrapPlan>
      </S.Wrap>
    </S.WizardPlan>
  )
}

export default WizardPlan
