import { useAppContext } from 'fusion:context'
import * as React from 'react'
import {
  PaywallCampaign,
  SubsArcSite,
  SubscriptionPlan,
} from 'types/subscriptions'

import {
  formatUsername,
  isLoggedIn,
} from '../../../../../utilities/subscriptions/identity'
import { frequencies } from '../../../../../utilities/subscriptions/sales'
import { useAuthContext } from '../../../_context/auth'
import {
  PropertiesCommon,
  PropertiesSite,
} from '../../../_dependencies/Properties'
import { Taggeo } from '../../../_dependencies/Taggeo'

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

const Summary = (): JSX.Element => {
  const {
    arcSite,
    globalContent: { plans = [], name = '' } = {},
  } = useAppContext<PaywallCampaign>()

  const {
    loadPage,
    // userDataPlan,
    userStep,
    userProfile,
    userMethodPay,
    updateStep,
    updatePlan,
    updatePeriod,
    updateDataPlan,
    updateMethodPay,
  } = useAuthContext()

  const [checkPlan, setCheckPlan] = React.useState<
    SubscriptionPlan['priceCode']
  >()
  const [totalPlan, setTotalPlan] = React.useState<SubscriptionPlan['amount']>()
  const [sortedPlans, setSortedPlans] = React.useState<SubscriptionPlan[]>([])
  const { urls } = PropertiesSite[arcSite as SubsArcSite]
  const { texts } = PropertiesCommon
  const { firstName = '', lastName = '', secondLastName = '' } =
    userProfile || {}

  React.useEffect(() => {
    const selectedPlan = plans.find((plan) => plan.description.checked)

    const { priceCode = '', sku = '', amount, billingFrequency, description } =
      selectedPlan || {}

    const frecuencyPlan = description?.frecuencia_plan || billingFrequency

    setSortedPlans(plans.sort((a, b) => b.amount - a.amount))
    updatePlan(priceCode, sku, 1)
    setCheckPlan(priceCode)
    setTotalPlan(amount)

    if (frecuencyPlan) {
      updatePeriod(frequencies[frecuencyPlan])
      if (typeof amount === 'number') {
        updateDataPlan(amount, frecuencyPlan)
      }
    }
  }, [])

  const handleChangeDates = async () => {
    if (typeof window !== 'undefined') {
      if (isLoggedIn()) {
        updateStep(2)
        updateMethodPay('cardCreDeb')
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

  const handleChangePlan = async () => {
    if (typeof window !== 'undefined') {
      if (isLoggedIn()) {
        updateStep(2)
        updateMethodPay('cardCreDeb')
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
            {sortedPlans.map((item, i) => {
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
                        frequencies[
                          item.description.frecuencia_plan ||
                            item.billingFrequency
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
            {sortedPlans.map((item, i) => (
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
                        frequencies[
                          item.description.frecuencia_plan ||
                            item.billingFrequency
                        ]
                      )
                      updateDataPlan(
                        item.amount,
                        item.description.frecuencia_plan ||
                          item.billingFrequency
                      )
                    }}
                    value={item.priceCode}
                  />
                  {
                    frequencies[
                      item.description.frecuencia_plan || item.billingFrequency
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
              <h4>
                {formatUsername(`${firstName} ${lastName} ${secondLastName}`)}
              </h4>
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
