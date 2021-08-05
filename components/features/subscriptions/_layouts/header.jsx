import Identity from '@arc-publishing/sdk-identity'
import * as React from 'react'

import {
  deleteQuery,
  // getQuery
} from '../../../utilities/parse/queries'
import { formatUsername } from '../../../utilities/subscriptions/identity'
import Signwall from '../_children/Signwall'
import { useAuthContext } from '../_context/auth'
import { PropertiesCommon, PropertiesSite } from '../_dependencies/Properties'
import PWA from '../_dependencies/Pwa'
import { isAuthenticated } from '../_dependencies/Session'
import { Taggeo } from '../_dependencies/Taggeo'

const styles = {
  wrapper: 'header-payment__content',
  link: 'header-payment__content-link',
  logo: 'header-payment__content-logo',
  button: 'header-payment__content-button',
}

const HeaderSubs = ({ userProfile, arcSite, arcType }) => {
  const { urls } = PropertiesSite[arcSite]
  const { links } = PropertiesCommon
  const { userLoaded, activateAuth, updateStep } = useAuthContext()
  const { firstName, lastName, secondLastName } = userProfile || {}
  const [showSignwall, setShowSignwall] = React.useState(false)
  const [showTypeLanding, setShowTypeLanding] = React.useState('landing')

  const profileButtonText = userLoaded
    ? formatUsername(`${firstName} ${lastName} ${secondLastName}`, 15) ||
      'Usuario'
    : 'Invitado'

  const handleSignwall = () => {
    if (typeof window !== 'undefined') {
      Taggeo(
        `Web_Sign_Wall_Suscripciones`,
        `web_link_ingresar_${userLoaded ? 'perfil' : 'cuenta'}`
      )
      if (userLoaded || isAuthenticated()) {
        window.open(links.profile, '_blank')
      } else {
        setShowSignwall(!showSignwall)
        Identity.clearSession()
      }
    }
  }

  const handleAfterLogged = () => {
    if (typeof window !== 'undefined') {
      const resProfile = Identity.userProfile || {}
      activateAuth(resProfile)
      updateStep(2)
      setShowSignwall(false)
      deleteQuery('signLanding')
      deleteQuery('dataTreatment')
    }
  }

  // React.useEffect(() => {
  // const isParamsRedirect = getQuery('signLanding')
  // setShowSignwall(isParamsRedirect)
  // }, [])

  return (
    <>
      <header className="header-payment" id="header">
        <div
          className={`${styles.wrapper} ${
            arcType === 'payment' ? 'wrapper-buy' : 'wrapper'
          } `}>
          {PWA.isPWA() ? (
            <div className={styles.logo} />
          ) : (
            <a
              href={urls.homeUrl}
              className={styles.link}
              target="_blank"
              rel="noreferrer"
              aria-label={arcSite}>
              <div className={styles.logo} />
            </a>
          )}
          <button
            className={styles.button}
            onClick={() => {
              if (!PWA.isPWA()) {
                handleSignwall()
              }
            }}
            type="button">
            <span>Hola</span> {profileButtonText}
          </button>
        </div>
      </header>

      {showSignwall && (
        <Signwall
          fallback={<div>Cargando...</div>}
          typeDialog={showTypeLanding} // tipo de modal (students , landing)
          nameDialog={showTypeLanding} // nombre de modal
          onLogged={handleAfterLogged}
          onLoggedFail={() => {}}
          onClose={() => {
            setShowSignwall(false)
            setShowTypeLanding('landing')
          }}
        />
      )}
    </>
  )
}

export default HeaderSubs
