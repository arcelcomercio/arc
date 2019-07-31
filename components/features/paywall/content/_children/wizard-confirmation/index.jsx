import React from 'react'
import * as S from './styled'
import { Panel } from '../../../_children/panel/styled'
import Button from '../../../_children/button'
import Icon from '../../../_children/icon'
import { devices } from '../../../_dependencies/devices'

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
          <S.Title>¡Bienvenido {firstName}!</S.Title>
          <S.Subtitle>
            Disfruta de acceso ilimitado y contenido exclusivo en economía,
            negocios y finanzas.
          </S.Subtitle>
          <S.CardSummary>
            <S.DetailTitle>DETALLE DE COMPRA</S.DetailTitle>
            <Item label="PAQUETE: ">{plan.toUpperCase()}</Item>
            <Item label="NOMBRE: ">
              {firstName} {lastName} {secondLastName}
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
            <Button>SIGUE NAVEGANDO</Button>
          </S.WrapButton>
        </S.Content>
      </Panel>
    </div>
  )
}

export default WizardConfirmation
