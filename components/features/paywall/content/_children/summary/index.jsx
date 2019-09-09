import React from 'react'
import Markdown from 'react-markdown'
import Panel from '../../../_children/panel'
import Bullet from '../../../_children/bullet-point'
import Icon from '../../../_children/icon'
import * as S from './styled'

const frequency = {
  month: ' al mes',
  year: ' al año',
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

const Content = ({ amount = 0, description, billingFrequency }) => {
  return (
    <div>
      <S.Content>
        {amount === 0 || description.price_origin ? (
          <>
            <S.Expand color="#aaaaaa">
              <span>Precio del plan</span>
              <strong>
                {/* <span> {`S/ ${amount}`} </span> */}
                <span>{`S/ ${description.price_origin}`}</span>
              </strong>
            </S.Expand>
            <S.Expand color="#a98e7c">
              <span>
                <strong>Descuento de suscriptor</strong>
              </span>
              <strong>
                {/* <span> {`- S/ ${amount}`} </span> */}
                <span>
                  {amount === 0
                    ? `- S/ ${description.price_origin}`
                    : `- S/ ${description.price_origin - amount}`}
                </span>
              </strong>
            </S.Expand>
          </>
        ) : null}
        {/* <S.Expand>
          <span>Precio del plan</span>
          <strong>
            <span> {amount === 0 ? 'Gratis' : `S/ ${amount}`} </span>
          </strong>
        </S.Expand> */}
        <S.Expand size={18} style={{ paddingTop: '20px' }}>
          <strong>
            <span>TOTAL</span>
          </strong>
          <strong>
            <S.Amount>
              <div>
                {(() =>
                  amount === 0 ? (
                    <span style={{ fontSize: '24px' }}>Gratis</span>
                  ) : (
                    <>
                      <span style={{ fontSize: '14px' }}>S/ </span> {amount}
                      <span style={{ fontSize: '14px' }}>
                        {frequency[billingFrequency.toLowerCase()]}
                      </span>
                    </>
                  ))()}
              </div>
            </S.Amount>
          </strong>
        </S.Expand>
        {/* <S.Description>{description.cart}</S.Description> */}
        <S.Description>
          <strong>{description.title}</strong>
        </S.Description>
        <S.Description>{description.description}</S.Description>
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
