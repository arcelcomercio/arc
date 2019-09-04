import React, { useState, useEffect } from 'react'
import * as Sentry from '@sentry/browser'

import CardPrice from './_children/card-price'
import Summary from './_children/summary'
import * as S from './styled'
import { addSales } from '../../../_dependencies/sales'
import BannerPromoSuscriptor from './_children/banner-promo-suscriptor'
import CheckSuscription from './_children/check-suscriptor'
import { PixelActions, sendAction } from '../../../_dependencies/analitycs'
import { parseQueryString } from '../../../../../utilities/helpers'
import getDomain from '../../../_dependencies/domains'

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

  const [activePlan, setActivePlan] = useState()
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    sendAction(PixelActions.PAYMENT_PLAN)
  }, [])

  const Sales = addSales()

  function subscribePlanHandler(e, plan) {
    Sales.then(sales => {
      setLoading(true)
      const selectedPlan = {
        sku: plan.sku,
        priceCode: plan.priceCode,
        quantity: 1,
      }
      Sentry.addBreadcrumb({
        category: 'compra',
        message: 'Plan seleccionado',
        data: selectedPlan,
        level: Sentry.Severity.Info,
      })

      return sales
        .clearCart()
        .then(() => {
          return sales.addItemToCart([selectedPlan]).then(response => {
            setLoading(false)

            Sentry.addBreadcrumb({
              category: 'compra',
              message: 'Añadió plan a carrito de compras',
              data: { response },
              level: Sentry.Severity.Info,
            })

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
        })
        .catch(e => {
          setLoading(false)
          Sentry.captureException(e)
        })
    })
  }

  return (
    <S.WizardPlan>
      {message && <S.Error>{message}</S.Error>}
      {printed && (
        <S.WelcomeSuscriptor>
          ACCEDE A ESTOS <strong>PRECIOS ESPECIALES</strong> POR SER SUSCRIPTOR
          IMPRESO
        </S.WelcomeSuscriptor>
      )}
      <S.Wrap>
        <Summary {...summary} />
        <S.WrapPlan>
          {/* <S.PlanTitle>Selecciona el período de pago:</S.PlanTitle> */}
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
      <CheckSuscription
        open={openModal}
        onClose={() => {
          setOpenModal(false)
        }}
      />
      {!printed && (
        <S.ContentBanner>
          <BannerPromoSuscriptor
            onClick={() => {
              setOpenModal(true)
            }}
            assets={assets}
            type="left"
          />

          <BannerPromoSuscriptor
            onClick={() => {
              window.location.href = getDomain('URL_CORPORATE')
            }}
            assets={assets}
            type="right"
          />
        </S.ContentBanner>
      )}
    </S.WizardPlan>
  )
}

export default WizardPlan
