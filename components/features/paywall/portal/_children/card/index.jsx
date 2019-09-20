import React from 'react'
import Icon from '../../../_children/icon'

function Bullet({ icon, children }) {
  return (
    <div className="bullet">
      <div className="bullet__icon">{icon}</div>
      <div className="bullet__text">{children}</div>
    </div>
  )
}

function Promotion() {
  return (
    <div className="card__head__promotion">
      <span>¡RECOMENDADO!</span>
    </div>
  )
}

function Card({ item }) {
  const {
    title,
    url,
    recommended = false,
    features,
    price: { amount, currency },
    detail: { frequency, duration, aditional },
  } = item
  return (
    <div className="card">
      <div
        className={`card__head${recommended ? ' card__head--promotion' : ''}`}>
        {recommended && <Promotion />}
        <span className="head">{title}</span>
      </div>
      <div className="card__content">
        <div className="content-price">
          <div className="content-price__price">
            <span className="content-price__currency">{currency}</span>
            <span className="content-price__amount">{amount}</span>
          </div>
          <div className="content-price__detail">
            <span>{frequency}</span>
            <span className="content-price__duration">{duration}</span>
            <span>{aditional}</span>
          </div>
        </div>
        <div className="content-feature">
          {features.map(text => (
            <Bullet key={text} icon={<Icon type="check" />}>
              {text}
            </Bullet>
          ))}
        </div>
      </div>
      <div className="card__footer">
        <a
          href={url}
          className="link link--suscribe"
          onClick={() => {
            window.sessionStorage.setItem('paywall_last_url', '/suscripciones/')
            window.sessionStorage.setItem('paywall_type_modal', 'landing')
          }}>
          SUSCRIBIRME
        </a>
      </div>
    </div>
  )
}

export default Card
