import React, { useEffect, useState } from 'react'
import * as S from './styled'
import { Panel } from '../../../_children/panel/styled'
import Button from '../../../_children/button'
import { devices } from '../../../_dependencies/devices'

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
      profile: { firstName, lastName, secondLastName, email },
      plan: { name: plan },
      payment: { total: paidTotal },
    },
  } = props

  const handlePWA = () => {
    // eslint-disable-next-line no-prototype-builtins
    const isPWA = window.hasOwnProperty('nativeConnectionModal')
    if (isPWA) {
      window.nativeConnectionModal.pwaCloseWebView('paywall')
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
          <source srcSet={assets('confirmation')} />
          <source
            media={`(${devices.mobile})`}
            srcSet="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          />
          <S.Image src={assets('confirmation')} alt="Bar" />
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
            <S.Progress time="8s" onFinish={handleClick} />
          </S.WrapButton>
        </S.Content>
      </Panel>
    </div>
  )
}

export default WizardConfirmation
