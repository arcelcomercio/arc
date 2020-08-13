/* eslint-disable react/jsx-filename-extension */
import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../_context/auth'
import PropertiesSite from '../../_dependencies/Properties'
import { paymentTraker } from '../../_dependencies/Services'

const styles = {
  step: 'step__left-progres',
  subtitle: 'step__left-subtitle',
  contConfirm: 'step__left-cont-confirm',
  noteConfirm: 'step__left-note-confirm',
  contButton: 'step__left-note-button',
  btn: 'step__left-btn-next',
  noteBenefist: 'step__left-note-benefist',
}

const Confirmation = ({ arcSite, arcEnv }) => {
  const { userPurchase, updateStep, userPeriod } = useContext(AuthContext)
  const { texts, urls } = PropertiesSite.common
  const { urls: urlsSite } = PropertiesSite[arcSite]
  const [loading, setLoading] = useState(false)

  const {
    // currency,
    email,
    firstName,
    // items,
    lastName,
    secondLastName = '',
    // phone,
    // status,
    total,
    orderNumber,
  } = userPurchase

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const divStep = document.getElementById('main-steps')
      if (divStep) divStep.classList.add('bg-white')

      if (!userPurchase.status) {
        updateStep(2)
      } else {
        const { accessToken } = window.Identity.userIdentity
        const origin =
          window.sessionStorage.getItem('paywall_type_modal') || 'organico'
        const referer =
          window.sessionStorage.getItem('paywall_last_url') || 'none'
        const confirm =
          window.sessionStorage.getItem('paywall_confirm_subs') || '3'

        paymentTraker(
          urls.paymentTracker[arcEnv],
          accessToken,
          arcSite,
          referer,
          origin,
          orderNumber,
          confirm
        )
      }
    }
  }, [])

  const goToHome = () => {
    if (typeof window !== 'undefined') {
      setLoading(true)
      window.location.href =
        // eslint-disable-next-line no-nested-ternary
        window.sessionStorage.hasOwnProperty('paywall_last_url') &&
        window.sessionStorage.getItem('paywall_last_url') !== ''
          ? window.sessionStorage.getItem('paywall_last_url') ===
            '/suscripciones/'
            ? urlsSite.mainHome
            : window.sessionStorage.getItem('paywall_last_url')
          : urlsSite.mainHome
    }
  }

  return (
    <>
      <ul className={styles.step}>
        <li className="active">Perfil</li>
        <li className="active">Pago</li>
        <li className="active">Confirmación</li>
      </ul>
      <h3 className={styles.subtitle}>Tu compra fue realizada</h3>

      <div className="form-confirmation">
        <div className={styles.contConfirm}>
          {/* <p className="title">Orden - Estado</p>
          <p className="description">{`${orderNumber} - ${status}`}</p> */}

          <p className="title">Paquete</p>
          <p className="description">{`${userPeriod}`}</p>

          <p className="title">Nombre</p>
          <p className="description">
            {`${firstName} ${lastName} ${secondLastName}`}
          </p>

          <p className="title">Precio</p>
          <p className="description">{`S/ ${total}.00`}</p>
          <p className="description">{texts.rememberRecurrency}</p>

          {/* <p className="title">Email Suscriptor(a)</p>
          <p className="description">{email}</p> */}

          {/* <p className="title">Teléfono</p>
          <p className="description">{phone}</p> */}
        </div>
      </div>

      <div className={styles.noteConfirm}>
        <p className="description">
          {texts.sendEmailReciept} <strong>{email}</strong>
          {/* {texts.rememberBenefist} */}
        </p>
      </div>

      <div className={styles.contButton}>
        <button
          className={styles.btn}
          type="button"
          onClick={goToHome}
          disabled={loading}>
          {loading ? 'Redireccionando...' : 'Seguir navegando'}
        </button>
      </div>

      <div className={styles.noteBenefist}>
        {/* <div className="img-club"></div>
        <p>{texts.knownBenefist}</p> */}

        <div className="apps">
          <a href={urlsSite.appStore} target="_blank" rel="noreferrer">
            <i className="icon-appstore"></i>
          </a>
          <a href={urlsSite.googlePlay} target="_blank" rel="noreferrer">
            <i className="icon-googleplay"></i>
          </a>
        </div>

        <p>{texts.downloadApps}</p>
      </div>
    </>
  )
}

export default Confirmation
