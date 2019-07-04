import React from 'react'
import './summary.css'

const Summary = () => {
  return (
    <div className="__summary">
      <Content />
      <Footer />
    </div>
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
    <div className="__content">
      <div className="t2 __title">
        ACCEDE A UN DESCUENTO POR SER <strong>SUSCRIPTOR DEL IMPRESO</strong>
      </div>
      <div className="__wrapDetails">
        {offers.map(({ name, price, detail }) => (
          <ul className="__ul __offer" key={name}>
            <li className="t2">
              <div className="__expand">
                <span>{name}</span>
                <strong>
                  <span>{price}</span>
                </strong>
              </div>
            </li>
            <li style={{ listStyle: 'none' }}>
              <div className="t1 __details">{detail}</div>
            </li>
          </ul>
        ))}
      </div>
    </div>
  )
}

const Footer = () => {
  return (
    <div className="__footer">
      <div className="t1">DETALLE DE COMPRA</div>
      <div className="t5">Plan Digital</div>
      <ul className="t2 __details __ul">
        <li>Acceso ilimitado elcomercio.pe en todos tus dispositivos</li>
      </ul>
    </div>
  )
}

export default Summary
