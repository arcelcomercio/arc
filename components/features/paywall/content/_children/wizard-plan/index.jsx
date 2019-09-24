/* eslint-disable no-extra-boolean-cast */
import React, { useState, useEffect, useRef } from 'react'
import * as Sentry from '@sentry/browser'

import CardPrice from './_children/card-price'
import Summary from './_children/summary'
import * as S from './styled'
import BannerPromoSuscriptor from './_children/banner-promo-suscriptor'
import CheckSuscription from './_children/check-suscriptor'
import { PixelActions, sendAction } from '../../../_dependencies/analitycs'
import getDomain from '../../../_dependencies/domains'
import PWA from '../../_dependencies/seed-pwa'

function WizardPlan(props) {
  const {
    memo: { printedSubscriber },
    summary,
    plans,
    message,
    onBeforeNextStep = (res, goNextStep) => goNextStep(),
    setLoading,
  } = props

  const [activePlan, setActivePlan] = useState()
  const [openModal, setOpenModal] = useState(false)
  const origin = useRef('organico')
  const referer = useRef('')

  useEffect(() => {
    origin.current = sessionStorage.getItem('paywall_type_modal') || 'organico'
    referer.current = sessionStorage.getItem('paywall_last_url')
    sendAction(PixelActions.PAYMENT_PLAN, {
      referer: referer.current,
      medioCompra: origin.current,
      suscriptorImpreso: !!printedSubscriber ? 'si' : 'no',
      pwa: PWA.isPWA() ? 'si' : 'no',
    })
    document.getElementsByClassName('foot')[0].style.position = 'relative'
  }, [])

  function subscribePlanHandler(e, plan) {
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

    const { title } = summary
    setTimeout(() => {
      setLoading(false)
      onBeforeNextStep(
        {
          plan: { ...plan, title },
          origin: origin.current,
          referer: referer.current,
        },
        props
      )
    }, 1000)
  }

  return (
    <S.WizardPlan>
      {message && <S.Error>{message}</S.Error>}
      {printedSubscriber && (
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
        onSubmit={({ documentType, documentNumber, attemptToken }) => {
          window.location.href = getDomain(
            'VALIDATE_SUSCRIPTOR',
            documentType,
            documentNumber,
            attemptToken
          )
        }}
        onClose={() => {
          setOpenModal(false)
        }}
      />
      {!printedSubscriber && (
        <S.ContentBanner>
          <BannerPromoSuscriptor
            onClick={() => {
              setOpenModal(true)
            }}
            type="left"
          />

          <BannerPromoSuscriptor
            onClick={() => {
              window.location.href = getDomain('URL_CORPORATE')
            }}
            type="right"
          />
        </S.ContentBanner>
      )}
    </S.WizardPlan>
  )
}

export default WizardPlan
