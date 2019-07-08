import React from 'react'
import Panel from '../../../_children/panel'
import './card-price.css'

function CardPrice({ amount, billingFrequency }) {
  const frequency = {
    month: 'Mensual',
    year: 'Anual',
  }
  return (
    <Panel type="card-price">
      <div className="card-price">
        <div className="card-price__content">
          <div className="card-price__frecuency">
            {frequency[billingFrequency]}
          </div>
          <div className="card-price__amount">
            <span className="card-price__currency">S/</span>
            <span className="card-price__price">{amount}</span>
          </div>
          <div className="card-price__description">
            / AL MES POR 6 MESES LUEGO S/ 20 CADA MES
          </div>
        </div>
        <div className="card-price__footer">
          <button className="card-price__buy" type="button">
            PAGAR
          </button>
        </div>
      </div>
    </Panel>
  )
}

export default CardPrice
