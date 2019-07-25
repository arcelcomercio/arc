/* eslint-disable no-shadow */
import React, { useState } from 'react'
import styled from 'styled-components'
import { useFusionContext } from 'fusion:context'

import Panel from '../../../_children/panel'
import Summary from '../summary'
import * as S from './styled'
import FormPay from './_children/form-pay'
import { devices } from '../../../_dependencies/devices'
import { addSales } from '../../../_dependencies/sales'
import { addPayU } from '../../../_dependencies/payu'

const PanelPayment = styled(Panel)`
  @media (${devices.mobile}) {
    margin-top: 30px;
    padding: 18px 30px;
    box-sizing: border-box;
    max-width: 100vw;
  }
  @media ${devices.tablet} {
    margin-top: 30px;
    padding: 18px 30px;
    box-sizing: border-box;
  }
`

const MESSAGE = {
  PAYMENT_FAIL: 'Ha ocurrido un problema durante el pago',
}

function WizardPayment(props) {
  const {
    memo,
    summary,
    onBeforeNextStep = (res, goNextStep) => goNextStep(),
  } = props

  const {
    plan: {
      sku,
      priceCode,
      campaignCode,
      amount,
      billingFrequency,
      description,
    },
    order: { orderNumber },
    profile: {
      firstName,
      lastName,
      secondLastName,
      documentNumber,
      documentType,
      phone,
      email,
    },
  } = memo

  const [error, setError] = useState('')

  const fusionContext = useFusionContext()
  const { siteProperties } = fusionContext
  const Sales = addSales(siteProperties)

  function apiPaymentRegister({
    baseUrl,
    orderNumber,
    firstName,
    lastName,
    secondLastName,
    documentType,
    documentNumber,
    email,
    phone,
    cardMethod,
    cardNumber,
    token,
    sku,
    priceCode,
    amount,
  }) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: 'Token deb904a03a4e31d420a014534514b8cc8ca4d111',
      'user-token': Identity.userIdentity.accessToken,
    })
    const response = new Promise(resolve => {
      fetch(`${baseUrl}/api/payment/register-pending/`, {
        method: 'POST',
        body: JSON.stringify({
          order: orderNumber,
          total: amount,
          profile: {
            name: firstName,
            lastname: lastName,
            lastname_mother: secondLastName,
            doc_type: documentType,
            doc_number: documentNumber,
            email,
            phone,
          },
          card: {
            method: cardMethod.toUpperCase(),
            number: cardNumber,
            token,
          },
          product: [
            {
              sku,
              price_code: priceCode,
              amount,
            },
          ],
        }),
        headers,
      }).then(res => {
        return resolve(res.json())
      })
    })

    return response
  }

  const onSubmitHandler = (values, { setSubmitting }) => {
    const { cvv, cardMethod, expiryDate, cardNumber } = values
    let payUPaymentMethod
    Sales.then(sales => {
      return sales
        .getPaymentOptions()
        .then(paymentMethods => {
          payUPaymentMethod = paymentMethods.find(
            m => m.paymentMethodType === 8
          )
          const { paymentMethodID } = payUPaymentMethod
          return sales.initializePayment(orderNumber, paymentMethodID)
        })
        .then(
          ({
            parameter1: publicKey,
            parameter2: accountId,
            parameter3: payuBaseUrl,
            parameter4: deviceSessionId,
          }) => {
            const ownerName = `${firstName} ${lastName} ${secondLastName}`.trim()
            const expiryMonth = expiryDate.split('/')[0]
            const expiryYear = expiryDate.split('/')[1]

            return (
              addPayU(siteProperties)
                .then(payU => {
                  payU.setURL(payuBaseUrl)
                  payU.setPublicKey(publicKey)
                  payU.setAccountID(accountId)
                  payU.setListBoxID('mylistID')
                  payU.getPaymentMethods()
                  payU.setLanguage('es')
                  payU.setCardDetails({
                    number: cardNumber,
                    name_card: ownerName,
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
                        reject(new Error(response.error))
                        setSubmitting(false)
                      } else {
                        resolve(response.token)
                      }
                    })
                  })
                })
                // TODO: El servicio aun esta en desarrollo
                .then(token => {
                  return apiPaymentRegister({
                    baseUrl: '//devpaywall.comerciosuscripciones.pe', // TODO url en duro, environment no funciona
                    orderNumber,
                    firstName,
                    lastName,
                    secondLastName,
                    documentType,
                    documentNumber,
                    email,
                    phone,
                    cardMethod,
                    cardNumber, // TODO: Convertir en formato de mascara
                    token,
                    campaignCode,
                    sku,
                    priceCode,
                    amount,
                  }).then(() => token)
                })
                .then(token => {
                  const {
                    paymentMethodID,
                    paymentMethodType,
                  } = payUPaymentMethod
                  //const sandboxToken = `${token}~${deviceSessionId}`
                  const sandboxToken = `153e65fc-e239-40ca-a4eb-b43f90623cea~19bcf300adc002231a132661d9a72ca2`
                  return sales
                    .finalizePayment(orderNumber, paymentMethodID, sandboxToken)
                    .then(({ status, total }) => {
                      if (status !== 'Paid')
                        throw new Error(MESSAGE.PAYMENT_FAIL)
                      return {
                        publicKey,
                        accountId,
                        payuBaseUrl,
                        deviceSessionId,
                        paymentMethodID,
                        paymentMethodType,
                        status,
                        total,
                      }
                    })
                })
                .catch(e => {
                  console.error({ e })
                  setSubmitting(false)
                })
            )
          }
        )
    })
      .then(res => {
        // Mezclamos valores del formulario con el payload de respuesta
        const mergedValues = Object.assign({}, memo, {
          payment: res,
          cardInfo: values,
        })
        onBeforeNextStep(mergedValues, props)
      })
      .catch(e => {
        console.error(e)
        setError('Disculpe, ha ocurrido un error durante el pago')
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <S.WizardPayment>
      <PanelPayment type="content" valing="jc-center">
        <FormPay error={error} onSubmit={onSubmitHandler} />
      </PanelPayment>
      <Summary
        amount={amount}
        billingFrequency={billingFrequency}
        description={description}
        summary={summary}
      />
    </S.WizardPayment>
  )
}

export default WizardPayment
