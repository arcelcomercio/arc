/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable no-extra-boolean-cast */
/* global dataLayer fbq */
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
import { conformProfile, isLogged } from '../../../_dependencies/Identity'
import { interpolateUrl } from '../../../_dependencies/domains'
import PWA from '../../_dependencies/seed-pwa'

function WizardPlan(props) {
  const {
    theme,
    memo: {
      event: eventCampaign,
      plans,
      description: productDescription,
      summary,
      printedSubscriber,
      error,
    },
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
  const subscribingCorporate = React.useRef(false)
  const planSelected = React.useRef()

  const runDeferredAction = () => {
    switch (true) {
      case checkingPrinted.current:
        setOpenModal(true)
        break
      case subscribingCorporate.current:
        onCorporateSubscriptorHandler()
        break
      case !!planSelected.current:
        subscribePlanHandler(null, planSelected.current)
        break
      default:
    }
  }

  const clearDeferredActions = React.useRef(() => {
    subscribingCorporate.current = false
    checkingPrinted.current = false
    planSelected.current = undefined
  }).current

  const loggedHandler = React.useRef(profile => {
    setProfile(profile)
  }).current

  const logoutHandler = React.useRef(() => {
    clearDeferredActions()
    setProfile()
  }).current

  const loginCanceledHandler = React.useRef(() => {
    clearDeferredActions()
  }).current

  const loginFailed = React.useRef(() => {
    clearDeferredActions()
  }).current

  // Ejecutar acciones diferidas al cambiar estado de sesion
  useEffect(() => {
    runDeferredAction()
    clearDeferredActions()
  }, [profile])

  useEffect(() => {
    origin.current =
      window.sessionStorage.getItem('paywall_type_modal') || 'organico'
    referer.current = window.sessionStorage.getItem('paywall_last_url')
    dataLayer.push({
      event: 'checkoutOption',
      ecommerce: {
        checkout_option: {
          actionField: { step: 1 },
        },
      },
    })
    sendAction(PixelActions.PAYMENT_PLAN, {
      referer: referer.current,
      medioCompra: origin.current,
      suscriptorImpreso: !!printedSubscriber ? 'si' : 'no',
      pwa: PWA.isPWA() ? 'si' : 'no',
    })
    fbq(
      'track',
      'Lead'
      // {
      //   content_category: "",
      //   content_name: "",
      //   currency: "",
      //   value: "",
      // }
    )

    // if (document.getElementById('footer')) {
    //   document.getElementById('footer').style.position = 'relative'
    // }

    // Retomar sesion existente si hay una
    if (isLogged()) {
      window.Identity.options({ apiOrigin: interpolateUrl(urls.originApi) })
      window.Identity.getUserProfile().then(profile => {
        const conformedProfile = conformProfile(profile)
        setProfile(conformedProfile)
      })
    }

    addEventListener('logged', loggedHandler)
    addEventListener('logout', logoutHandler)
    addEventListener('loginCanceled', loginCanceledHandler)
    addEventListener('loginFailed', loginFailed)

    return () => {
      removeEventListener('logged', loggedHandler)
      removeEventListener('logout', logoutHandler)
      removeEventListener('loginCanceled', loginCanceledHandler)
      removeEventListener('loginFailed', loginFailed)
    }
  }, [])

  const subscribePlanHandler = (e, plan) => {
    if (!isLogged()) {
      clearDeferredActions()
      planSelected.current = plan
      dispatchEvent('signInReq', 'landing')
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
      dataLayer.push({
        event: 'productClick',
        ecommerce: {
          click: {
            products: [
              {
                name: plan.productName,
                id: plan.sku,
                price: plan.amount,
                brand: arcSite,
                category: plan.name,
                subCategory: plan.billingFrequency,
              },
            ],
          },
        },
      })
      fbq('track', 'InitiateCheckout', {
        content_category: plan.name,
        content_ids: [plan.sku],
        contents: [{ id: plan.sku, quantity: 1 }],
        currency: 'PEN',
        num_items: 1,
        value: plan.amount,
      })
      dataLayer.push({
        event: 'checkout',
        ecommerce: {
          checkout: {
            actionField: { step: 1 },
            products: [
              {
                name: plan.productName,
                id: plan.sku,
                price: plan.amount,
                brand: arcSite,
                category: plan.name,
                subCategory: plan.billingFrequency,
              },
            ],
          },
        },
      })
      setTimeout(() => {
        setLoading(false)
        onBeforeNextStep(
          {
            plan,
            profile,
            origin: origin.current,
            referer: referer.current,
          },
          props
        )
      }, 1000)
    }
  }

  const onCorporateSubscriptorHandler = () => {
    window.open(interpolateUrl(urls.corporateSuscription), '_blank')
  }

  return (
    <S.WizardPlan>
      {error && <S.Error>{error}</S.Error>}
      {printedSubscriber && (
        <S.Markdown>{msgs.welcomePrintedSubscriptor}</S.Markdown>
      )}
      <S.Wrap col={eventCampaign}>
        <Summary
          backgroundColor={
            arcSite === 'elcomercio'
              ? theme.palette.primary.main
              : lighten(theme.palette.primary.main, 0.8)
          }
          elevation={1}
          {...summary}
        />
        <S.WrapPlan col={eventCampaign}>
          {productDescription.mainBanner && (
            <S.Cintillo>{productDescription.mainBanner}</S.Cintillo>
          )}
          <S.Plans>
            {plans.map((plan, idx) => {
              const { priceCode, banner } = plan
              const marginTop =
                arcSite === 'elcomercio' && !eventCampaign ? '20px' : '40px'
              return (
                <CardPrice
                  active={
                    activePlan === priceCode || (!activePlan && idx === 0)
                  }
                  overrides
                  event={eventCampaign}
                  marginTop={marginTop}
                  offer={banner}
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
            //...(eventCampaign ? { isEvent: true, event: eventCampaign } : {}),
          })
        }}
        onClose={() => {
          clearDeferredActions()
          window.dataLayer.push({
            event: 'paywall_check_subscriptor',
            eventCategory: 'paywall_check_subscriptor',
            eventAction: 'close',
          })
          setOpenModal(false)
        }}
      />
      {!printedSubscriber && (
        <S.ContentBanner>
          <PromoBanner
            width={eventCampaign ? '100%' : '60%'}
            event={eventCampaign}
            marginTop={arcSite === 'elcomercio' ? '14px' : '30px'}
            fullWidth={arcSite === 'elcomercio'}
            text={
              eventCampaign
                ? msgs.eventSubscriptorBannerText
                : msgs.printedSubscriptorBannerText
            }
            image={arcSite === 'elcomercio' && theme.images.lector}
            backgroundColor={
              arcSite === 'elcomercio'
                ? theme.palette.secondary.main
                : theme.palette.primary.light
            }
            showImage={arcSite === 'elcomercio'}
            onClick={() => {
              if (!isLogged()) {
                clearDeferredActions()
                checkingPrinted.current = true
                dispatchEvent('signInReq', 'landing')
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

          {arcSite === 'gestion' && (
            <>
              {!eventCampaign && (
                <PromoBanner
                  width="40%"
                  ml="20px"
                  backgroundColor={theme.palette.terciary.light}
                  text={msgs.businessSubscriptionsBannerText}
                  onClick={onCorporateSubscriptorHandler}
                />
              )}
            </>
          )}
        </S.ContentBanner>
      )}
    </S.WizardPlan>
  )
}

export default withTheme(WizardPlan)
