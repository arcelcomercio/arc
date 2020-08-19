/* eslint-disable react/jsx-filename-extension */

/**
 * OJO Este componente cuenta con 3 tipos de Footer:
 * @FooterSubs
 * @FooterLand
 * @FooterPrint
 */

import React, { useContext, useState } from 'react'
import { useFusionContext } from 'fusion:context'
import PropertiesSite from '../_dependencies/Properties'
import { AuthContext } from '../_context/auth'
import { subDniToken } from '../_dependencies/Services'
import useForm from '../_hooks/useForm'

const styles = {
  wrapper: 'validate__grid wrapper-buy',
  info: 'grid-two-one-buy validate__banner-info',
  form: 'grid-two-two-buy validate__banner-form tooltip',
  tooltip: 'tooltiptext-bottomarrow',
  btnDetail: 'step__bottom-btn-detail',
  iconUp: 'icon-arrow-up',
}

export const FooterSubs = ({ arcEnv }) => {
  const { userLoaded, userStep } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const { urls } = PropertiesSite.common
  const {
    globalContent: { printAttributes = [], printedSubscriber },
  } = useFusionContext() || {}

  const textsAttr = printAttributes.reduce(
    (prev, item) => ({ ...prev, [item.name]: item.value }),
    {}
  )

  const stateSchema = {
    vDocumentType: { value: 'DNI', error: '' },
    vDocumentNumber: { value: '', error: '' },
  }

  const stateValidatorSchema = {
    vDocumentType: {
      required: true,
    },
    vDocumentNumber: {
      required: true,
    },
  }

  const handleValidateDNI = ({ vDocumentType, vDocumentNumber }) => {
    if (typeof window !== 'undefined') {
      setLoading(true)
      window.Identity.heartbeat()
        .then(resHeart => {
          subDniToken(urls.subsDniToken[arcEnv], resHeart.accessToken)
            .then(resDniToken => {
              if (resDniToken.token) {
                setTimeout(() => {
                  window.location.href =
                    arcEnv === 'prod'
                      ? `/suscripcionesdigitales/${vDocumentType}/${vDocumentNumber}/${resDniToken.token}/`
                      : `/suscripcionesdigitales/${vDocumentType}/${vDocumentNumber}/${resDniToken.token}/?outputType=subscriptions`
                }, 1000)
              } else {
                window.console.error('Hubo un error con la respuesta') // Temporal hasta implementar Sentry
                setLoading(false)
              }
            })
            .catch(errDniToken => {
              window.console.error(errDniToken) // Temporal hasta implementar Sentry
              setLoading(false)
            })
        })
        .catch(errHeart => {
          window.console.error(errHeart) // Temporal hasta implementar Sentry
          setLoading(false)
        })
    }
    return ''
  }

  const {
    values: { vDocumentNumber, vDocumentType },
    errors: { vDocumentNumber: vDocumentNumberError },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, handleValidateDNI)

  return (
    <>
      {!printedSubscriber && (userStep === 1 || userStep === 2) && (
        <footer className="validate" id="validate">
          <div className={styles.wrapper}>
            <>
              <div className={styles.info}>
                {userLoaded && (userStep === 1 || userStep === 2) ? (
                  <>
                    <h4>{textsAttr.subscriber_title_banner}</h4>
                    <p>
                      {`${textsAttr.subscriber_detail_banner}. ${textsAttr.subscriber_regular_period}`}
                    </p>
                  </>
                ) : (
                  <>
                    <h4>¿Eres suscriptor de nuestra edición impresa?</h4>
                    <p>
                      Inicia sesión o regístrate y descubre el precio especial
                      para ti.
                    </p>
                  </>
                )}
              </div>
              <div className={styles.form}>
                {userLoaded && (userStep === 1 || userStep === 2) && (
                  <>
                    <form
                      className="step__left-block"
                      onSubmit={handleOnSubmit}>
                      <div className="cont-select-input">
                        <select
                          name="vDocumentType"
                          value={vDocumentType}
                          onChange={handleOnChange}>
                          <option value="DNI">DNI</option>
                          <option value="CDI">CDI</option>
                          <option value="CEX">CEX</option>
                        </select>
                        <input
                          type="text"
                          name="vDocumentNumber"
                          maxLength="8"
                          required
                          value={vDocumentNumber}
                          onBlur={handleOnChange}
                          onChange={handleOnChange}
                        />
                      </div>

                      <div className="cont-button">
                        <button
                          className="btn-next"
                          type="submit"
                          disabled={disable}>
                          {loading ? 'Validando...' : 'Validar'}
                        </button>
                      </div>
                      {/* {vDocumentNumberError && (
                        <span className="msn-error">
                          {vDocumentNumberError}
                        </span>
                      )} */}
                    </form>
                    {vDocumentNumberError && (
                      <span className={styles.tooltip}>
                        {vDocumentNumberError}
                        {/* <button type="button" className="btn-link">
                          Entendido
                        </button> */}
                      </span>
                    )}
                    {/* <span className={styles.tooltip}>
                      El documento que enviaste no accede a ningún descuento.
                      <button type="button" className="btn-link">
                        Entendido
                      </button>
                    </span> */}
                  </>
                )}
              </div>
            </>
          </div>
        </footer>
      )}

      {userStep !== 4 && (
        <section className="step__bottom">
          <button className={styles.btnDetail} type="button" id="btn-detail">
            Resumen de pedido
            <i className={styles.iconUp}></i>
          </button>
        </section>
      )}
    </>
  )
}

