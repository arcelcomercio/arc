import React, { useState, useContext, useEffect } from 'react'
import { useFusionContext } from 'fusion:context'
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
}
const nameTagCategory = 'Web_Paywall_Landing'
const Summary = () => {
  const {
    arcSite,
    globalContent: { plans = [], name },
  } = useFusionContext() || {}

  const {
    loadPage,
    userStep,
    userProfile,
    updateStep,
    updatePlan,
    updatePeriod,
    updateDataPlan,
  } = useContext(AuthContext)

  const [checkPlan, setCheckPlan] = useState()
  const [totalPlan, setTotalPlan] = useState()
  const [orderPlans, setOrderPlans] = useState([])
  const { urls } = PropertiesSite[arcSite]
  const { texts } = PropertiesCommon
  const { firstName = '', lastName = '', secondLastName = '' } =
    userProfile || {}

  const period = {
    month: 'Plan Mensual',
    year: 'Plan Anual',
  }

  useEffect(() => {
    const getPLanSelected = plans.reduce((prev, plan) => {
      return plan.description.checked ? plan : prev
    }, null)
    const OrderForce = plans.sort((a, b) => b.amount - a.amount)
    const { priceCode, sku, amount, billingFrequency } = getPLanSelected

    setOrderPlans(OrderForce)
    updatePlan(priceCode, sku, 1)
    setCheckPlan(priceCode)
    setTotalPlan(amount)
    updatePeriod(period[billingFrequency.toLowerCase()])
    updateDataPlan(amount, billingFrequency)
  }, [])

  // const callHelp = () => {
  //   if (typeof window !== 'undefined') {
  //     window.open(urls.clickHelp, '_blank')
  //   }
  // }

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

  return (
    <div className={styles.boxResume}>
      <div className={styles.resume}>
        <h3>Resumen de pedido</h3>
        {/* <button type="button" onClick={callHelp}>
          ¿Necesitas ayuda? <span>Te llamamos</span>
        </button> */}
        <div className="isotipo"></div>
        <button className="button-close" id="btn-detail-close" type="button">
          <span>Cerrar</span> <i className="icon-close"></i>
        </button>
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
                  <h4>{period[item.billingFrequency.toLowerCase()]}</h4>
                  <span>
                    {item.amount === 0 ? 'Gratis' : `S/ ${item.amount}.00`}
                  </span>
                  <p>
                    <strong>{item.description.title}. </strong>
                    {item.description.description}
                  </p>
                </div>
              )
            }
            return ''
          })}
        </div>
      ) : (
        <div className="form-planes">
          {orderPlans.map((item, i) => {
            return (
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
                      updatePeriod(period[item.billingFrequency.toLowerCase()])
                      updateDataPlan(item.amount, item.billingFrequency)
                    }}
                    value={item.priceCode}
                  />
                  {period[item.billingFrequency.toLowerCase()]}
                  <span>
                    {item.amount === 0 ? 'Gratis' : `S/ ${item.amount}.00`}
                  </span>
                  <div className="selected"></div>
                  <span className="checkmark"></span>
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

                {/* {i === 0 && (
                  <span className={styles.toolTip} id="div-remember">
                    {texts.RememberChose}
                    <button
                      type="button"
                      className="btn-link"
                      id="btn-close-remember">
                      Entendido
                    </button>
                  </span>
                )} */}
              </div>
            )
          })}
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
            <li>Acceso a descuentos ilimitados en Club de beneficios.</li>
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
            <p>{texts.verifyEmail}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default Summary
