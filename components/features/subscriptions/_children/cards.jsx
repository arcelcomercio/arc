import React from 'react'
import Markdown from 'react-markdown/with-html'
import Taggeo from '../../signwall/_dependencies/taggeo'

function Cards({ item, arcSite, order, textOffer }) {
  const itemGrid = ['one', 'two', 'three']
  const {
    title,
    subtitle,
    url,
    recommended = false,
    features,
    sku,
    price: { amount, currency },
    detail: { frequency, duration, aditional },
  } = item
  const showFree = amount === 0
  const isComercio = arcSite === 'elcomercio'

  return (
    <article
      key={`card-detail-${order}`}
      className={`planes__item ${
        isComercio
          ? `grid-four-${itemGrid[order]}`
          : `grid-three-${itemGrid[order]}`
      } `}>
      <div className="planes__content">
        {recommended && (
          <div className="planes__content-discount">{textOffer}</div>
        )}

        <h3 className="planes__content-title">
          <strong>
            {`${title} `}
            {subtitle}
          </strong>
        </h3>
        <div className="cont-left">
          <img
            className="planes__content-picture"
            src={`https://perufront.com/web-paywall-2020/images/${arcSite}/plan_${itemGrid[order]}.png?v=08062020`}
            alt={title}
          />
        </div>
        <div className="cont-right">
          {recommended && (
            <div className="planes__content-discount-mobile">{textOffer}</div>
          )}

          <h3 className="planes__content-title-mobile">
            <strong>
              {`${title} `}
              {subtitle}
            </strong>
          </h3>
          <strong className="planes__content-price">
            {showFree ? 'Gratis' : `${currency} ${amount}`}
          </strong>
          <p className="planes__content-duration">
            {duration !== '' ? duration : '-'}
          </p>
          <small className="planes__content-after">
            {aditional !== '' ? aditional : '-'}
          </small>
        </div>
        <div className="planes__content-accordion">
          <input type="checkbox" defaultChecked onChange={() => {}} />
          <i></i>
          <h4>Ver detalles</h4>
          <div className="cont">
            <button
              type="button"
              className="planes__content-button"
              onClick={() => {
                Taggeo('Web_Paywall_Home', `web_paywall_home_button_${sku}`)
                window.open(url, '_blank')
              }}>
              Suscribirme
            </button>
            <ul className="planes__content-benefits">
              {features.map((list, i) => {
                // return (
                //   <li key={`lista-${i + 1}`} className="check">
                //     {list}
                //   </li>
                // )
                return (
                  <li key={`lista-${i + 1}`}>
                    <Markdown
                      source={list}
                      escapeHtml={false}
                      unwrapDisallowed
                      disallowedTypes={['paragraph']}
                    />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </article>
  )
}

export default Cards
