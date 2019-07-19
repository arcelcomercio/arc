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
              campaignCode,
              sku,
              price_code: priceCode,
              amount,
            },
          ],
        }),
        headers: {
          'Content-Type': 'application/json',
          // eslint-disable-next-line prettier/prettier
          Authorization: '3150babb4e158cd6ec7e15808cb6a4994cdc3cdf',
          'user-token': '[TOKEN_USER]',
        },
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
    Sales.then(sales => {
      setLoading(true)
      return sales
        .getPaymentOptions()
        .then(paymentMethods => {
          const payUPaymentMethod = paymentMethods.find(
            m => m.paymentMethodType === 8
          )
          const { paymentMethodType, paymentMethodID } = payUPaymentMethod
          return Sales.initializePayment(orderNumber, paymentMethodID)
        })
        .then(
          ({
            parameter1: publicKey,
            parameter2: accountId,
            parameter3: payuBaseUrl,
            parameter4: deviceSessionId, // TODO: Verificar si api envia este parametro
          }) => {
            const ownerName = `${firstName} ${lastName} ${secondLastName}`.trim()
            const expiryMonth = expiryDate.split('/')[0]
            const expiryYear = expiryDate.split('/')[1]

            return getPayUToken({
              payuBaseUrl,
              publicKey,
              accountId,
              deviceSessionId,
              cardNumber,
              expiryMonth,
              expiryYear,
              documentNumber,
              ownerName,
              cvv,
              cardMethod: cardMethod.toUpperCase(),
            })
          }
        )
        .then(({ token }) => {
          return apiPaymentRegister({
            baseUrl,
            orderNumber,
            firstName,
            lastName,
            secondLastName,
            documentType: 'DNI',
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
          }).then(({ id, order }) => {
            return Sales.finalizePayment(order, paymentMethodID, token).then(
              res => {
                onBeforeNextStep(res, props)
              }
            )
          })
        })
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
