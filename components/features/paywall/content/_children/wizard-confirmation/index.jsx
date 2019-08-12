import React, { useEffect, useState } from 'react'
import * as S from './styled'
import { Panel } from '../../../_children/panel/styled'
import Button from '../../../_children/button'
import { devices } from '../../../_dependencies/devices'
import { PixelActions, sendAction } from '../../../_dependencies/analitycs'

const HOME = 'https://elcomercio-gestion-sandbox.cdn.arcpublishing.com/'
const NAME_REDIRECT = 'paywall_last_url'

const Item = ({ label, children }) => {
  return (
    <S.Item>
      {label} <strong>{children}</strong>
    </S.Item>
  )
}

const WizardConfirmation = props => {
  const {
    assets,
    memo: {
      order: { orderNumber },
      profile: { firstName, lastName, secondLastName, email },
      plan: { name: plan, sku, amount, billingFrequency, printed },
      referer: ref,
      payment: { total: paidTotal, subscriptionIDs },
    },
  } = props

  useEffect(() => {
    sendAction(PixelActions.PAYMENT_CONFIRMATION, {
      transactionId: orderNumber,
      transactionAffiliation: 'Suscripciones Gestión',
      transactionTotal: paidTotal,
      transactionTax: 0,
      transactionShipping: 0,
      transactionProducts: [
        {
          sku,
          name: plan,
          category: 'Planes',
          price: amount,
          quantity: 1,
        },
      ],
      confirmacionID: subscriptionIDs[0], // Por ahora solo un producto
      periodo: billingFrequency,
      suscriptorImpreso: printed ? 'si' : 'no',
      medioCompra: ref,
    })
  }, [])

  const handlePWA = () => {
    // eslint-disable-next-line no-prototype-builtins

    const isPWA = window.opener && ref.toUpperCase() === 'PWA'
    if (isPWA) {
      const { location } = window
      const destiny = `${location.protocol}//${location.hostname}`
      window.opener.postMessage('successful_purchase', destiny)
    }
    return isPWA
  }

  const handleClick = () => {
    if (handlePWA()) return
    const { sessionStorage, location } = window
    // eslint-disable-next-line no-prototype-builtins
    location.href = sessionStorage.hasOwnProperty(NAME_REDIRECT)
      ? sessionStorage.getItem(NAME_REDIRECT)
      : HOME
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Panel maxWidth="1060px" direction="row">
        <S.Picture>
          <source
            media={`(${devices.mobile})`}
            srcSet="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          />
          <source srcSet={assets('confirmation_webp')} type="image/webp" />
          <S.Image src={assets('confirmation')} alt="confirmación" />
        </S.Picture>

        <S.Content>
          <S.Title>¡Bienvenido(a) {firstName}!</S.Title>
          <S.Subtitle>
            Disfruta de acceso ilimitado y contenido exclusivo en economía,
            negocios y finanzas.
          </S.Subtitle>
          <S.CardSummary>
            <S.DetailTitle>DETALLE DE COMPRA</S.DetailTitle>
            <Item label="PAQUETE: ">{plan.toUpperCase()}</Item>
            <Item label="NOMBRE: ">
              <S.Names>
                {firstName} {lastName} {secondLastName}
              </S.Names>
            </Item>
            <Item label="PRECIO: ">
              S/ {paidTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
            </Item>
            <S.Small>
              LA SUSCRIPCIÓN SE RENOVARÁ AUTOMÁTICAMENTE DE ACUERDO A TU PLAN.
            </S.Small>
          </S.CardSummary>
          <S.Span>
            Enviaremos la boleta de compra de la suscripción al correo:
            <strong> {email}</strong>
          </S.Span>
          <S.WrapButton>
            <Button onClick={handleClick}>SIGUE NAVEGANDO</Button>
            <S.Progress time="17s" onFinish={handleClick} />
          </S.WrapButton>
        </S.Content>
      </Panel>
    </div>
  )
}

export default WizardConfirmation
