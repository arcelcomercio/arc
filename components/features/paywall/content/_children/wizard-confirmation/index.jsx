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
  const { assets } = props

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
          <S.Title>¡Bienvenido Armando!</S.Title>
          <S.Subtitle>
            Disfruta de acceso ilimitado y contenido exclusivo en economía,
            negocios y finanzas.
          </S.Subtitle>
          <S.CardSummary>
            <div>DETALLE DE COMPRA</div>
            <Item label="PAQUETE:">PLAN DIGITAL</Item>
            <Item label="NOMBRE:">ARMANDO BERAUN NEGRILLO</Item>
            <Item label="PRECIO:">S/ 5.00</Item>
            <S.Small>
              LA SUSCRIPCIÓN SE RENOVARÁ AUTOMÁTICAMENTE DE ACUERDO A TU PLAN.
            </S.Small>
          </S.CardSummary>
          <S.Span>
            Enviaremos la boleta de compra de la suscripción al correo:
            <strong>jberaunn@gmail.com</strong>
          </S.Span>
          <S.WrapButton>
            <Button>SIGUE NAVEGANDO</Button>
          </S.WrapButton>
          <S.Detail>
            <S.Span>Recuerda que con tu suscripción tienes Acceso a:</S.Span>
            <S.ContentBenefice>
              <S.WrapIcon>
                <Icon width="71" height="17" fill="#FFF" type="mundog" />
              </S.WrapIcon>
              <S.WrapText>
                <S.Span>Conoce los beneficios de Mundo G</S.Span>
              </S.WrapText>
            </S.ContentBenefice>

            <S.ContentBenefice>
              <S.WrapIcon>logo</S.WrapIcon>
              <S.WrapText>
                <S.Span>
                  Conoce los beneficios de mantener la versión impresa en PDF.
                </S.Span>
                <S.Span>
                  Descarga la aplicación en Google Play o App Store
                </S.Span>
              </S.WrapText>
            </S.ContentBenefice>
          </S.Detail>
        </S.Content>
      </Panel>
    </div>
  )
}

export default WizardConfirmation
