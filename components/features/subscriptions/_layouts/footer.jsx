/**
 * OJO Este componente cuenta con 3 tipos de Footer:
 * @FooterSubs
 * @FooterLand
 */

import { useAppContext } from 'fusion:context'
import * as React from 'react'
import TextMask from 'react-text-mask'

import { isProd } from '../../../utilities/arc/env'
import { AuthContext } from '../_context/auth'
import { PropertiesCommon, PropertiesSite } from '../_dependencies/Properties'
import PWA from '../_dependencies/Pwa'
import { docPatterns, maskDocuments } from '../_dependencies/Regex'
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

export const FooterSubs = () => {
  const {
    userLoaded,
    userStep,
    updateLoading,
    userDataPlan,
  } = React.useContext(AuthContext)
  const [loading, setLoading] = React.useState(false)
  const [showDocOption, setShowDocOption] = React.useState('DNI')
  const { urls, texts } = PropertiesCommon
  const {
    globalContent: {
      name: planName,
      printAttributes = [],
      printedSubscriber,
      event,
    },
  } = useAppContext() || {}

  const textsAttr = printAttributes.reduce(
    (prev, item) => ({ ...prev, [item.name]: item.value }),
    {}
  )

  const period = {
    month: 'Mensual',
    year: 'Anual',
    semester: 'Semestral',
  }

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
      validator: {
        func: (value) =>
          docPatterns[showDocOption].test(value.replace(/\s/g, '')) &&
          value !== '00000000',
        error: 'Formato inválido.',
      },
    },
  }

  const handleValidateDNI = ({ vDocumentType, vDocumentNumber }) => {
    if (typeof window !== 'undefined') {
      setLoading(true)
      window.dataLayer.push({
        event: 'paywall_check_subscriptor',
        eventCategory: 'paywall_check_subscriptor',
        eventAction: 'submit',
      })
      window.Identity.heartbeat()
        .then((resHeart) => {
          subDniToken(urls.subsDniToken, resHeart.accessToken)
            .then((resDniToken) => {
              if (resDniToken.token) {
                updateLoading(true)
                const isEvent = event ? `${event}/` : ''
                setTimeout(() => {
                  window.location.href = isProd
                    ? `/suscripcionesdigitales/${vDocumentType}/${vDocumentNumber}/${resDniToken.token}/${isEvent}`
                    : `/suscripcionesdigitales/${vDocumentType}/${vDocumentNumber}/${resDniToken.token}/${isEvent}?outputType=subscriptions`
                }, 1000)
              } else {
                window.console.error('Hubo un error con la respuesta') // Temporal hasta implementar Sentry
                setLoading(false)
              }
            })
            .catch((errDniToken) => {
              window.console.error(errDniToken) // Temporal hasta implementar Sentry
              setLoading(false)
            })
        })
        .catch((errHeart) => {
          window.console.error(errHeart) // Temporal hasta implementar Sentry
          setLoading(false)
        })
    }
    return ''
  }

  /**
   * Esta function se hizo para manejar mas
   * casos de precios sin tener que anidar ternarios.
   *
   * Se espera que el caso por defecto sea '' en lugar de undefined
   *
   * @param {number} amount
   * @returns {string} Monto del plan
   */
  const getPlanAmount = (amount) => {
    let planAmount = ''
    if (amount) planAmount = `S/ ${amount}.00`
    else if (amount === 0) planAmount = 'Gratis'
    return planAmount
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
                      {textsAttr.subscriber_detail_banner}
                      <span>{textsAttr.subscriber_regular_period}</span>
                    </p>
                  </>
                ) : (
                  <>
                    <h4>{texts.titleValidDni}</h4>
                    <p>
                      {texts.subTitleValidDni}
                      <span>especial para ti.</span>
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
                          onChange={(e) => {
                            handleOnChange(e)
                            setShowDocOption(e.target.value)
                          }}>
                          <option value="DNI">DNI</option>
                          <option value="CDI">CDI</option>
                          <option value="CEX">CEX</option>
                        </select>

                        <TextMask
                          mask={maskDocuments[vDocumentType]}
                          guide={false}
                          type="text"
                          name="vDocumentNumber"
                          maxLength={vDocumentType === 'DNI' ? '8' : '15'}
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
                          disabled={disable || loading}>
                          {loading ? 'Validando...' : 'Validar'}
                        </button>
                      </div>
                    </form>
                    {vDocumentNumberError && (
                      <span className={styles.tooltip}>
                        {vDocumentNumberError}
                      </span>
                    )}
                  </>
                )}
              </div>
            </>
          </div>
        </footer>
      )}

      {userStep !== 4 && (
        <section
          className="step__bottom"
          style={userStep === 5 ? { display: 'none' } : {}}>
          <button className={styles.btnDetail} type="button" id="btn-detail">
            <div>
              <span className="title-item">Resumen de pedido:</span>
              <h5 className="name-item">
                {planName}
                <span className="period-item">
                  {' - '} {period[userDataPlan.billingFrequency]}
                </span>
              </h5>
            </div>
            <div>
              <span className="price-item">
                {getPlanAmount(userDataPlan.amount)}
              </span>
              <i className={styles.iconUp} />
            </div>
          </button>
        </section>
      )}
    </>
  )
}

