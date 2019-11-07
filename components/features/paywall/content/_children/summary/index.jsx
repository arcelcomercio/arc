import React from 'react'
import Panel from '../../../_children/panel'
import Bullet from '../../../_children/bullet-point'
import Icon from '../../../_children/icon'
import { useStrings } from '../../../_children/contexts'
import * as S from './styled'

const Summary = ({
  elevation,
  summary,
  amount,
  description = '',
  billingFrequency,
}) => {
  return (
    <Panel elevation={elevation} type="summary">
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
  const msgs = useStrings()
  const frequency = {
    month: ` ${msgs.monthlyPeriod}`,
    year: ` ${msgs.yearlyPeriod}`,
  }
  return (
    <div>
      <S.Content>
        {amount === 0 || description.price_origin ? (
          <>
            <S.Expand color="#aaaaaa">
              <span>{msgs.planPrice}</span>
              <strong>
                {/* <span> {`S/ ${amount}`} </span> */}
                <span>{`${msgs.currencySymbol.toUpperCase()} ${
                  description.price_origin
                }`}</span>
              </strong>
            </S.Expand>
            <S.Expand color="#a98e7c">
              <span>
                <strong>{msgs.subscriptorDiscount}</strong>
              </span>
              <strong>
                {/* <span> {`- S/ ${amount}`} </span> */}
                <span>
                  {amount === 0
                    ? `- ${msgs.currencySymbol} ${description.price_origin}`
                    : `- ${msgs.currencySymbol} ${description.price_origin -
                        amount}`}
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
            <span>{msgs.totalLabel}</span>
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
  const msgs = useStrings()
  return (
    <S.Footer>
      <S.WrapTitle>
        <S.SummaryTitle>{msgs.subscriptionDetail}</S.SummaryTitle>
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
