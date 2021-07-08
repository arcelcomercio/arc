import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import * as React from 'react'
import Markdown from 'react-markdown/with-html'

import { getAssetsPath } from '../../utilities/assets'

const VallaHtml = () => {
  const { arcSite, contextPath } = useAppContext()
  const {
    name = 'Nombre Plan',
    summary: { feature = [] } = {},
    plans = [],
    printAttributes = [],
  } =
    useContent({
      source: 'paywall-campaing',
    }) || {}

  const getPLanSelected = plans.find((plan) => plan.description.checked)

  const {
    amount = '-',
    description: { title = 'periodo', description = 'duración' } = {},
  } = getPLanSelected || {}

  return (
    <div id="signwall-app">
      <div className="body-modal position-middle size-medium-large">
        <div className="signwall-inside_body-container paywall">
          <button
            type="button"
            className="signwall-inside_body-close paywall"
            id="btn-close-paywall"
            aria-label="Cerrar valla">
            <svg width="14" height="14">
              <g>
                <path d="M11.63.4l-9.91 9.92 8.6-8.6-9.91 9.91a1.39 1.39 0 0 0 1.96 1.96l9.91-9.91-8.6 8.6 9.92-9.9A1.39 1.39 0 0 0 11.64.4z" />
                <path d="M13.6 11.63L3.67 1.72l8.6 8.6L2.37.41A1.39 1.39 0 0 0 .4 2.37l9.91 9.91-8.6-8.6 9.9 9.91a1.39 1.39 0 0 0 1.97-1.96z" />
              </g>
            </svg>
          </button>

          <div
            className="signwall-inside_body-left paywall"
            style={{
              background: `${arcSite === 'gestion' ? '#8f071f' : '#232323'}`,
            }}>
            <img
              src={`${getAssetsPath(
                arcSite,
                contextPath
              )}/resources/dist/${arcSite}/images/paywall_bg.jpg?d=1`}
              alt={`Ejemplo de usuario suscriptor de ${arcSite}`}
              className="signwall-inside_body-left__bg"
            />
            <div className="signwall-inside_body-cont paywall">
              <p>
                Has alcanzado el límite de noticias.
                <br />
                Para continuar leyendo, adquiere el
              </p>
              <h3
                className="signwall-inside_body-title paywall"
                style={{
                  fontFamily:
                    arcSite === 'elcomercio'
                      ? '"Noto Serif SC", serif'
                      : '"Judson", serif;',
                }}>
                {name}
              </h3>
              <br />
              <center>
                <img
                  alt="Logo"
                  src={`${getAssetsPath(
                    arcSite,
                    contextPath
                  )}/resources/dist/${arcSite}/images/logo_${arcSite}.png?d=1`}
                />
              </center>
            </div>
          </div>

          <div className="signwall-inside_body-right paywall">
            <form className="signwall-inside_forms-form paywall">
              <div className="signwall-inside_forms-cont-paywall">
                <div className="cont-price-detail">
                  {amount === 0 ? (
                    <div className="price-middle">
                      <h3>Gratis</h3>
                    </div>
                  ) : (
                    <div className="price">
                      <i>s/</i>
                      {amount}
                    </div>
                  )}
                  <div
                    className={
                      amount === 0 ? 'detail-price-middle' : 'detail-price'
                    }>
                    {amount !== 0 && <p>al mes</p>}

                    <p>
                      <strong>{title}</strong>
                    </p>
                    <p>{description}</p>
                  </div>
                </div>

                <h3 className="title-line line-gestion uppercase text-center mt-30 mb-20">
                  <span>Beneficios</span>
                </h3>

                <ul className="list-benefits mb-20">
                  {feature.map((item) => (
                    <li key={`lista-${item}`}>{item}</li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                className="signwall-inside_forms-btn"
                id="btn-ver-planes">
                VER PLANES
              </button>
              <p className="signwall-inside_forms-text mt-20 mb-10 center">
                {printAttributes.map((item) => (
                  <React.Fragment key={item.name}>
                    {item.name === 'subscriber_title_popup' && item.value}
                  </React.Fragment>
                ))}
              </p>
              <p className="signwall-inside_forms-text center note-premium mb-10">
                {printAttributes.map(
                  (item) =>
                    item.name === 'subscriber_detail_popup' && (
                      <React.Fragment key={item.name}>
                        <Markdown
                          source={item.value}
                          escapeHtml={false}
                          unwrapDisallowed
                          disallowedTypes={['paragraph']}
                        />
                      </React.Fragment>
                    )
                )}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VallaHtml
