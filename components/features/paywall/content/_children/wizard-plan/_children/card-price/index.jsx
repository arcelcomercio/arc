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
    plan,
    overrides,
    onClick = i => i,
    onMouseOver,
    onFocus,
    active,
    mt,
    marginTop,
    offer,
    event,
  } = props

  const frequency = {
    month: msgs.monthlyFrequency,
    year: msgs.yearlyFrequency,
  }

  let _plan = plan
  if (overrides) {
    // Sobreescribimos los valores de los atributos del plan
    // por los definidos en el objeto descripcion
    const {
      displayFrequency: billingFrequency,
      displayAmount: amount,
      displayBanner: banner,
    } = plan.description
    let attrOverrides = {
      billingFrequency,
      amount,
      banner,
    }
    // eliminamos atributos indefinidos
    attrOverrides = JSON.parse(JSON.stringify(attrOverrides))
    // creamos plan con atributos sobreescritos
    _plan = { ...plan, ...attrOverrides }
  }
  const { amount, billingFrequency, description } = _plan

  return (
    <Panel type="card-price" event={event}>
      <S.CardPrice onFocus={onFocus} onMouseOver={onMouseOver}>
        {offer && !event ? <S.Header>{offer}</S.Header> : null}
        {event && <S.Header>{`PROMOCIÓN ${event.toUpperCase()}`}</S.Header>}

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

        {event && <S.NoticeText>Promoción válida hasta el 01/12/2019 <br/> para suscripciones anuales.</S.NoticeText>}

      </S.CardPrice>


    </Panel>
  )
}

export default CardPrice