export const FooterLand = ({ arcSite, arcEnv, arcType }) => {
  const { urls, emails, texts } = PropertiesSite[arcSite]
  return (
    <>
      <footer className="footer" id="footer">
        <div
          className={
            arcType === 'payment' ? 'wrapper-buy step__footer' : 'wrapper'
          }>
          <div className="footer__content">
            <div className="footer__grid">
              <div className="footer__item grid-four-one">
                <div className="footer__content-mail">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={urls.homeUrl[arcEnv]}>
                    <div className="footer__content-logo"></div>
                  </a>
                  <p>
                    Envíanos un correo a<br />
                    <a
                      href={`mailto:${emails.atencion}`}
                      className="footer__content-link">
                      {emails.atencion}
                    </a>
                  </p>
                </div>
              </div>
              <div className="footer__item grid-four-two">
                <div className="footer__content-ayuda footer__content-accordion">
                  <input type="checkbox" defaultChecked onChange={() => {}} />
                  <i></i>
                  <h4 className="footer__content-title">Ayuda</h4>
                  <div className="cont">
                    <p>
                      <a
                        href={urls.preguntas[arcEnv]}
                        target="_blank"
                        rel="noreferrer"
                        className="footer__content-link">
                        Preguntas Frecuentes
                      </a>
                    </p>
                    <p>
                      Servicio al cliente y Ventas:
                      <br />
                      <a
                        href={`mailto:${emails.atencion}`}
                        className="footer__content-link">
                        {emails.atencion}
                      </a>
                    </p>
                    {/* <p>
                  Pagos pendientes y Facturación:
                  <br />
                  <a
                    href={`mailto:${emails.cobranzas}`}
                    className="footer__content-link">
                    {emails.cobranzas}
                  </a>
                </p> */}
                  </div>
                </div>
              </div>
              <div className="footer__item grid-four-three">
                <div className="footer__content-legal footer__content-accordion">
                  <input type="checkbox" defaultChecked onChange={() => {}} />
                  <i></i>
                  <h4 className="footer__content-title">Legal</h4>
                  <div className="cont">
                    <p>
                      <a
                        href={urls.terminos}
                        target="_blank"
                        rel="noreferrer"
                        className="footer__content-link">
                        Términos y Condiciones
                        {/* <span>(Actualizado al 2019)</span> */}
                      </a>
                    </p>
                    <p>
                      <a
                        href={urls.politicas}
                        target="_blank"
                        rel="noreferrer"
                        className="footer__content-link">
                        Política de Privacidad
                        {/* <span>(Actualizado al 2019)</span> */}
                      </a>
                    </p>
                    <p>
                      <a
                        href={urls.reclamos}
                        target="_blank"
                        rel="noreferrer"
                        className="footer__content-link">
                        Libro de Reclamaciones
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="footer__item grid-four-four">
                <div className="footer__content-encuentranos">
                  <h4 className="footer__content-title">Encuéntranos</h4>
                  <div className="footer__content-encuentranos-social">
                    <a href={urls.twitter} target="_blank" rel="noreferrer">
                      <i className="icon-twitter"></i>
                    </a>
                    <a href={urls.facebook} target="_blank" rel="noreferrer">
                      <i className="icon-facebook"></i>
                    </a>
                    <a href={urls.instangram} target="_blank" rel="noreferrer">
                      <i className="icon-instangram"></i>
                    </a>
                  </div>
                  <div className="footer__content-encuentranos-apps">
                    <a href={urls.appStore} target="_blank" rel="noreferrer">
                      <i className="icon-appstore"></i>
                    </a>
                    <a href={urls.googlePlay} target="_blank" rel="noreferrer">
                      <i className="icon-googleplay"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer__end">
            <p>{texts.footerEnd}</p>
          </div>
        </div>
      </footer>

      <button type="button" id="btn-arrow-top" className="arrow-up">
        <i></i>
      </button>
    </>
  )
}

// export const FooterPrint = () => {
//   return (
//     <>
//       <footer className="footer" id="footer">
//         <div className={styles.wrapper}>
//           <br />
//           <br />
//           <br />
//         </div>
//       </footer>
//       <section className="step__bottom">
//         <button className={styles.btnDetail} type="button" id="btn-detail">
//           Resumen de pedido
//           <i className={styles.iconUp}></i>
//         </button>
//       </section>
//     </>
//   )
// }
