import * as React from 'react'

import Signwall from '../_children/Signwall'
import { AuthContext } from '../_context/auth'
import { PropertiesCommon, PropertiesSite } from '../_dependencies/Properties'
import PWA from '../_dependencies/Pwa'
import {
  deleteQuery,
  // getQuery
} from '../_dependencies/QueryString'
import { isAuthenticated } from '../_dependencies/Session'
import { Taggeo } from '../_dependencies/Taggeo'
import { checkUndefined } from '../_dependencies/Utils'

const styles = {
  wrapper: 'header-payment__content',
  link: 'header-payment__content-link',
  logo: 'header-payment__content-logo',
  button: 'header-payment__content-button',
}

const HeaderSubs = ({ userProfile, arcSite, arcType }) => {
  const { urls } = PropertiesSite[arcSite]
  const { links } = PropertiesCommon
  const { userLoaded, activateAuth, updateStep } = React.useContext(AuthContext)
  const { firstName, lastName, secondLastName } = userProfile || {}
  const [showSignwall, setShowSignwall] = React.useState(false)
  const [showTypeLanding, setShowTypeLanding] = React.useState('landing')

  const formatName = () => {
    const fullName = `${checkUndefined(firstName, 'Usuario')} ${
      checkUndefined(lastName) || ''
    } ${checkUndefined(secondLastName) || ''}`

    return fullName.length >= 15 ? `${fullName.substring(0, 15)}...` : fullName
  }

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
        window.Identity.clearSession()
      }
    }
  }

  const handleAfterLogged = () => {
    if (typeof window !== 'undefined') {
      const resProfile = window.Identity.userProfile || {}
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
            <span>Hola</span> {userLoaded ? formatName() : 'Invitado'}
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
