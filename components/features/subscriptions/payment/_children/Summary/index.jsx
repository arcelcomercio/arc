import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { AuthContext } from '../../../_context/auth'
import {
  PropertiesCommon,
  PropertiesSite,
} from '../../../_dependencies/Properties'
import { isLogged } from '../../../_dependencies/Session'
import { Taggeo } from '../../../_dependencies/Taggeo'
import { getFullNameFormat } from '../../../_dependencies/Utils'

const styles = {
  boxResume: 'step__right-box-resume',
  resume: 'step__right-resume-top',
  adquire: 'step__right-adquire',
  plan: 'step__right-name-plan',
  item: 'step__right-item-plan',
  selected: 'step__right-item-plan-selected',
  recommended: 'step__right-item-plan-recommended',
  total: 'step__right-total',
  toolTip: 'tooltiptext-rightarrow tooltip-inactive',
  boxEmail: 'step__right-verify-email',
  stepLink: 'step__btn-link',
  benefits: 'step__right-benefits',
  notes: 'step__notes-footer',
}
const nameTagCategory = 'Web_Paywall_Landing'
const Summary = () => {
  const {
    arcSite,
    globalContent: { plans = [], name },
  } = useAppContext() || {}

  const {
    loadPage,
    userStep,
    userProfile,
    userMethodPay,
    updateStep,
    updatePlan,
    updatePeriod,
    updateDataPlan,
  } = React.useContext(AuthContext)

  const [checkPlan, setCheckPlan] = React.useState()
  const [totalPlan, setTotalPlan] = React.useState()
  const [orderPlans, setOrderPlans] = React.useState([])
  const { urls } = PropertiesSite[arcSite]
  const { texts } = PropertiesCommon
  const { firstName = '', lastName = '', secondLastName = '' } =
    userProfile || {}

  const period = {
    month: 'Mensual',
    year: 'Anual',
    semester: 'Semestral',
  }

  React.useEffect(() => {
    const getPLanSelected = plans.reduce(
      (prev, plan) => (plan.description.checked ? plan : prev),
      null
    )
    const OrderForce = plans.sort((a, b) => b.amount - a.amount)
    const { priceCode, sku, amount, billingFrequency, description } =
      getPLanSelected || {}

    const frecuencyPlan =
      description.frecuencia_plan || billingFrequency.toLowerCase()

    setOrderPlans(OrderForce)
    updatePlan(priceCode, sku, 1)
    setCheckPlan(priceCode)
    setTotalPlan(amount)
    updatePeriod(period[frecuencyPlan])
    updateDataPlan(amount, frecuencyPlan)
  }, [])

  const handleChangeDates = () => {
    if (typeof window !== 'undefined') {
      if (isLogged()) {
        updateStep(2)
        const divDetail = document.getElementById('div-detail')
        const btnDetail = document.getElementById('btn-detail')
        const divFooter = document.getElementById('footer')
        if (divDetail && btnDetail && divFooter) {
          divDetail.classList.remove('step__show-detail')
          btnDetail.classList.remove('step__hidden')
          divFooter.classList.remove('step__hidden')
          document.body.classList.remove('no-scroll')
          document.body.classList.remove('bg-shop')
        }
        Taggeo(nameTagCategory, 'web_paywall_change_data')
      } else {
        window.location.reload()
      }
    }
  }

  const handleChangePlan = () => {
    if (typeof window !== 'undefined') {
      if (isLogged()) {
        updateStep(2)
        Taggeo(nameTagCategory, 'web_paywall_change_plan')
      } else {
        window.location.reload()
      }
    }
  }

  const linkClub = 'https://clubelcomercio.pe/?ref=suscripcionesdigitales'

  return (
    <>
      <div className={styles.boxResume}>
        <button className="button-close" id="btn-detail-close" type="button">
          <span>Cerrar</span> <i className="icon-close" />
        </button>

        <div className={styles.resume}>
          <h3>Resumen de pedido</h3>
          <div className="isotipo" />
        </div>

        <p className={styles.adquire}>Estas adquiriendo</p>
        <h2 className={styles.plan}>{name}</h2>

        {userStep === 3 ? (
          <div className="form-planes">
            {orderPlans.map((item, i) => {
              if (checkPlan === item.priceCode) {
                return (
                  <div key={`item-${i + 1}`} className={styles.selected}>
                    <button
                      className={styles.stepLink}
                      type="button"
                      disabled={loadPage}
                      onClick={handleChangePlan}>
                      Cambiar Plan
                    </button>
                    <h4>
                      {
                        period[
                          item.description.frecuencia_plan ||
                            item.billingFrequency.toLowerCase()
                        ]
                      }
                    </h4>
                    <span>
                      {item.amount === 0 ? 'Gratis' : `S/ ${item.amount}.00`}
                    </span>
                    <p>
                      <strong>{item.description.title}. </strong>
                      {userMethodPay !== 'payEfectivo' &&
                        item.description.description}
                    </p>
                  </div>
                )
              }
              return ''
            })}
          </div>
        ) : (
          <div className="form-planes">
            {orderPlans.map((item, i) => (
              <div className="tooltip" key={`item-${i + 1}`}>
                <label
                  className={`${styles.item} ${
                    checkPlan === item.priceCode ? 'selected' : ''
                  }`}
                  htmlFor={`plan-${i + 1}`}>
                  <input
                    type="radio"
                    name={`plan-${i + 1}`}
                    id={`plan-${i + 1}`}
                    checked={checkPlan === item.priceCode}
                    onChange={() => {
                      setCheckPlan(item.priceCode)
                      setTotalPlan(item.amount)
                      updatePlan(item.priceCode, item.sku, 1)
                      updatePeriod(
                        period[
                          item.description.frecuencia_plan ||
                            item.billingFrequency.toLowerCase()
                        ]
                      )
                      updateDataPlan(
                        item.amount,
                        item.description.frecuencia_plan ||
                          item.billingFrequency.toLowerCase()
                      )
                    }}
                    value={item.priceCode}
                  />
                  {
                    period[
                      item.description.frecuencia_plan ||
                        item.billingFrequency.toLowerCase()
                    ]
                  }
                  <span>
                    {item.amount === 0 ? 'Gratis' : `S/ ${item.amount}.00`}
                  </span>
                  <div className="selected" />
                  <span className="checkmark" />
                  <p>
                    <strong>{item.description.title}. </strong>
                    {item.description.description}
                  </p>
                </label>

                {item.description.recommended && (
                  <span className={styles.recommended}>
                    {item.description.recommended}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {userStep === 3 ? (
          <div className={styles.total}>
            <p className="title">Total</p>
            <p className="price-total">S/ {totalPlan}.00</p>
          </div>
        ) : (
          <div className={styles.benefits}>
            <h3>Tu suscripción digital contiene:</h3>
            <ul>
              <li>
                Acceso ilimitado a artículos premium:
                {arcSite === 'elcomercio' ? (
                  <ul>
                    <li>Contenido exclusivo.</li>
                    <li>
                      Reportajes, entrevistas, análisis y firmas exclusivas.
                    </li>
                    <li>Expertos en entender la actualidad.</li>
                  </ul>
                ) : (
                  <ul>
                    <li>
                      Contenido elaborada exclusivamente por el equipo
                      periodístico de Gestión.
                    </li>
                    <li>
                      La mejor selección de artículos de The Economist y
                      Bloomberg.
                    </li>
                  </ul>
                )}
              </li>
              <li>
                Navegación ilimitada en{' '}
                <a href={urls.mainHome} target="_blank" rel="noreferrer">
                  {arcSite}.pe
                </a>{' '}
                desde cualquier dispositivo.
              </li>
              <li>
                Acceso a descuentos ilimitados en{' '}
                <a href={linkClub} target="_blank" rel="noreferrer">
                  Club de beneficios.
                </a>
              </li>
              <li>Hasta 50% menos de publicidad.</li>
            </ul>
          </div>
        )}

        {userStep === 3 && (
          <>
            <p className={styles.adquire}>Suscriptor:</p>
            <div className={styles.boxEmail}>
              <button
                className={styles.stepLink}
                type="button"
                disabled={loadPage}
                onClick={handleChangeDates}>
                Cambiar Datos
              </button>
              <h4>{getFullNameFormat(firstName, lastName, secondLastName)}</h4>
              <p className="email">{userProfile && userProfile.email}</p>
              {userMethodPay === 'cardCreDeb' && <p>{texts.verifyEmail}</p>}
              {userMethodPay === 'payEfectivo' && (
                <p>{texts.verifyEmailPayEfec}</p>
              )}
            </div>
          </>
        )}
      </div>
      {userStep === 3 && userMethodPay === 'cardCreDeb' && (
        <p className={styles.notes}>{texts.rememberRecurrency}</p>
      )}
      <br />
      <br />
    </>
  )
}

export default Summary
