import React, { useState } from 'react'
import Panel from '../../../_children/panel'
import * as S from './styled'

function CardPrice({ amount, billingFrequency, nextStep }) {
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

  const onBuy = () => {
    nextStep()
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
          <S.Frecuency>{frequency[billingFrequency]}</S.Frecuency>
          <S.Amount>
            <S.Currency>S/</S.Currency>
            <span>{amount}</span>
          </S.Amount>
          <S.Description>
            / AL MES POR 6 MESES LUEGO S/ 20 CADA MES
          </S.Description>
        </S.Content>
        <S.Footer>
          <S.Button active={active} onClick={onBuy} type="button">
            PAGAR
          </S.Button>
        </S.Footer>
      </S.CardPrice>
    </Panel>
  )
}

export default CardPrice
