/* eslint-disable */
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
  }
`

function WizardPayment(props) {
  const {
    memo,
    summary,
    onBeforeNextStep = (res, goNextStep) => goNextStep(),
  } = props
  const [loading, setLoading] = useState()
  const [errors, setErrors] = useState([])

  const fusionContext = useFusionContext()
  const { siteProperties } = fusionContext
  const Sales = addSales(siteProperties)

  const getPayUToken = ({
    baseUrl,
    publicKey,
    accountId,
    cardNumber,
    expiryMonth,
    expiryYear,
    cardDocument,
    ownerName,
    cvv,
    cardMethod,
  }) => {
    const qs = `callback=jQuery19107734719643549919_1563491566646&public_key=${publicKey}&account_id=${accountId}&list_id=mylistID&_card%5Bnumber%5D=${cardNumber}&_card%5Bexp_month%5D=${expiryMonth}&_card%5Bexp_year%5D=${expiryYear}&_card%5Bdocument%5D=${cardDocument}&_card%5Bpayer_id%5D=10&_card%5Bname_card%5D=${ownerName}&_card%5Bcvc%5D=${cvv}&_card%5Bmethod%5D=${cardMethod}&_=1563491566648``callback=jQuery19107734719643549919_1563491566646&public_key=PKaC6H4cEDJD919n705L544kSU&account_id=512323&list_id=mylistID&_card%5Bnumber%5D=4437030140190994&_card%5Bexp_month%5D=10&_card%5Bexp_year%5D=2021&_card%5Bdocument%5D=44000001&_card%5Bpayer_id%5D=10&_card%5Bname_card%5D=jorge+duenas&_card%5Bcvc%5D=123&_card%5Bmethod%5D=VISA&_=1563491566648`
    const url = `${baseUrl}.token?${encodeURIComponent(qs)}`
    return fetch(url).then(res => {
      const token = res.match(/token\:\s*'([a-z0-9-]+)/)
      return token
    })
  }

  function apiPaymentRegister({
    baseUrl,
    orderNumber,
    firstName,
    lastName,
    secondLastName,
    documentType = 'DNI',
    documentNumber,
    email,
    phone,
    cardMethod,
    cardNumber,
    token,
    campaignCode,
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
              //campaignCode,
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

  const onSubmitHandler = (values, actions) => {
    const {
      sku,
      priceCode,
      pricingStrategyId,
      campaignCode,
      description,
      amount,
      billingFrequency,
      orderNumber,
      firstName,
      lastName,
      secondLastName,
      documentNumber,
      phone,
      email,
    } = memo
    const { cvv, cardMethod, expiryDate, cardNumber } = values
    let payUPaymentMethod

    Sales.then(sales => {
      setLoading(true)
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
                  payU.setURL(payuBaseUrl) //OK
                  payU.setPublicKey(publicKey) //OK
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
                      } else {
                        resolve(response.token)
                      }
                    })
                  })
                })
                // TODO: El servicio aun esta en desarrollo
                .then(token => {
                  return apiPaymentRegister({
                    baseUrl: 'http://devpaywall.comerciosuscripciones.pe', //TODO token en duro, environment no funciona
                    orderNumber,
                    firstName,
                    lastName,
                    secondLastName,
                    documentType: 'DNI',
                    documentNumber,
                    email,
                    phone,
                    cardMethod,
                    cardNumber, //TODO: Convertir en formato de mascara
                    token,
                    campaignCode,
                    sku,
                    priceCode,
                    amount,
                  }).then(() => token)
                })
                .then(token => {
                  const { paymentMethodID } = payUPaymentMethod
                  return sales
                    .finalizePayment(orderNumber, paymentMethodID, token)
                    .then(res => {
                      // Mezclamos valores del formulario con el payload de respuesta
                      const mergedValues = Object.assign({}, res, values)
                      onBeforeNextStep(mergedValues, props)
                    })
                })
            )
          }
        )
    })
  }

  function onResetHandler(values, actions) {
    // TODO: Limpiar errores una vez se vuelva a reenviar el formuario
    //       hay que llamar a formikBag.handleReset()
    setError()
  }

  return (
    <S.WizardPayment>
      <PanelPayment type="content" valing="jc-center">
        <FormPay onSubmit={onSubmitHandler} />
      </PanelPayment>
      <Summary summary={summary} />
    </S.WizardPayment>
  )
}

export default WizardPayment
