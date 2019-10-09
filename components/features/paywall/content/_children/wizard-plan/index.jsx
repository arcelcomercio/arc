/* eslint-disable no-extra-boolean-cast */
import React, { useState, useEffect, useRef } from 'react'
import { withTheme } from 'styled-components'
import { useFusionContext } from 'fusion:context'
import * as Sentry from '@sentry/browser'

import { useStrings } from '../../../_children/contexts'
import CardPrice from './_children/card-price'
import Summary from './_children/summary'
import * as S from './styled'
import PromoBanner from './_children/promo-banner'
import CheckSuscription from './_children/check-suscriptor'
import { PixelActions, sendAction } from '../../../_dependencies/analitycs'
import { interpolateUrl } from '../../../_dependencies/domains'
import PWA from '../../_dependencies/seed-pwa'

function WizardPlan(props) {
  const {
    theme,
    memo: { plans, summary, printedSubscriber, error },
    onBeforeNextStep = (res, goNextStep) => goNextStep(),
    setLoading,
  } = props

  const {
    arcSite,
    siteProperties: {
      paywall: { urls },
    },
  } = useFusionContext()

  const msgs = useStrings()

  const [activePlan, setActivePlan] = useState()
  const [openModal, setOpenModal] = useState(false)
  const origin = useRef('organico')
  const referer = useRef('')

  useEffect(() => {
    origin.current =
      window.sessionStorage.getItem('paywall_type_modal') || 'organico'
    referer.current = window.sessionStorage.getItem('paywall_last_url')
    sendAction(PixelActions.PAYMENT_PLAN, {
      referer: referer.current,
      medioCompra: origin.current,
      suscriptorImpreso: !!printedSubscriber ? 'si' : 'no',
      pwa: PWA.isPWA() ? 'si' : 'no',
    })
    document.getElementById('footer').style.position = 'relative'
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
      {error && <S.Error>{error}</S.Error>}
      {printedSubscriber && (
        <S.Markdown>{msgs.welcomePrintedSubscriptor}</S.Markdown>
      )}
      <S.Wrap>
        <Summary elevation={1} {...summary} />
        <S.WrapPlan>
          {arcSite === 'elcomercio' && (
            <S.Cintillo>{msgs.offerHeadBand}</S.Cintillo>
          )}
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
                  arcSite={arcSite}
                />
              )
            })}
          </S.Plans>
        </S.WrapPlan>
      </S.Wrap>
      <CheckSuscription
        open={openModal}
        onSubmit={({ documentType, documentNumber, attemptToken }) => {
          window.location.href = interpolateUrl(urls.validateSubscriptor, {
            documentType,
            documentNumber,
            attemptToken,
          })
        }}
        onClose={() => {
          setOpenModal(false)
        }}
      />
      {!printedSubscriber && (
        <S.ContentBanner>
          <PromoBanner
            width="60%"
            fullWidth={arcSite === 'elcomercio'}
            text1={msgs.printedSubscriptorBanner1}
            text2={msgs.printedSubscriptorBanner2}
            image={arcSite === 'elcomercio' && theme.images.lector_png}
            backgroundColor={
              arcSite === 'elcomercio'
                ? theme.palette.secondary.main
                : theme.palette.primary.light
            }
            showImage={arcSite === 'elcomercio'}
            onClick={() => {
              setOpenModal(true)
            }}
          />
          {arcSite !== 'elcomercio' && (
            <PromoBanner
              width="40%"
              ml="20px"
              backgroundColor={theme.palette.terciary.light}
              text1={msgs.businessSubscriptionsBanner1}
              text2={msgs.businessSubscriptionsBanner2}
              invertTextSizes
              onClick={() => {
                window.location.href = interpolateUrl(urls.corporateSuscription)
              }}
            />
          )}
        </S.ContentBanner>
      )}
    </S.WizardPlan>
  )
}

export default withTheme(WizardPlan)
