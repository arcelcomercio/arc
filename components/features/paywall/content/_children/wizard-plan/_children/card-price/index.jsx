import React from 'react'
import { useStrings } from '../../../../../_children/contexts'
import Panel from '../../../../../_children/panel'
import * as S from './styled'

function Price({ amount, frequency }) {
  const msgs = useStrings()
  const period = {
    month: ` ${msgs.monthlyPeriod}`,
    year: ` ${msgs.yearlyPeriod}`,
  }

  return (
    <>
      {amount === 0 ? (
        msgs.freeAmount
      ) : (
        <div>
          <S.Currency>S/</S.Currency>
          <span>{amount}</span>
          <S.Period>{period[frequency.toLowerCase()]}</S.Period>
        </div>
      )}
    </>
  )
}

function CardPrice(props) {
  const msgs = useStrings()
  const {
    plan: { amount, billingFrequency, description },
    onClick = i => i,
    onMouseOver,
    onFocus,
    active,
    mt,
    marginTop,
    offer,
  } = props

  const frequency = {
    month: msgs.monthlyFrequency,
    year: msgs.yearlyFrequency,
  }

  return (
    <Panel type="card-price">
      <S.CardPrice onFocus={onFocus} onMouseOver={onMouseOver}>
        {offer ? <S.Header>{offer}</S.Header> : null}

        <S.Content>
          <S.Frecuency mt={marginTop || mt || '20px'} marginBottom="8px">
            {frequency[billingFrequency.toLowerCase()]}
          </S.Frecuency>
          <S.Amount>
            <Price amount={amount} frequency={billingFrequency} />
          </S.Amount>
          <S.Description bold>
            <strong>{description.title}</strong>
          </S.Description>
          <S.Description>{description.description}</S.Description>
        </S.Content>
        <S.Footer>
          <S.Button
            active={active}
            onClick={e => onClick(e, props.plan)}
            type="button">
            {msgs.subscribe}
          </S.Button>
        </S.Footer>
      </S.CardPrice>
    </Panel>
  )
}

export default CardPrice
