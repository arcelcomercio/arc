import React from 'react'
import Panel from '../../../../../_children/panel'
import * as S from './styled'

function Price({ amount }) {
  return (
    <>
      {amount === 0 ? (
        'Gratis'
      ) : (
        <div>
          <S.Currency>S/</S.Currency>
          <span>{amount}</span>
        </div>
      )}
    </>
  )
}

function CardPrice(props) {
  const {
    plan: { amount, billingFrequency, description },
    onClick = i => i,
    onMouseOver,
    onFocus,
    active,
  } = props

  const frequency = {
    month: 'Mensual',
    year: 'Anual',
  }

  return (
    <Panel type="card-price">
      <S.CardPrice onFocus={onFocus} onMouseOver={onMouseOver}>
        <S.Content>
          <S.Frecuency>{frequency[billingFrequency.toLowerCase()]}</S.Frecuency>
          <S.Amount>
            <Price amount={amount} />
          </S.Amount>
          <S.Description>{description.description}</S.Description>
        </S.Content>
        <S.Footer>
          <S.Button
            className="button-buy"
            active={active}
            onClick={e => onClick(e, props.plan)}
            type="button">
            SUSCRIBIRME
          </S.Button>
        </S.Footer>
      </S.CardPrice>
    </Panel>
  )
}

export default CardPrice
