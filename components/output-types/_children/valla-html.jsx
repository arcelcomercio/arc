import { useContent } from 'fusion:content'
import * as React from 'react'
import Markdown from 'react-markdown/with-html'

const VallaHtml = () => {
  const {
    name = 'Nombre Plan',
    summary: { feature = [] } = {},
    plans = [],
    printAttributes = [],
  } =
    useContent({
      source: 'paywall-campaing',
    }) || {}

  const getPLanSelected = plans.reduce(
    (prev, plan) => (plan.description.checked ? plan : prev),
    null
  )

  const {
    amount = '-',
    description: { title = 'periodo', description = 'duración' } = {},
  } = getPLanSelected || {}

  return (
    <>
      <div id="signwall-app" className="signwall-app active-signwall">
        <div className="container">
          <button
            type="button"
            className="btn-close"
            id="btn-close-paywall"
            aria-label="Cerrar valla">
            <svg width="14" height="14" aria-hidden>
              <g>
                <path d="M11.63.4l-9.91 9.92 8.6-8.6-9.91 9.91a1.39 1.39 0 0 0 1.96 1.96l9.91-9.91-8.6 8.6 9.92-9.9A1.39 1.39 0 0 0 11.64.4z" />
                <path d="M13.6 11.63L3.67 1.72l8.6 8.6L2.37.41A1.39 1.39 0 0 0 .4 2.37l9.91 9.91-8.6-8.6 9.9 9.91a1.39 1.39 0 0 0 1.97-1.96z" />
              </g>
            </svg>
          </button>
          <div className="header-box">
            <div className="header">
              <p>
                Has alcanzado el límite de noticias. <br /> Para continuar
                leyendo, adquiere el
              </p>
              <div className="plan-digital">{name}</div>
              <img
                alt="Logo"
                src="https://elcomercio.pe/pf/resources/dist/elcomercio/images/logo_elcomercio.png?d=408"
              />
            </div>
          </div>
          <div className="content">
            <div className="details">
              <div
                className={`cont-price-detail ${
                  amount === 0 ? 'price-free' : ''
                }`}>
                <div className="price-detail">
                  <h3 itemProp="name" className="price">
                    {amount === 0 ? 'Gratis' : `s/ ${amount}`}
                  </h3>
                </div>
                <div className="price-detail">
                  {amount !== 0 && <p>al mes</p>}
                  <p>
                    <strong>{title}</strong>
                  </p>
                  <p>{description}</p>
                </div>
              </div>
              <h3 itemProp="name" className="beneficio">
                <span>Beneficios</span>
              </h3>
              <ul className="list-benefits">
                {feature.map((item) => (
                  <li key={`lista-${item}`}>{item}</li>
                ))}
              </ul>
            </div>
            <button type="button" className="planes" id="btn-ver-planes">
              VER PLANES
            </button>
            <p className="suscrito">
              {printAttributes.map((item) =>
                item.name === 'subscriber_title_popup' ? item.value : null
              )}
            </p>
            {printAttributes.map((item) =>
              item.name === 'subscriber_detail_popup' ? (
                <div className="note-premium">
                  <Markdown
                    source={item.value}
                    escapeHtml={false}
                    unwrapDisallowed
                    disallowedTypes={['paragraph']}
                  />
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default VallaHtml
