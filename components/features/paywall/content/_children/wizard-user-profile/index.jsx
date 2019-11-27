/* eslint-disable no-extra-boolean-cast */
import React, { useState, useEffect } from 'react'
import { useFusionContext } from 'fusion:context'
import * as Sentry from '@sentry/browser'
import UserProfile from './_children/user-profile'
import Summary from '../summary'
import * as S from './styled'
import { PixelActions, sendAction } from '../../../_dependencies/analitycs'
import addSales from '../../../_dependencies/sales'
import { deepMapValues } from '../../../_dependencies/utils'
import Errors from '../../../_dependencies/errors'
import PWA from '../../_dependencies/seed-pwa'
import { useStrings } from '../../../_children/contexts'

function WizardUserProfile(props) {
  const msgs = useStrings()
  const {
    memo,
    formName,
    onBeforeNextStep = (res, goNextStep) => goNextStep(),
    setLoading,
  } = props

  const {
    summary,
    printedSubscriber,
    plan,
    profile,
    referer,
    origin,
    event,
  } = memo

  const { sku, priceCode, billingFrequency } = plan

  const sanitizeValues = (value, key) => {
    if (key === 'documentType') {
      switch (value) {
        case 'CEX':
        case 'CDI':
          return value
        default:
          return 'DNI'
      }
    }
    return typeof value === 'string'
      ? value.trim().replace(/undefined|null/i, '')
      : value
  }
  const sanitizedProfile = deepMapValues(profile, sanitizeValues)

  useEffect(() => {
    dataLayer.push({
      event: 'checkoutOption',
      ecommerce: {
        checkout_option: {
          actionField: { step: 2 },
        },
      },
    })
    sendAction(PixelActions.PAYMENT_PROFILE, {
      sku: `${sku}`,
      periodo: billingFrequency,
      referer,
      medioCompra: origin,
      priceCode,
      suscriptorImpreso: !!printedSubscriber ? 'si' : 'no',
      pwa: PWA.isPWA() ? 'si' : 'no',
    })
  }, [])

  const [error, setError] = useState()

  const { arcSite } = useFusionContext()
  const Sales = addSales(arcSite)

  function onSubmitHandler(values, { setSubmitting }) {
    const {
      email,
      phone,
      billingAddress,
      firstName,
      lastName,
      secondLastName,
    } = values
    setError(false)
    setLoading(true)

    Sentry.addBreadcrumb({
      category: 'compra',
      message: 'Valores en formulario de perfil de pago',
      data: values,
      level: Sentry.Severity.Info,
    })

    const selectedPlan = {
      sku,
      priceCode,
      quantity: 1,
    }

    Sales.then(sales =>
      sales
        .clearCart()
        .then(() => sales.addItemToCart([selectedPlan]))
        .then(() =>
          sales.createOrder(
            email,
            phone,
            billingAddress,
            firstName,
            lastName,
            secondLastName
          )
        )
        .then(res => {
          // TODO: validar respuesta y mostrar errores de API
          setLoading(false)
          setSubmitting(false)
          // Mezclamos valores del formulario con los valores de la respuesta
          const mergeResValues = Object.assign({}, memo, {
            order: res,
            profile: { ...profile, ...values },
          })
          Sentry.addBreadcrumb({
            category: 'compra',
            message: 'Orden de compra generada',
            data: {
              response: { ...res, items: JSON.stringify(res.items, null, 2) },
            },
            level: Sentry.Severity.Info,
          })
          onBeforeNextStep(mergeResValues, props)
        })
        .catch(e => {
          Sentry.captureException(e)
          setError(Errors.getMessage(e.code))
          setLoading(false)
          setSubmitting(false)
        })
    )
  }

  return (
    <S.WizardUserProfile>
      <S.PanelUserProfile type="content" valing="jc-center">
        <UserProfile
          name={formName}
          printedSubscriber={printedSubscriber}
          initialValues={sanitizedProfile}
          onSubmit={onSubmitHandler}
          title={msgs.insertPersonalInfo}
          error={error}
        />
      </S.PanelUserProfile>
      <Summary plan={plan} summary={summary} event={event} arcSite={arcSite} />
    </S.WizardUserProfile>
  )
}

export default WizardUserProfile
