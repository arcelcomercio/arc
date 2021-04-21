import * as React from 'react'
import { useAppContext } from 'fusion:context'
import PWA from '../../../_dependencies/Pwa'
import { PropertiesSite } from '../../../_dependencies/Properties'

import { getSessionStorage } from '../../../_dependencies/Utils'

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
    globalContent: { fromFia },
  } = useAppContext() || {}

  const { urls: urlsSite } = PropertiesSite[arcSite]
  const [loading, setLoading] = React.useState(false)

  const goToHome = () => {
    if (typeof window !== 'undefined') {
      setLoading(true)
      // setSendTracking(false)
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
      window.sessionStorage.removeItem('ArcId.USER_STEP')
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
        ¡Estás a un paso de finalizar la compra!
      </h3>

      <div className="form-confirmation">
        <iframe
          title="pago-efectivo"
          src="https://signwall-test.e3.pe/pago_efectivo_confirmacion.html"
          width="100%"
          height="450"
          framborder="0"></iframe>
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
