/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-shadow */
import { useFusionContext } from 'fusion:context'
import { ENVIRONMENT } from 'fusion:environment'
import React, { useState, useEffect } from 'react'
import * as Sentry from '@sentry/browser'
import removeAccents from 'remove-accents'

import Summary from '../summary'
import * as S from './styled'
import FormPay from './_children/form-pay'
import { PixelActions, sendAction } from '../../../_dependencies/analitycs'
import { useStrings } from '../../../_children/contexts'
import addSales from '../../../_dependencies/sales'
import addPayU from '../../../_dependencies/payu'
import { PayuError } from '../../_dependencies/handle-errors'
import { getBrowser } from '../../../_dependencies/browsers'

import PWA from '../../_dependencies/seed-pwa'

import Errors from '../../../_dependencies/errors'

const isProd = ENVIRONMENT === 'elcomercio'

export function parseQueryString(str) {
  if (typeof str !== 'string' || str.length === 0) return {}
  const s = str.replace(/^\?/, '').split('&')
  const sLength = s.length
  let bit
  const query = {}
  let first
  let second
  for (let i = 0; i < sLength; i++) {
    bit = s[i].split('=')
    first = decodeURIComponent(bit[0])
    if (first.length === 0) continue
    second = decodeURIComponent(bit[1])
    if (typeof query[first] === 'undefined') query[first] = second
    else if (query[first] instanceof Array) query[first].push(second)
    else query[first] = [query[first], second]
  }
  return query
}

