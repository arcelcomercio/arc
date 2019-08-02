import React, { useState } from 'react'
import { useFusionContext } from 'fusion:context'

import CardPrice from './_children/card-price'
import Summary from './_children/summary'
import * as S from './styled'
import { addSales } from '../../../_dependencies/sales'
import BannerPromoSuscriptor from './_children/banner-promo-suscriptor'
import Modal from '../../../_children/modal'
import CheckSuscription from './_children/check-suscriptor'

function WizardPlan(props) {
  const {
    assets,
    summary,
    plans,
    onBeforeNextStep = (res, goNextStep) => goNextStep(),
  } = props

  const fusionContext = useFusionContext()
  const [loadingPlan, setLoadingPlan] = useState()
  const [activePlan, setActivePlan] = useState()
  const [openModal, setOpenModal] = useState(false)

  const { siteProperties } = fusionContext
  const Sales = addSales(siteProperties)

  function subscribePlanHandler(e, plan) {
    Sales.then(sales => {
      setLoadingPlan(plan)
      return sales
        .addItemToCart([
          { sku: plan.sku, priceCode: plan.priceCode, quantity: 1 },
        ])
        .then(res => {
          setLoadingPlan(false)
          onBeforeNextStep({ plan }, props)
        })
        .catch(e => {
          setLoadingPlan(false)
        })
    })
  }

  return (
    <S.WizardPlan>
      <S.Wrap>
        <Summary {...summary} />
        <S.WrapPlan>
          <S.PlanTitle>Selecciona el período de pago:</S.PlanTitle>
          <S.Plans>
            {plans.map((plan, idx) => {
              const { priceCode } = plan

              return (
                <CardPrice
                  active={
                    activePlan === priceCode || (!activePlan && idx === 0)
                  }
                  key={priceCode}
                  plan={plan}
                  onMouseOver={() => setActivePlan(priceCode)}
                  onFocus={() => setActivePlan(priceCode)}
                  onClick={subscribePlanHandler}
                  loading={loadingPlan && loadingPlan.priceCode === priceCode}
                />
              )
            })}
          </S.Plans>
        </S.WrapPlan>
      </S.Wrap>
      <Modal
        open={openModal}
        close={() => {
          setOpenModal(false)
        }}>
        <CheckSuscription />
      </Modal>
      <BannerPromoSuscriptor
        onClick={() => {
          setOpenModal(true)
        }}
        assets={assets}
      />
    </S.WizardPlan>
  )
}

export default WizardPlan
