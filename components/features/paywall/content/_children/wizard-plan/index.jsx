/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
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
    memo: { event: eventCampaign, plans, summary, printedSubscriber, error },
    onBeforeNextStep = (res, goNextStep) => goNextStep(),
    setLoading,
    dispatchEvent = i => i,
    addEventListener = i => i,
    removeEventListener = i => i,
  } = props

  const { lighten } = theme.palette

  const {
    arcSite,
    siteProperties: {
      paywall: { urls },
    },
  } = useFusionContext()

  const msgs = useStrings()

  const [activePlan, setActivePlan] = useState()
  const [openModal, setOpenModal] = useState(false)
  const [profile, setProfile] = useState()
  const origin = useRef('organico')
  const referer = useRef('')

  // Deferred actions
  const checkingPrinted = React.useRef(false)
  const planSelected = React.useRef()

  const runDeferredAction = React.useRef(() => {
    switch (true) {
      case checkingPrinted.current:
        setOpenModal(true)
        break
      case planSelected.current:
        subscribePlanHandler(null, planSelected.current)
        break
      default:
    }
  }).current

  const clearDeferredActions = React.useRef(() => {
    checkingPrinted.current = false
    planSelected.current = undefined
  }).current

  const loggedHandler = React.useRef(profile => {
    runDeferredAction()
    clearDeferredActions()
    setProfile(profile)
  }).current

  const logoutHandler = React.useRef(() => {
    clearDeferredActions()
    setProfile()
  }).current

  const loginFailed = React.useRef(() => {
    clearDeferredActions()
  }).current

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

    addEventListener('logged', loggedHandler)
    addEventListener('logout', logoutHandler)
    addEventListener('loginFailed', loginFailed)

    return () => {
      removeEventListener('logged', loggedHandler)
      removeEventListener('logout', logoutHandler)
      removeEventListener('loginFailed', loginFailed)
    }
  }, [])

  function subscribePlanHandler(e, plan) {
    if (!profile) {
      planSelected.current = plan
      dispatchEvent('signInReq')
    } else {
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

      setTimeout(() => {
        setLoading(false)
        onBeforeNextStep(
          {
            plan,
            origin: origin.current,
            referer: referer.current,
          },
          props
        )
      }, 1000)
    }
  }

  return (
    <S.WizardPlan>
      {error && <S.Error>{error}</S.Error>}
      {printedSubscriber && (
        <S.Markdown>{msgs.welcomePrintedSubscriptor}</S.Markdown>
      )}
      <S.Wrap>
        <Summary
          backgroundColor={
            arcSite === 'elcomercio'
              ? theme.palette.primary.main
              : lighten(theme.palette.primary.main, 0.8)
          }
          elevation={1}
          {...summary}
        />
        <S.WrapPlan>
          {arcSite === 'elcomercio' && (
            <S.Cintillo>{msgs.offerHeadBand}</S.Cintillo>
          )}
          <S.Plans>
            {plans.map((plan, idx) => {
              const { priceCode, billingFrequency, amount } = plan
              const marginTop = arcSite === 'elcomercio' ? '20px' : '40px'
              const hasOffer =
                arcSite !== 'elcomercio' &&
                billingFrequency === 'Month' &&
                amount !== 0
              return (
                <CardPrice
                  active={
                    activePlan === priceCode || (!activePlan && idx === 0)
                  }
                  marginTop={marginTop}
                  offer={hasOffer && msgs.offerHeadBand}
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
          window.dataLayer.push({
            event: 'paywall_check_subscriptor',
            eventCategory: 'paywall_check_subscriptor',
            eventAction: 'submit',
          })

          window.location.href = interpolateUrl(urls.digitalSubscriptions, {
            isCheckingSubscriptor: true,
            documentType,
            documentNumber,
            attemptToken,
            ...(eventCampaign ? { isEvent: true, event: eventCampaign } : {}),
          })
          console.log(window.location.href)
        }}
        onClose={() => {
          window.dataLayer.push({
            event: 'paywall_check_subscriptor',
            eventCategory: 'paywall_check_subscriptor',
            eventAction: 'close',
          })
          sendAction(PixelActions.CHECK_SUBSCRIPTOR_CLOSE)
          setOpenModal(false)
        }}
      />
      {!printedSubscriber && (
        <S.ContentBanner>
          <PromoBanner
            width="60%"
            marginTop={arcSite === 'elcomercio' ? '14px' : '30px'}
            fullWidth={arcSite === 'elcomercio'}
            text1={msgs.printedSubscriptorBanner1}
            text2={msgs.printedSubscriptorBanner2}
            image={arcSite === 'elcomercio' && theme.images.lector}
            backgroundColor={
              arcSite === 'elcomercio'
                ? theme.palette.secondary.main
                : theme.palette.primary.light
            }
            showImage={arcSite === 'elcomercio'}
            onClick={() => {
              if (!profile) {
                checkingPrinted.current = true
                dispatchEvent('signInReq')
              } else {
                window.dataLayer.push({
                  event: 'paywall_check_subscriptor',
                  eventCategory: 'paywall_check_subscriptor',
                  eventAction: 'open',
                })
                setOpenModal(true)
              }
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
                window.open(interpolateUrl(urls.corporateSuscription), '_blank')
              }}
            />
          )}
        </S.ContentBanner>
      )}
    </S.WizardPlan>
  )
}

export default withTheme(WizardPlan)
