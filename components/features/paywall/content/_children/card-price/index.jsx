import React, { useState } from 'react'
import Panel from '../../../_children/panel'
import * as S from './styled'

function CardPrice(props) {
  const {
    plan: { amount, billingFrequency, description },
    loading,
    onClick = i => i,
    s,
  } = props

  const frequency = {
    month: 'Mensual',
    year: 'Anual',
  }
  const [active, setActive] = useState(false)

  const onFocus = () => {
    setActive(true)
  }

  const onBlur = () => {
    setActive(false)
  }

  return (
    <Panel type="card-price">
      <S.CardPrice
        active={active}
        onBlur={onBlur}
        onMouseLeave={onBlur}
        onFocus={onFocus}
        onMouseOver={onFocus}>
        <S.Content>
          <S.Frecuency>{frequency[billingFrequency.toLowerCase()]}</S.Frecuency>
          <S.Amount>
            <S.Currency>S/</S.Currency>
            <span>{amount}</span>
          </S.Amount>
          <S.Description>{description.description}</S.Description>
        </S.Content>
        <S.Footer>
          <S.Button
            disabled={loading}
            active={active}
            onClick={e => onClick(e, props.plan)}
            type="button">
            SUSCRIBIRME{loading && '...'}
          </S.Button>
        </S.Footer>
      </S.CardPrice>
    </Panel>
  )
}

export default CardPrice
