import React from 'react'
import * as S from './styled'

const Summary = () => {
  return (
    <S.Summary>
      <Content />
      <Footer />
    </S.Summary>
  )
}

const offers = [
  {
    name: 'Precio del plan',
    price: 'S/ 10.00 al mes',
    detail: 'Por los 6 primeros meses. Luego, S/ 20 cada mes.',
  },
  {
    name: 'Precio especial suscriptor',
    price: 'GRATIS',
    detail: 'Por los 6 primeros meses.  Luego, S/ 10 cada mes. ',
  },
]

const Content = () => {
  return (
    <div>
      <S.Title>
        ACCEDE A UN DESCUENTO POR SER <strong>SUSCRIPTOR DEL IMPRESO</strong>
      </S.Title>
      <S.Wrap>
        {offers.map(({ name, price, detail }) => (
          <ul className="__ul __offer" key={name}>
            <li className="t2">
              <S.Expand>
                <span>{name}</span>
                <strong>
                  <span>{price}</span>
                </strong>
              </S.Expand>
            </li>
            <li style={{ listStyle: 'none' }}>
              <div className="t1 __details">{detail}</div>
            </li>
          </ul>
        ))}
      </S.Wrap>
    </div>
  )
}

const Footer = () => {
  return (
    <S.Footer>
      <div className="t1">DETALLE DE COMPRA</div>
      <div className="t5">Plan Digital</div>
      <ul className="t2 __details __ul">
        <li>Acceso ilimitado elcomercio.pe en todos tus dispositivos</li>
      </ul>
    </S.Footer>
  )
}

export default Summary