export const FooterLand = ({ arcType, btnOnTop }) => {
  const { arcSite } = useAppContext() || {}
  const { urls, texts } = PropertiesSite[arcSite]
  const { links } = PropertiesCommon
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
                    href={urls.homeUrl}
                    aria-label={arcSite}>
                    <div className="footer__content-logo" />
                  </a>
                  <p>
                    Llámanos al
                    <br />
                    <a href={links.callCenter} className="footer__content-link">
                      Call Center: 311-5100
                    </a>
                  </p>
                </div>
              </div>
              <div className="footer__item grid-four-two">
                <div className="footer__content-ayuda footer__content-accordion">
                  <input type="checkbox" defaultChecked onChange={() => {}} />
                  <i />
                  <h4 className="footer__content-title">Ayuda</h4>
                  <div className="cont">
                    <p>
                      <a
                        href={links.preguntas}
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
                        href={links.callCenter}
                        className="footer__content-link">
                        Call Center: 311-5100
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="footer__item grid-four-three">
                <div className="footer__content-legal footer__content-accordion">
                  <input type="checkbox" defaultChecked onChange={() => {}} />
                  <i />
                  <h4 className="footer__content-title">Legal</h4>
                  <div className="cont">
                    <p>
                      <a
                        href={urls.terminos}
                        target="_blank"
                        rel="noreferrer"
                        className="footer__content-link">
                        Términos y Condiciones
                      </a>
                    </p>
                    <p>
                      <a
                        href={urls.politicas}
                        target="_blank"
                        rel="noreferrer"
                        className="footer__content-link">
                        Política de Privacidad
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
                    <a
                      href={urls.twitter}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Twitter">
                      <i className="icon-twitter" />
                    </a>
                    <a
                      href={urls.facebook}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Facebook">
                      <i className="icon-facebook" />
                    </a>
                    <a
                      href={urls.instangram}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Instagram">
                      <i className="icon-instangram" />
                    </a>
                  </div>

                  {!PWA.isPWA() && (
                    <div className="footer__content-encuentranos-apps">
                      <a
                        href={urls.appStore}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="AppStore">
                        <i className="icon-appstore" />
                      </a>
                      <a
                        href={urls.googlePlay}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GooglePlay">
                        <i className="icon-googleplay" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="footer__end">
            <p>{texts.footerEnd}</p>
          </div>
        </div>
      </footer>
      {btnOnTop && (
        <button type="button" id="btn-arrow-top" className="arrow-up">
          <i />
        </button>
      )}
    </>
  )
}
