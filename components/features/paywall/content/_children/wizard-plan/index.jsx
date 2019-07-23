import React, { useState } from 'react'
import { useFusionContext } from 'fusion:context'

import CardPrice from './_children/card-price'
import Summary from './_children/summary'
import * as S from './styled'
import { addSales } from '../../../_dependencies/sales'
import { devices } from '../../../_dependencies/devices'
import Icon from '../../../_children/icon'

function WizardPlan(props) {
  const {
    assets,
    summary,
    plans,
    onBeforeNextStep = (res, goNextStep) => goNextStep(),
  } = props

  const fusionContext = useFusionContext()
  const [loadingPlan, setLoadingPlan] = useState()
  const [errors, setErrors] = useState([])

  const { siteProperties } = fusionContext
  const Sales = addSales(siteProperties)

  function subscribePlanHandler(e, plan) {
    Sales.then(sales => {
      setLoadingPlan(plan)
      return sales
        .addItemToCart(plan.sku, plan.priceCode, 1)
        .then(res => {
          setLoadingPlan(false)
          onBeforeNextStep(plan, props)
        })
        .catch(e => {
          setLoadingPlan(false)
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
              const { billingFrequency, priceCode } = plan

              return (
                <CardPrice
                  active={billingFrequency === 'Month'}
                  key={priceCode}
                  plan={plan}
                  onClick={subscribePlanHandler}
                  loading={loadingPlan && loadingPlan.priceCode === priceCode}
                />
              )
            })}
          </S.Plans>
        </S.WrapPlan>
      </S.Wrap>
      <S.Subscribed as="a">
        <div>
          <S.Picture>
            <source srcSet={assets('lector')} />
            <source
              media={`(${devices.mobile})`}
              srcSet="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            />
            <S.Img src={assets('lector')} alt="lector" />
          </S.Picture>
        </div>
        <S.SubscribedContent>
          <S.SubscribedText>
            <span>¿ERES SUSCRIPTOR DEL DIARIO IMPRESO?</span>
            <S.Small>ACCEDE A UN DESCUENTO PARA TU PLAN DIGITAL.</S.Small>
          </S.SubscribedText>
          <div>
            <Icon type="arrowRight" />
          </div>
        </S.SubscribedContent>
      </S.Subscribed>
    </S.WizardPlan>
  )
}

export default WizardPlan
