import React, { useState, useContext, useEffect } from 'react'
import { useFusionContext } from 'fusion:context'
import { AuthContext } from '../../../_context/auth'
import { paymentTraker } from '../../../_dependencies/Services'
import { getStorageInfo } from '../../../_dependencies/Session'
import { SubscribeEventTag } from '../Singwall/_children/fb-account-linking'
import PWA from '../../../_dependencies/Pwa'
import {
  PropertiesSite,
  PropertiesCommon,
} from '../../../_dependencies/Properties'
import {
  pushCxense,
  PixelActions,
  sendAction,
} from '../../../_dependencies/Taggeo'
import {
  getFullNameFormat,
  getSessionStorage,
} from '../../../_dependencies/Utils'

const styles = {
  step: 'step__left-progres',
  subtitle: 'step__left-subtitle',
  contConfirm: 'step__left-cont-confirm',
  noteConfirm: 'step__left-note-confirm',
  contButton: 'step__left-note-button',
  btn: 'step__left-btn-next',
  noteBenefist: 'step__left-note-benefist',
}

const Confirmation = () => {
  const {
    arcSite,
    globalContent: {
      name: namePlanApi,
      plans = [],
      freeAccess,
      fromFia,
      printedSubscriber,
    },
  } = useFusionContext() || {}

  const {
    userPurchase,
    updateStep,
    userPeriod,
    userPlan,
    userProfile,
  } = useContext(AuthContext)

  const { texts, urls } = PropertiesCommon
  const { urls: urlsSite } = PropertiesSite[arcSite]
  const [loading, setLoading] = useState(false)

  const {
    email,
    firstName = '',
    lastName = '',
    secondLastName = '',
    items = [],
    total,
    subscriptionIDs,
    orderNumber,
  } = userPurchase || {}

  const { priceCode: priceCodePurchase, price: pricePurchase } = items[0] || {}

  const Frecuency = {
    Month: 'Mensual',
    Year: 'Anual',
    OneTime: 'Mensual',
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const divStep = window.document.getElementById('main-steps')
      const divDetail = document.getElementById('div-detail')
      const divFooter = document.getElementById('footer')
      const { uuid, accessToken } = getStorageInfo()
      const origin = getSessionStorage('paywall_type_modal') || 'organico'
      const referer = getSessionStorage('paywall_last_url') || ''
      const confirm = getSessionStorage('paywall_confirm_subs') || '3'
      window.scrollTo({ top: 0, behavior: 'smooth' })

      const getPLanSelected = plans.reduce((prev, plan) => {
        return plan.priceCode === userPlan.priceCode ? plan : prev
      }, null)

      if (freeAccess || (userPurchase && userPurchase.status)) {
        if (divStep) divStep.classList.add('bg-white')
        if (divDetail) divDetail.classList.remove('step__show-detail')
        if (divFooter) divFooter.classList.remove('step__hidden')
        document.body.classList.remove('no-scroll')

        const { sku, name, amount, billingFrequency, priceCode, productName } =
          getPLanSelected || {}

        PWA.finalize()
        pushCxense(urlsSite.codeCxense)
        paymentTraker(
          urls.paymentTracker,
          accessToken,
          arcSite,
          referer,
          origin,
          orderNumber,
          confirm
        )

        sendAction(PixelActions.PAYMENT_CONFIRMATION, {
          transactionId: orderNumber,
          transactionAffiliation: arcSite,
          transactionTotal: total,
          transactionTax: 0,
          transactionShipping: 0,
          transactionProducts: [
            {
              sku,
              name,
              category: 'Planes',
              price: amount,
              quantity: 1,
            },
          ],
          confirmacionID: (subscriptionIDs && subscriptionIDs[0]) || '', // Por ahora solo un producto
          periodo: billingFrequency,
          priceCode,
          suscriptorImpreso: printedSubscriber ? 'si' : 'no',
          medioCompra: origin,
          accesoGratis: freeAccess ? 'si' : 'no',
          referer,
          pwa: PWA.isPWA() ? 'si' : 'no',
        })

        window.dataLayer.push({
          event: 'checkoutOption',
          ecommerce: {
            checkout_option: {
              actionField: { step: 4 },
            },
          },
        })

        window.dataLayer.push({
          event: 'buy',
          ecommerce: {
            purchase: {
              actionField: {
                id: orderNumber,
                affiliation: 'Online Store',
                revenue: amount,
              },
              products: [
                {
                  id: sku,
                  name: productName,
                  price: amount,
                  brand: arcSite,
                  category: name,
                  subCategory: Frecuency[billingFrequency],
                },
              ],
              dataUser: {
                id: userProfile.uuid || uuid,
                name: `${firstName} ${lastName} ${secondLastName}`
                  .replace(/\s*/, ' ')
                  .trim(),
                email,
              },
            },
          },
        })

        window.fbq('track', 'Purchase', {
          content_name: productName,
          content_ids: [sku],
          content_type: productName,
          contents: [{ id: sku, quantity: 1 }],
          currency: 'PEN',
          num_items: 1,
          value: amount,
        })
      } else {
        updateStep(2)
        if (divStep) divStep.classList.remove('bg-white')
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
      const urlLocal = getSessionStorage('paywall_last_url')
      let urlRedirect = urlsSite.mainHome
      if (urlLocal) {
        urlRedirect =
          urlLocal !== '' && urlLocal !== '/suscripciones/'
            ? urlLocal
            : urlsSite.mainHome
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
      {userProfile && priceCodePurchase && pricePurchase && (
        <SubscribeEventTag
          subscriptionId={userProfile.uuid}
          offerCode={priceCodePurchase}
          currency="PEN"
          value={pricePurchase}
        />
      )}

      <ul className={styles.step}>
        <li className="active">Perfil</li>
        <li className="active">Pago</li>
        <li className="active">Confirmación</li>
      </ul>
      <h3 className={styles.subtitle}>
        {freeAccess
          ? `Por ser un suscriptor premium accede a ${arcSite}.pe totalmente gratis`
          : 'Tu compra fue realizada'}
      </h3>

      <div className="form-confirmation">
        <div className={styles.contConfirm}>
          <p className="title">Paquete</p>
          <p className="description">{`${
            freeAccess ? namePlanApi : userPeriod
          }`}</p>

          <p className="title">Nombre</p>
          <p className="description">
            {freeAccess
              ? `${freeAccess.firstName} ${freeAccess.lastName}`
              : getFullNameFormat(firstName, lastName, secondLastName)}
          </p>

          <p className="title">Precio</p>
          <p className="description">{`${
            !freeAccess && total !== 0 ? `S/${total}.00` : 'Gratis'
          }`}</p>

          {!freeAccess && (
            <p className="description">{texts.rememberRecurrency}</p>
          )}
        </div>
      </div>

      <div className={styles.noteConfirm}>
        <p className="description">
          {!freeAccess ? (
            <>
              {texts.sendEmailReciept} <strong>{email}</strong>
            </>
          ) : (
            <>{texts.successSubsFree}</>
          )}
        </p>
      </div>

      {!fromFia && (
        <div className={styles.contButton}>
          <button
            className={styles.btn}
            type="button"
            onClick={goToHome}
            disabled={loading}>
            {loading ? 'Redireccionando...' : 'Seguir navegando'}
          </button>
        </div>
      )}
    </>
  )
}

export default Confirmation
