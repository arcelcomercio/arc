/* eslint-disable no-nested-ternary */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable no-extra-boolean-cast */
/* global dataLayer fbq Identity */
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
import ConfirmSubscription from './_children/confirm-subscription'
import { LogIntoAccountEventTag } from '../../../_children/fb-account-linking'
import { PixelActions, sendAction } from '../../../_dependencies/analitycs'
import { conformProfile, isLogged } from '../../../_dependencies/Identity'
import { interpolateUrl } from '../../../_dependencies/domains'
import { getBrowser } from '../../../_dependencies/browsers'
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
      fromFia,
      error: serverError,
    },
    onBeforeNextStep = (res, goNextStep) => goNextStep(),
    setLoading,
    dispatchEvent = i => i,
    addEventListener = i => i,
    removeEventListener = i => i,
  } = props

  const [error, setError] = useState()

  const { lighten } = theme.palette

  const {
    arcSite,
    siteProperties: {
      paywall: { urls },
    },
  } = useFusionContext()

  const msgs = useStrings()

  const [activePlan, setActivePlan] = useState()
  const [openCheckPrintedModal, setOpenCheckPrintedModal] = useState(false)
  const [
    openConfirmSubscriptionModal,
    setOpenConfirmSubscriptionModal,
  ] = useState(false)
  const [profile, setProfile] = useState()
  const origin = useRef('organico')
  const referer = useRef('')
  const justLogged = useRef()

  // Deferred actions
  const checkingPrinted = React.useRef(false)
  const subscribingCorporate = React.useRef(false)
  const planSelected = React.useRef()

  const runDeferredAction = () => {
    switch (true) {
      case checkingPrinted.current:
        clearDeferredActions()
        setOpenCheckPrintedModal(true)
        break
      case subscribingCorporate.current:
        clearDeferredActions()
        onCorporateSubscriptorHandler()
        break
      case !!planSelected.current:
        const plan = planSelected.current
        clearDeferredActions()
        subscribePlanHandler(null, plan)
        break
      default:
    }
  }

  const clearDeferredActions = React.useRef(() => {
    subscribingCorporate.current = false
    checkingPrinted.current = false
    planSelected.current = undefined
  }).current

  // Promesa de que el usuario tiene suscripciones activas, para prevenirle
  // de comprar nuevamente
  const hasSubscriptionsPromise = useRef()

  const loggedHandler = React.useRef(profile => {
    setProfile(profile)
    justLogged.current = true
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

  // Verificar si usuario tiene suscripciones activas para prevenirle en caso
  // de intentar suscribirse nuevamente
  useEffect(() => {
    if (isLogged()) {
      hasSubscriptionsPromise.current = window.Identity.extendSession().then(
        ({ accessToken }) => {
          const entitlementsUrl = interpolateUrl(
            `${urls.originApi}${urls.arcEntitlements}`
          )
          return fetch(entitlementsUrl, {
            headers: {
              Authorization: accessToken,
            },
          })
            .then(response => response.json())
            .then(res => {
              return Array.isArray(res.skus) && res.skus.length > 0
            })
            .catch(() => {
              throw new Error('Non 200 http response')
            })
        }
      )
    } else {
      hasSubscriptionsPromise.current = undefined
    }

    // Ejecutar acciones diferidas al cambiar estado de sesion
    runDeferredAction()
  }, [profile])

  useEffect(() => {
    const browser = getBrowser()
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
    fbq('track', 'ViewPaywall', {
      surface: fromFia ? 'fia' : browser.isFbBrowser ? 'mWeb' : 'nonApp',
      // meter_count: ""
    })
    fbq('track', 'ViewContent', {
      content_category: plans[0].productName,
      content_ids: [plans[0].sku],
      contents: [{ id: plans[0].sku, quantity: 1 }],
      currency: 'PEN',
      num_items: 1,
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
      // Antes de continuar con el flujo de compra, verificamos
      // si el usuario ya tiene suscripcion activa
      hasSubscriptionsPromise.current
        .then(hasSubscription => {
          if (hasSubscription) {
            // Diferimos la seleccion de plan nuevamente
            planSelected.current = plan
            // Ya tiene suscripcion, prevenimos al usuario de hacer otra compra
            // setError('Ya tiene una suscripción activa')
            setOpenConfirmSubscriptionModal(true)
          } else {
            // No tiene suscripcion activa continuar con el flujo de compra
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
              content_ids: [plan.priceCode],
              contents: [{ id: plan.priceCode, quantity: 1 }],
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
        })
        .catch(e => {
          setError(
            'Disculpe ha ocurrido un error inesperado. Intente de nuevo mas tarde.'
          )
        })
    }
  }

  const onCorporateSubscriptorHandler = () => {
    window.open(interpolateUrl(urls.corporateSuscription), '_blank')
  }

  return (
    <S.WizardPlan>
      {(serverError || error) && <S.Error>{serverError || error}</S.Error>}
      {justLogged.current && (
        <LogIntoAccountEventTag subscriptionId={Identity.userIdentity.uuid} />
      )}
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
      <ConfirmSubscription
        open={openConfirmSubscriptionModal}
        content={msgs.isSubscriber}
        linkText="Mi Perfil"
        question={msgs.qContinue}
        footer={msgs.askSupport}
        onConfirm={() => {
          // Hacemos como si no tuviese otra suscripcion activa
          // y avanzamos en el flujo
          setOpenConfirmSubscriptionModal(false)
          hasSubscriptionsPromise.current = Promise.resolve(false)
          runDeferredAction()
        }}
        onCancel={() => {
          // No avanzar en el flujo si el usuario cancela
          clearDeferredActions()
          setOpenConfirmSubscriptionModal(false)
        }}
        linkProfile={interpolateUrl(urls.profileSignwall)}
      />
      <CheckSuscription
        open={openCheckPrintedModal}
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
          setOpenCheckPrintedModal(false)
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
                setOpenCheckPrintedModal(true)
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
