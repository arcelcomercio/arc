import React, { useState, useEffect } from 'react'
import * as Sentry from '@sentry/browser'
import { ENVIRONMENT } from 'fusion:environment'
import UserProfile from './_children/user-profile'
import Summary from '../summary'
import * as S from './styled'
import { PixelActions, sendAction } from '../../../_dependencies/analitycs'
import { addSales } from '../../../_dependencies/sales'
import { parseQueryString } from '../../../../../utilities/helpers'
import { deepMapValues } from '../../../_dependencies/utils'
import Errors from '../../../_dependencies/errors'

const isProd = ENVIRONMENT === 'elcomercio'

function WizardUserProfile(props) {
  const {
    memo,
    summary,
    profile,
    onBeforeNextStep = (res, goNextStep) => goNextStep(),
    setLoading,
  } = props

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

  const {
    plan: { sku, printed, priceCode, amount, description, billingFrequency },
  } = memo

  useEffect(() => {
    sendAction(PixelActions.PAYMENT_PROFILE, {
      sku: `${sku}${priceCode}`,
      periodo: billingFrequency,
      priceCode,
      suscriptorImpreso: printed ? 'si' : 'no',
    })
  }, [])

  const [error, setError] = useState()
  const Sales = addSales()

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

    Sales.then(sales =>
      sales
        .createOrder(
          email,
          phone,
          billingAddress,
          firstName,
          lastName,
          secondLastName
        )
        .then(res => {
          // TODO: validar respuesta y mostrar errores de API
          setLoading(false)
          setSubmitting(false)
          // Mezclamos valores del formulario con los valores de la respuesta
          const mergeResValues = Object.assign({}, memo, {
            order: res,
            profile: values,
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
        {sanitizedProfile && (
          <UserProfile
            initialValues={sanitizedProfile}
            onSubmit={onSubmitHandler}
            title="Ingrese sus datos"
            error={error}
          />
        )}
      </S.PanelUserProfile>
      <Summary
        amount={amount}
        billingFrequency={billingFrequency}
        description={description}
        summary={summary}
      />
    </S.WizardUserProfile>
  )
}

export default WizardUserProfile
