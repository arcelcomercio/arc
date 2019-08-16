import React, { useState, useEffect } from 'react'

import CardPrice from './_children/card-price'
import Summary from './_children/summary'
import * as S from './styled'
import { addSales } from '../../../_dependencies/sales'
import BannerPromoSuscriptor from './_children/banner-promo-suscriptor'
import Modal from '../../../_children/modal'
import CheckSuscription from './_children/check-suscriptor'
import { PixelActions, sendAction } from '../../../_dependencies/analitycs'
import { parseQueryString } from '../../../../../utilities/helpers'

function WizardPlan(props) {
  const {
    assets,
    summary,
    plans,
    message,
    printed,
    onBeforeNextStep = (res, goNextStep) => goNextStep(),
    setLoading,
  } = props

  const [loadingPlan, setLoadingPlan] = useState()
  const [activePlan, setActivePlan] = useState()
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    sendAction(PixelActions.PAYMENT_PLAN)
  }, [])

  const Sales = addSales()

  useEffect(() => {
    Sales.then(sales => {
      sales.clearCart()
    })
  }, [])

  function subscribePlanHandler(e, plan) {
    Sales.then(sales => {
      setLoading(true)
      return sales
        .addItemToCart([
          { sku: plan.sku, priceCode: plan.priceCode, quantity: 1 },
        ])
        .then(res => {
          setLoading(false)
          const {
            location: { search },
          } = window
          const qs = parseQueryString(search)
          const { title } = summary
          onBeforeNextStep(
            {
              plan: { printed, ...plan, title },
              referer: qs.ref || 'organico',
            },
            props
          )
        })
        .catch(e => {
          setLoading(false)
        })
    })
  }

  return (
    <S.WizardPlan>
      {message && <S.Error autoClose={7000}>{message}</S.Error>}
      {printed && (
        <S.WelcomeSuscriptor>
          ACCEDE A ESTOS <strong>PRECIOS ESPECIALES</strong> POR SER SUSCRIPTOR
          IMPRESO
        </S.WelcomeSuscriptor>
      )}
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
                />
              )
            })}
          </S.Plans>
        </S.WrapPlan>
      </S.Wrap>
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false)
        }}>
        <CheckSuscription />
      </Modal>
      {!printed && (
        <BannerPromoSuscriptor
          onClick={() => {
            setOpenModal(true)
          }}
          assets={assets}
        />
      )}
    </S.WizardPlan>
  )
}

export default WizardPlan
