/* eslint-disable react/jsx-filename-extension */

/**
 * OJO Este componente cuenta con 2 tipos de Resume:
 * @Resume
 * @ResumePrint
 */

import React, { useState, useContext, useEffect } from 'react'
import { useFusionContext } from 'fusion:context'
import { AuthContext } from '../../_context/auth'
import PropertiesSite from '../../_dependencies/Properties'

const styles = {
  resume: 'step__right-resume-top',
  adquire: 'step__right-adquire',
  plan: 'step__right-name-plan',
  item: 'step__right-item-plan',
  selected: 'step__right-item-plan-selected',
  total: 'step__right-total',
  toolTip: 'tooltiptext-rightarrow tooltip-inactive',
}

const Resume = () => {
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
  } = useContext(AuthContext)

  const [checkPlan, setCheckPlan] = useState()
  const [totalPlan, setTotalPlan] = useState()
  const { urls } = PropertiesSite[arcSite]
  const { texts } = PropertiesSite.common
  const { firstName, lastName, secondLastName } = userProfile || {}

  const formatName = () => {
    const fullName = `${firstName || 'Usuario'} ${lastName ||
      ''} ${secondLastName || ''}`
    return fullName.length >= 77 ? `${fullName.substring(0, 80)}...` : fullName
  }

  const period = {
    month: 'Plan Mensual',
    year: 'Plan Anual',
  }

  useEffect(() => {
    const { priceCode, sku, amount, billingFrequency } = plans[0]
    updatePlan(priceCode, sku, 1)
    setCheckPlan(priceCode)
    setTotalPlan(amount)
    updatePeriod(period[billingFrequency.toLowerCase()])
  }, [])

  const callHelp = () => {
    if (typeof window !== 'undefined') {
      window.open(urls.clickHelp, '_blank')
    }
  }

  const handleChangeDates = () => {
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
  }

  return (
    <>
      <div className={styles.resume}>
        <h3>Resumen de pedido</h3>
        <button type="button" onClick={callHelp}>
          ¿Necesitas ayuda? <span>Te llamamos</span>
        </button>
        <button className="button-close" id="btn-detail-close" type="button">
          <i className="icon-close"></i>
        </button>
      </div>

      <p className={styles.adquire}>Estas adquiriendo:</p>
      <h2 className={styles.plan}>{name}</h2>

      {userStep === 3 ? (
        <div className="form-planes">
          {plans.map((item, i) => {
            if (checkPlan === item.priceCode) {
              return (
                <div key={`item-${i + 1}`} className={styles.selected}>
                  <button
                    className="step__btn-link"
                    type="button"
                    disabled={loadPage}
                    onClick={() => updateStep(2)}>
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
          {plans.map((item, i) => {
            return (
              <div className="tooltip" key={`item-${i + 1}`}>
                <label className={styles.item} htmlFor={`plan-${i + 1}`}>
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
                    }}
                    value={item.priceCode}
                  />
                  {period[item.billingFrequency.toLowerCase()]}
                  <div className="selected"></div>
                  <span className="checkmark"></span>
                  <span>
                    {item.amount === 0 ? 'Gratis' : `S/ ${item.amount}.00`}
                  </span>
                  <p>
                    <strong>{item.description.title}. </strong>
                    {item.description.description}
                  </p>
                </label>
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

      <div className={styles.total}>
        <p className="title">Total</p>
        <p className="price-total">S/ {totalPlan}.00</p>
      </div>

      {userStep === 3 && (
        <>
          <p className="step__right-adquire">Suscriptor:</p>
          <div className="step__right-verify-email">
            <button
              className="step__btn-link"
              type="button"
              disabled={loadPage}
              onClick={handleChangeDates}>
              Cambiar Datos
            </button>
            <h4>{formatName()}</h4>
            <p className="email">{userProfile.email}</p>
            <p>{texts.verifyEmail}</p>
          </div>
        </>
      )}
    </>
  )
}

export default Resume

// export const ResumePrint = () => {
//   const [groupDays, setGroupDays] = useState([])
//   const [groupPlans, setGroupPlans] = useState([])
//   const [checkedDay, setCheckedDay] = useState('3')
//   const [checkedPlan, setCheckedPlan] = useState('month')
//   const listPlans = window.plansGestion || []

//   const getUniqueListBy = key => [
//     ...new Map(listPlans.map(item => [item[key], item])).values(),
//   ]

//   const getPlansSelected = day =>
//     listPlans.filter(plan => {
//       return plan.days === day
//     })

//   const getPlansPrice = (group, month) => {
//     const demo = group.filter(plan => plan.period === month)[0]
//     return demo && demo.price
//   }

//   useEffect(() => {
//     setGroupPlans(getPlansSelected('3'))
//     setGroupDays(getUniqueListBy('days'))
//   }, [])

//   return (
//     <>
//       <div className="step__right-resume-top">
//         <h3>Resumen de pedido</h3>
//         <button type="button" onClick={() => {}}>
//           ¿Necesitas ayuda? <span>Te llamamos</span>
//         </button>
//         <button className="button-close" id="btn-detail-close" type="button">
//           <i className="icon-close"></i>
//         </button>
//       </div>
//       <p className="step__right-adquire">Estas adquiriendo:</p>
//       <h2 className="step__right-name-plan">Digital + Impreso</h2>
//       <div className="step__right-item-plan-group">
//         {groupDays.map((obj, i) => {
//           return (
//             <div className="tooltip" key={`grupo-${i + 1}`}>
//               <label className="step__right-item-plan-middle" htmlFor={obj.sku}>
//                 <input
//                   type="radio"
//                   id={obj.sku}
//                   name="reparto"
//                   checked={checkedDay === obj.days}
//                   onChange={() => {
//                     setCheckedDay(obj.days)
//                     setGroupPlans(getPlansSelected(obj.days))
//                   }}
//                 />
//                 {obj.title}
//                 <div className="selected"></div>
//                 <span className="checkmark"></span>
//               </label>
//               {i === 0 && (
//                 <span className={styles.toolTip} id="div-remember">
//                   Recuerda que puedes elegir entre nuestros diferentes planes.
//                   <button
//                     type="button"
//                     className="btn-link"
//                     id="btn-close-remember">
//                     Entendido
//                   </button>
//                 </span>
//               )}
//             </div>
//           )
//         })}

//         {/* <label className="step__right-item-plan-middle" htmlFor="plana">
//           <input type="radio" id="plana" name="reparto" checked />
//           Viernes, Sábado y Domingo
//           <div className="selected"></div>
//           <span className="checkmark"></span>
//         </label>

//         <label className="step__right-item-plan-middle" htmlFor="planb">
//           <input type="radio" id="planb" name="reparto" />
//           Los 7 días a la semana
//           <div className="selected"></div>
//           <span className="checkmark"></span>
//         </label> */}
//       </div>
//       <p className="step__right-adquire">Elige tu plan:</p>

//       {groupPlans.map((obj, i) => {
//         return (
//           <label
//             key={`grupo-${i + 1}`}
//             className="step__right-item-plan"
//             htmlFor={obj.period}>
//             <input
//               type="radio"
//               id={obj.period}
//               name="planes"
//               checked={checkedPlan === obj.period}
//               onChange={() => {
//                 setCheckedPlan(obj.period)
//               }}
//             />
//             {obj.subtitle}
//             <div className="selected"></div>
//             <span className="checkmark"></span>
//             <span>S/ {obj.price}.00</span>
//             <p>
//               <strong>{obj.duration}</strong> {obj.description}
//             </p>
//           </label>
//         )
//       })}
//       {/* <div className="tooltip">
//         <label className="step__right-item-plan" htmlFor="plan1">
//           <input type="radio" id="plan1" name="planes" checked />
//           Plan Mensual
//           <div className="selected"></div>
//           <span className="checkmark"></span>
//           <span>S/ 35.00</span>
//           <p>
//             <strong>Durante 1 mes.</strong> Luego S/45 al mes
//           </p>
//         </label>
//         <span
//           className="tooltiptext-rightarrow tooltip-active"
//           id="div-remember">
//           Recuerda que puedes elegir entre nuestros diferentes planes.
//           <button type="button" className="btn-link" id="btn-close-remember">
//             Entendido
//           </button>
//         </span>
//       </div>

//       <label className="step__right-item-plan" htmlFor="plan2">
//         <input type="radio" id="plan2" name="planes" />
//         Plan Anual
//         <div className="selected"></div>
//         <span className="checkmark"></span>
//         <span>S/ 459.00</span>
//         <p>
//           <strong>Por el primer año.</strong> Luego S/204 al año
//         </p>
//       </label> */}
//       <div className="step__right-total">
//         <p className="title">Total</p>
//         <p className="price-total">
//           S/{getPlansPrice(groupPlans, checkedPlan)}.00
//         </p>
//       </div>
//     </>
//   )
// }
