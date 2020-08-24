import React, { useState, useContext, useEffect } from 'react'
import { useFusionContext } from 'fusion:context'
import { AuthContext } from '../../../_context/auth'
import PropertiesSite from '../../../_dependencies/Properties'
import { paymentTraker } from '../../../_dependencies/Services'
import { getStorageInfo } from '../../../_dependencies/Session'
import {
  pushCxense,
  // PixelActions,
  // sendAction,
} from '../../../_dependencies/Taggeo'
import PWA from '../../../_dependencies/Pwa'

const styles = {
  step: 'step__left-progres',
  subtitle: 'step__left-subtitle',
  contConfirm: 'step__left-cont-confirm',
  noteConfirm: 'step__left-note-confirm',
  contButton: 'step__left-note-button',
  btn: 'step__left-btn-next',
  noteBenefist: 'step__left-note-benefist',
}

const Confirmation = ({ arcEnv }) => {
  const {
    arcSite,
    globalContent: { name, freeAccess },
  } = useFusionContext() || {}

  const { userPurchase, updateStep, userPeriod } = useContext(AuthContext)
  const { texts, urls } = PropertiesSite.common
  const { urls: urlsSite } = PropertiesSite[arcSite]
  const [loading, setLoading] = useState(false)
  const getCodeCxense = urlsSite.codeCxense[arcEnv]

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
    orderNumber = '',
  } = userPurchase

  const formatName = () => {
    const fullName = `${firstName} ${lastName} ${secondLastName || ''}`
    return fullName.length >= 77 ? `${fullName.substring(0, 80)}...` : fullName
  }

  const pushDates = () => {
    if (typeof window !== 'undefined') {
      const divStep = window.document.getElementById('main-steps')
      if (divStep) divStep.classList.add('bg-white')
      const { accessToken } = getStorageInfo()
      const origin =
        window.sessionStorage.getItem('paywall_type_modal') || 'organico'
      const referer = window.sessionStorage.getItem('paywall_last_url') || ''
      const confirm =
        window.sessionStorage.getItem('paywall_confirm_subs') || '3'

      pushCxense(getCodeCxense) // dispara script de Cxense
      paymentTraker(
        urls.paymentTracker[arcEnv],
        accessToken,
        arcSite,
        referer,
        origin,
        orderNumber,
        confirm
      )

      // sendAction(PixelActions.PAYMENT_CONFIRMATION, {
      //   transactionId: orderNumber,
      //   transactionAffiliation: arcSite,
      //   transactionTotal: paidTotal,
      //   transactionTax: 0,
      //   transactionShipping: 0,
      //   transactionProducts: [
      //     {
      //       sku,
      //       name: planName,
      //       category: 'Planes',
      //       price: amount,
      //       quantity: 1,
      //     },
      //   ],
      //   confirmacionID: subscriptionIDs[0], // Por ahora solo un producto
      //   periodo: billingFrequency,
      //   priceCode,
      //   suscriptorImpreso: !!printedSubscriber ? 'si' : 'no',
      //   medioCompra: origin,
      //   accesoGratis: !!freeAccess ? 'si' : 'no',
      //   referer,
      //   pwa: PWA.isPWA() ? 'si' : 'no',
      // })

      // dataLayer.push({
      //   event: 'checkoutOption',
      //   ecommerce: {
      //     checkout_option: {
      //       actionField: { step: 4 },
      //     },
      //   },
      // })

      // dataLayer.push({
      //   event: 'buy',
      //   ecommerce: {
      //     purchase: {
      //       actionField: {
      //         id: orderNumber,
      //         affiliation: 'Online Store',
      //         revenue: amount,
      //       },
      //       products: [
      //         {
      //           id: sku,
      //           name: productName,
      //           price: amount,
      //           brand: arcSite,
      //           category: planName,
      //           subCategory: Frecuency[billingFrequency],
      //         },
      //       ],
      //       dataUser: {
      //         id: window.Identity.userIdentity.uuid || uuid,
      //         name: `${firstName} ${lastName} ${secondLastName}`
      //           .replace(/\s*/, ' ')
      //           .trim(),
      //         email,
      //       },
      //     },
      //   },
      // })
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      const divStep = window.document.getElementById('main-steps')
      if (!userPurchase.status) {
        updateStep(2)
        if (divStep) divStep.classList.remove('bg-white')
      } else {
        pushDates()
      }
      if (freeAccess) {
        pushDates()
      }
    }
  }, [])

  const goToHome = () => {
    if (typeof window !== 'undefined') {
      setLoading(true)
      if (PWA.isPWA()) {
        PWA.pwaCloseWebView()
        return
      }
      const urlLocal = window.sessionStorage.getItem('paywall_last_url')
      let urlRedirect = urlsSite.mainHome[arcEnv]
      if (urlLocal) {
        urlRedirect =
          urlLocal !== '' && urlLocal !== '/suscripciones/'
            ? urlLocal
            : urlsSite.mainHome[arcEnv]
      }
      window.localStorage.removeItem('ArcId.USER_STEP')
      window.sessionStorage.removeItem('paywall_confirm_subs')
      window.sessionStorage.removeItem('paywall_type_modal')
      window.sessionStorage.removeItem('paywall_last_url')
      window.location.href = urlRedirect
    }
  }

  return (
    <>
      <ul className={styles.step}>
        <li className="active">Perfil</li>
        <li className="active">Pago</li>
        <li className="active">Confirmación</li>
      </ul>
      <h3 className={styles.subtitle}>
        {freeAccess
          ? 'Por ser un suscriptor premium'
          : 'Tu compra fue realizada'}
      </h3>

      <div className="form-confirmation">
        <div className={styles.contConfirm}>
          {/* <p className="title">Orden - Estado</p>
          <p className="description">{`${orderNumber} - ${status}`}</p> */}

          <p className="title">Paquete</p>
          <p className="description">{`${freeAccess ? name : userPeriod}`}</p>

          <p className="title">Nombre</p>
          <p className="description">
            {freeAccess
              ? `${freeAccess.firstName} ${freeAccess.lastName}`
              : formatName()}
          </p>

          <p className="title">Precio</p>
          <p className="description">{`${
            !freeAccess && total !== 0 ? `S/${total}.00` : 'Gratis'
          }`}</p>

          {!freeAccess && (
            <p className="description">{texts.rememberRecurrency}</p>
          )}

          {/* <p className="title">Email Suscriptor(a)</p>
          <p className="description">{email}</p> */}

          {/* <p className="title">Teléfono</p>
          <p className="description">{phone}</p> */}
        </div>
      </div>

      <div className={styles.noteConfirm}>
        <p className="description">
          {!freeAccess ? (
            <>
              {texts.sendEmailReciept} <strong>{email}</strong>
            </>
          ) : (
            <>
              {texts.successSubsFree} <strong>totalmente gratis</strong>
            </>
          )}
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

      {/* <div className={styles.noteBenefist}>
        <div className="img-club"></div>
        <p>{texts.knownBenefist}</p>

        <div className="apps">
          <a href={urlsSite.appStore} target="_blank" rel="noreferrer">
            <i className="icon-appstore"></i>
          </a>
          <a href={urlsSite.googlePlay} target="_blank" rel="noreferrer">
            <i className="icon-googleplay"></i>
          </a>
        </div>

        <p>{texts.downloadApps}</p>
      </div> */}
    </>
  )
}

export default Confirmation
