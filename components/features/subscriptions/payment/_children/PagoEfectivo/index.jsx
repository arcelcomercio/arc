import * as Sentry from '@sentry/browser'
import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

import Loading from '../../../../signwall/_children/loading'
import { AuthContext } from '../../../_context/auth'
import {
  PropertiesCommon,
  PropertiesSite,
} from '../../../_dependencies/Properties'
import PWA from '../../../_dependencies/Pwa'
import { cipPayEfectivo } from '../../../_dependencies/Services'
import { conformProfile, isLogged } from '../../../_dependencies/Session'
import { eventCategory, TaggeoJoao } from '../../../_dependencies/Taggeo'
import { getSessionStorage, getUserAgent } from '../../../_dependencies/Utils'

const styles = {
  step: 'step__left-progres',
  subtitle: 'step__left-subtitle',
  cipWrapper: 'step__left-cip',
  contButton: 'step__left-note-button',
  btn: 'step__left-btn-next',
}

const Confirmation = () => {
  const [dateTime] = React.useState(new Date())
  const utcDate = new Date(dateTime.getTime() - 300 * 60000).toISOString()
  const timeClearToken = utcDate.split('.')[0]

  const {
    arcSite,
    globalContent: { plans = [], printedSubscriber, event, fromFia },
  } = useAppContext() || {}

  const { data: { token = '' } = {}, error } =
    useContent({
      source: 'paywall-pago-efectivo',
      query: {
        clientTime: timeClearToken,
      },
    }) || {}

  const {
    updateStep,
    userPeriod,
    userPlan,
    userProfile,
    userPeOption,
  } = React.useContext(AuthContext)

  const {
    uuid,
    email,
    phone,
    firstName,
    lastName,
    secondLastName = '',
    documentType,
    documentNumber,
  } = conformProfile(userProfile || {})

  const { urls: urlCommon, tokens } = PropertiesCommon
  const { urls: urlsSite } = PropertiesSite[arcSite]
  const [redirecting, setRedirecting] = React.useState(false)
  /** type CipLink = string | null */
  const [cipLink, setCipLink] = React.useState(null)

  const getCipPayEfectivo = () => {
    const getPLanSelected = plans.reduce(
      (prev, plan) => (plan.priceCode === userPlan.priceCode ? plan : prev),
      null
    )

    const { amount, priceCode, name } = getPLanSelected || {}

    const getUtcDate = new Date(dateTime.getTime() - 300 * 60000)
    const set24Hours = new Date(
      getUtcDate.setDate(getUtcDate.getDate() + 1)
    ).toISOString()
    const timeClearCip = set24Hours.split('.')[0]

    if (amount) {
      const dataCIP = {
        currency: 'PEN',
        amount,
        payment_concept: `${name} - ${userPeriod}`,
        user_email: email,
        user_id: userProfile.uuid || uuid,
        user_name: firstName,
        lastname_father: `${lastName}`,
        lastname_mother: `${secondLastName || ''}`,
        user_document_type: documentType,
        user_document_number: documentNumber,
        date_expiry: `${timeClearCip.replace('T', ' ')}-05:00`,
        user_code_country: '+51',
        user_phone: phone,
        price_code: priceCode,
        token,
        url_referer: getSessionStorage('paywall_last_url') || '',
        medium: getSessionStorage('paywall_type_modal') || 'organico',
        confirm_subscription: getSessionStorage('paywall_confirm_subs') || '3',
        user_agent: getUserAgent,
        is_pwa: PWA.isPWA() ? 1 : 2,
      }

      cipPayEfectivo(urlCommon.cipPayEfectivo, tokens.paymentTracker, dataCIP)
        .then((resCIP) => {
          const { response: { data: { cipUrl = '', cip = '' } = {} } = {} } =
            resCIP || {}
          if (cipUrl === '' || cip === '') {
            setCipLink('error')
          } else {
            setCipLink(cipUrl)
            TaggeoJoao(
              {
                event: 'Pasarela Suscripciones Digitales',
                category: eventCategory({
                  step: 2.5,
                  event,
                  hasPrint: printedSubscriber,
                  plan: name,
                  cip: true,
                }),
                action: `${userPeriod} | PE - ${userPeOption} - ${cip}`,
                label: userProfile.uuid || uuid,
              },
              window.location.pathname
            )
          }
        })
        .catch((errCIP) => {
          Sentry.captureEvent({
            message: 'Error al generar CIP',
            level: 'error',
            extra: errCIP || {},
          })
          setCipLink('error')
          TaggeoJoao(
            {
              event: 'Pasarela Suscripciones Digitales',
              category: eventCategory({
                step: 2.5,
                event,
                hasPrint: printedSubscriber,
                plan: name,
                cancel: true,
              }),
              action: `${userPeriod}  | PE - ${userPeOption} - ${
                errCIP || 'Error al generar CIP'
              }`,
              label: uuid,
            },
            window.location.pathname
          )
        })
    } else {
      updateStep(2)
    }
  }

  React.useEffect(() => {
    Sentry.configureScope((scope) => {
      scope.setTag('step', 'cip')
    })
    Sentry.addBreadcrumb({
      type: 'info',
      category: 'confirmación CIP',
      message: 'Confirmacion Pago Efectivo',
      level: 'info',
    })

    // reset step para que no pueda recargar esta pagina
    window.sessionStorage.removeItem('ArcId.USER_STEP')
    window.scrollTo(0, 0)

    if (!isLogged()) {
      setTimeout(() => {
        updateStep(1)
        window.location.reload()
      }, 1000)
    }
  }, [])

  React.useEffect(() => {
    if (token && !cipLink) {
      if (token === '') {
        Sentry.captureEvent({
          message: 'Error al generar Token CIP',
          level: 'error',
          extra: error || {},
        })
        setCipLink('error')
      } else {
        getCipPayEfectivo()
      }
    }
  }, [token])

  const goToHome = () => {
    if (typeof window !== 'undefined') {
      setRedirecting(true)
      if (PWA.isPWA()) {
        PWA.pwaCloseWebView()
        return
      }
      window.sessionStorage.removeItem('ArcId.USER_STEP')
      window.sessionStorage.removeItem('paywall_confirm_subs')
      window.sessionStorage.removeItem('paywall_type_modal')
      window.sessionStorage.removeItem('paywall_last_url')
      window.location.href = urlsSite.mainHome
    }
  }

  const getHeading = () => {
    let heading = ''
    switch (cipLink) {
      case 'error':
        heading = (
          <span>Ha ocurrido un error al generar el Código de pago (CIP).</span>
        )
        break
      case null:
        heading = (
          <>
            <span>Generando Código de pago (CIP), por favor espere...</span>
            <Loading typeBg="block" />
          </>
        )
        break
      default:
        heading = <span>¡Estás a un paso de finalizar la compra!</span>
        break
    }
    return heading
  }

  return (
    <>
      <ul className={styles.step}>
        <li className="active">Perfil</li>
        <li className="active">Pago</li>
        <li className="active">Confirmación</li>
      </ul>

      <h3 className={styles.subtitle}>{getHeading()}</h3>

      <div className="form-confirmation">
        {cipLink !== 'error' ? (
          <div className={styles.cipWrapper}>
            {cipLink ? (
              <iframe
                title="pago-efectivo"
                src={cipLink}
                width="100%"
                height="100%"
                frameBorder="0"
              />
            ) : null}
          </div>
        ) : null}
      </div>

      {!fromFia && (
        <div className={styles.contButton}>
          {cipLink !== 'error' ? (
            <button
              className={styles.btn}
              type="button"
              onClick={goToHome}
              disabled={redirecting}>
              {redirecting ? 'Redireccionando...' : 'Seguir navegando'}
            </button>
          ) : (
            <button
              type="button"
              className={styles.btn}
              onClick={() => {
                updateStep(2)
              }}>
              Intentar de nuevo.
            </button>
          )}
        </div>
      )}
    </>
  )
}

export default Confirmation