function WizardPayment(props) {
  const msgs = useStrings()
  const {
    memo,
    formName,
    onBeforeNextStep = (res, goNextStep) => goNextStep(),
    setLoading,
  } = props
  const {
    summary,
    plan,
    order,
    profile,
    printedSubscriber,
    referer,
    origin,
    event,
  } = memo
  const { firstName, lastName, secondLastName, documentNumber } = profile
  const { orderNumber } = order
  const { sku, priceCode, billingFrequency } = plan
  profile.printed = !!printedSubscriber

  useEffect(() => {
    dataLayer.push({
      event: 'checkoutOption',
      ecommerce: {
        checkout_option: {
          actionField: { step: 3 },
        },
      },
    })
    sendAction(PixelActions.PAYMENT_CARD_INFO, {
      sku: `${sku}`,
      referer,
      medioCompra: origin,
      periodo: billingFrequency,
      priceCode,
      suscriptorImpreso: printedSubscriber ? 'si' : 'no',
      pwa: PWA.isPWA() ? 'si' : 'no',
    })
  }, [])

  const [error, setError] = useState('')

  const fusionContext = useFusionContext()
  const { arcSite } = fusionContext
  const Sales = addSales(arcSite)

  const onSubmitHandler = (values, { setSubmitting }) => {
    setLoading(true)
    const { cvv, cardMethod, expiryDate, cardNumber } = values
    let payUPaymentMethod

    Sentry.addBreadcrumb({
      category: 'compra',
      message: 'Valores en formulario de pago',
      data: values,
      level: Sentry.Severity.Info,
    })

    Sales.then(sales => {
      return sales
        .getPaymentOptions()
        .then(res => {
          if (res.code) {
            throw new Error(Errors.getMessage(res.code))
          }
          payUPaymentMethod = res.find(m => m.paymentMethodType === 8)
          const { paymentMethodID } = payUPaymentMethod
          return sales.initializePayment(orderNumber, paymentMethodID)
        })
        .then(res => {
          if (res.code) {
            throw new Error(Errors.getMessage(res.code))
          }

          const {
            parameter1: publicKey,
            parameter2: accountId,
            parameter3: payuBaseUrl,
            parameter4: deviceSessionId,
          } = res

          Sentry.addBreadcrumb({
            category: 'compra',
            message: 'Pago inicializado',
            data: {
              publicKey,
              accountId,
              payuBaseUrl,
              deviceSessionId,
            },
            level: Sentry.Severity.Info,
          })

          const ownerName = `${firstName} ${lastName} ${secondLastName}`.trim()

          const expiryMonth = expiryDate.split('/')[0]
          const expiryYear = expiryDate.split('/')[1]

          let cardName = ownerName
          const { qa } = parseQueryString(window.location.search)
          if (!isProd) cardName = qa ? firstName : 'APPROVED'
          cardName = removeAccents(cardName)

          Sentry.addBreadcrumb({
            category: 'compra',
            message: `CardName ${
              !isProd && qa ? '(QA)' : !isProd ? '(Sandbox)' : '(Prod)'
            } : ${cardName}`,
            level: Sentry.Severity.Info,
          })

          return addPayU(arcSite, deviceSessionId)
            .then(payU => {
              payU.setURL(payuBaseUrl)
              payU.setPublicKey(publicKey)
              payU.setAccountID(accountId)
              payU.setListBoxID('mylistID')
              payU.getPaymentMethods()
              payU.setLanguage('es')
              payU.setCardDetails({
                number: cardNumber,
                name_card: cardName,
                payer_id: documentNumber,
                exp_month: expiryMonth,
                exp_year: expiryYear,
                method: cardMethod.toUpperCase(),
                document: documentNumber,
                cvv,
              })
              return new Promise((resolve, reject) => {
                payU.createToken(response => {
                  if (response.error) {
                    reject(new PayuError(response.error))
                    setLoading(false)
                  } else {
                    resolve(response.token)
                  }
                })
              })
            })
            .then(token => {
              Sentry.addBreadcrumb({
                category: 'compra',
                message: 'Token PayU',
                data: { token },
                level: Sentry.Severity.Info,
              })
              return token
            })
            .then(token => {
              const { paymentMethodID, paymentMethodType } = payUPaymentMethod
              const sandboxToken = `${token}~${deviceSessionId}~${cvv}`
              Sentry.addBreadcrumb({
                category: 'compra',
                message: 'Token enviado a Arc',
                data: { token: sandboxToken },
                level: Sentry.Severity.Info,
              })
              return sales
                .finalizePayment(orderNumber, paymentMethodID, sandboxToken)
                .then(res => {
                  if (res.code) {
                    const screenError = new Error(Errors.getMessage(res.code))
                    const internalError = new Error(res.message)
                    internalError.code = res.code
                    Sentry.captureException(internalError)
                    throw screenError
                  }
                  Sentry.addBreadcrumb({
                    category: 'compra',
                    message: 'Pago finalizado',
                    data: res,
                    level: Sentry.Severity.Info,
                  })
                  const { status, total, subscriptionIDs } = res
                  if (status !== 'Paid') {
                    throw new Error(msgs.paymentFail)
                  }
                  return {
                    publicKey,
                    accountId,
                    payuBaseUrl,
                    deviceSessionId,
                    paymentMethodID,
                    paymentMethodType,
                    subscriptionIDs,
                    status,
                    total,
                  }
                })
            })
        })
    })
      .then(res => {
        const stepResults = {
          payment: res,
          cardInfo: values,
        }
        onBeforeNextStep(stepResults, props)
        if (getBrowser().isSafari) {
          setLoading(false)
        }
      })
      .catch(e => {
        const { name, message } = e
        dataLayer.push({
          event: 'failedTransaction',
          ecommerce: {
            failedTransaction: {
              actionField: { id: orderNumber },
            },
          },
        })
        switch (name) {
          case 'payU':
            setError(message)
            break
          default:
            setError('Disculpe, ha ocurrido un error durante el pago')
        }
        Sentry.captureEvent({
          message: e.message,
          level: 'error',
          extra: e,
        })
      })
      .finally(() => {
        setLoading(false)
        setSubmitting(false)
      })
  }

  return (
    <S.WizardPayment>
      <S.PanelPayment type="content" valing="jc-center">
        <FormPay
          name={formName}
          initialValues={{
            agreed: null,
            cardMethod: null,
            cardNumber: null,
            cvv: null,
            expiryDate: null,
          }}
          error={error}
          onSubmit={onSubmitHandler}
        />
      </S.PanelPayment>
      <Summary plan={plan} summary={summary} event={event} arcSite={arcSite} />
    </S.WizardPayment>
  )
}

export default WizardPayment
