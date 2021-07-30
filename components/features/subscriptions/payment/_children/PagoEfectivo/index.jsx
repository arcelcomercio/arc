import * as Sentry from '@sentry/browser'
import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

import Loading from '../../../../signwall/_children/loading'
import { AuthContext } from '../../../_context/auth'
import { PropertiesSite } from '../../../_dependencies/Properties'
import PWA from '../../../_dependencies/Pwa'
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

const PaywallCIP = (data) => {
  const {
    data: { user_id: Uuid, payment_concept: NamePlan },
  } = data

  const {
    globalContent: { printedSubscriber, event },
  } = useAppContext() || {}

  const result =
    useContent({
      source: 'paywall-cip',
      query: data,
    }) || {}

  const {
    response: { data: { cipUrl = '', cip = '' } = {} } = {},
    status,
    error,
  } = result

  const { userPeriod, userPeOption } = React.useContext(AuthContext)

  React.useEffect(() => {
    if (status) {
      TaggeoJoao(
        {
          event: 'Pasarela Suscripciones Digitales',
          category: eventCategory({
            step: 2.5,
            event,
            hasPrint: printedSubscriber,
            plan: NamePlan.split(' -')[0],
            cip: true,
          }),
          action: `${userPeriod} | PE - ${userPeOption} - ${cip}`,
          label: Uuid,
        },
        window.location.pathname
      )
    } else if (error) {
      Sentry.captureEvent({
        message: 'Error al generar CIP',
        level: 'error',
        extra: error || {},
      })

      TaggeoJoao(
        {
          event: 'Pasarela Suscripciones Digitales',
          category: eventCategory({
            step: 2.5,
            event,
            hasPrint: printedSubscriber,
            plan: NamePlan.split(' -')[0],
            cancel: true,
          }),
          action: `${userPeriod}  | PE - ${userPeOption} - ${'Error al generar CIP'}`,
          label: Uuid,
        },
        window.location.pathname
      )
    }
  }, [status, error])

  return cipUrl ? (
    <iframe
      title="pago-efectivo"
      src={cipUrl}
      width="100%"
      height="100%"
      frameBorder="0"
    />
  ) : (
    <Loading typeBg="block" />
  )
}

const PagoEfectivo = () => {
  const [redirecting, setRedirecting] = React.useState(false)
  const [cipLink, setCipLink] = React.useState(null)
  const [dataCip, setDataCip] = React.useState()
  const [dateTime] = React.useState(new Date())
  const utcDate = new Date(dateTime.getTime() - 300 * 60000).toISOString()
  const timeClearToken = utcDate.split('.')[0]

  const {
    arcSite,
    globalContent: { plans = [], fromFia },
  } = useAppContext() || {}

  const { urls: urlsSite } = PropertiesSite[arcSite]
  const result =
    useContent({
      source: 'paywall-pago-efectivo',
      query: {
        clientTime: timeClearToken,
      },
    }) || {}
  const { data: { token = '' } = {}, error = '' } = result

  const { updateStep, userPeriod, userPlan, userProfile } = React.useContext(
    AuthContext
  )

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

    if (token && token !== '') {
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
          confirm_subscription:
            getSessionStorage('paywall_confirm_subs') || '3',
          user_agent: getUserAgent,
          is_pwa: PWA.isPWA() ? 1 : 2,
        }
        setDataCip(dataCIP)
        setCipLink(token)
      } else {
        updateStep(2)
      }
    } else if (error && error !== '') {
      Sentry.captureEvent({
        message: 'Error al generar Token CIP',
        level: 'error',
        extra: error || {},
      })
      setCipLink('error')
    }
  }, [token, error])

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
        <div className={styles.cipWrapper}>
          {dataCip && <PaywallCIP data={dataCip} />}
        </div>
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

export default PagoEfectivo
