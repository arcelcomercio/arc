import React from 'react'
import Panel from '../../../_children/panel'
import Bullet from '../../../_children/bullet-point'
import Icon from '../../../_children/icon'
import * as S from './styled'

const frequency = {
  Month: '/ AL MES',
  Year: '/ AL AÑO',
}

const Summary = ({ summary, amount, description = '', billingFrequency }) => {
  return (
    <Panel type="summary">
      <S.Summary>
        <Footer {...summary} />
        <Content
          amount={amount}
          description={description}
          billingFrequency={billingFrequency}
        />
      </S.Summary>
    </Panel>
  )
}

const Content = ({ amount = 0, description }) => {
  return (
    <div>
      <S.Content>
        <S.Expand>
          <span>Precio del plan</span>
          <strong>
            <span> {amount === 0 ? 'Gratis' : `S/ ${amount}`} </span>
          </strong>
        </S.Expand>
        <S.Expand size={18}>
          <strong>
            <span>TOTAL</span>
          </strong>
          <strong>
            <S.Amount>
              <div>
                {(() =>
                  amount === 0 ? (
                    'Gratis'
                  ) : (
                    <>
                      <span style={{ fontSize: '14px' }}>S/ </span> {amount}
                    </>
                  ))()}
              </div>
            </S.Amount>
          </strong>
        </S.Expand>
        <S.Description>{description.cart}</S.Description>
      </S.Content>
    </div>
  )
}

const Footer = ({ title, feature }) => {
  return (
    <S.Footer>
      <S.WrapTitle>
        <S.SummaryTitle>DETALLE DE LA SUSCRIPCIÓN</S.SummaryTitle>
        <S.NamePlan>{title}</S.NamePlan>
      </S.WrapTitle>
      {feature.map((text, index) => {
        const key = index
        return (
          <Bullet key={key} icon={<Icon type="check" fill="#FFF" />}>
            {text}
          </Bullet>
        )
      })}
    </S.Footer>
  )
}

export default Summary
