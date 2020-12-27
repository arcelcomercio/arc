import React, { useState, useContext } from 'react'
import { PropertiesSite, PropertiesCommon } from '../_dependencies/Properties'
import { Taggeo } from '../_dependencies/Taggeo'
import { isAuthenticated } from '../_dependencies/Session'
import { checkUndefined } from '../_dependencies/Utils'
import { AuthContext } from '../_context/auth'
import { Landing } from '../../signwall/_children/landing/index'
import QueryString from '../../signwall/_dependencies/querystring'
import PWA from '../_dependencies/Pwa'

const styles = {
  wrapper: 'header__content wrapper-buy',
  link: 'header__content-link',
  logo: 'header__content-logo',
  button: 'header__content-button',
}

const HeaderSubs = ({ userProfile, arcSite }) => {
  const { urls } = PropertiesSite[arcSite]
  const { links } = PropertiesCommon
  const { userLoaded, activateAuth, updateStep } = useContext(AuthContext)
  const { firstName, lastName, secondLastName } = userProfile || {}
  const [showSignwall, setShowSignwall] = useState(false)
  const [showTypeLanding, setShowTypeLanding] = useState('landing')

  const formatName = () => {
    const fullName = `${checkUndefined(firstName, 'Usuario')} ${checkUndefined(
      lastName
    ) || ''} ${checkUndefined(secondLastName) || ''}`

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
    }
  }

  return (
    <>
      <header className="header" id="header">
        <div className={styles.wrapper}>
          {PWA.isPWA() ? (
            <div className={styles.logo}></div>
          ) : (
            <a
              href={urls.homeUrl}
              className={styles.link}
              target="_blank"
              rel="noreferrer"
              aria-label={arcSite}>
              <div className={styles.logo}></div>
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

      {QueryString.getQuery('signLanding') ||
      QueryString.getQuery('signStudents') ||
      showSignwall ? (
        <Landing
          typeDialog={showTypeLanding} // tipo de modal (students , landing)
          nameDialog={showTypeLanding} // nombre de modal
          onLogged={handleAfterLogged}
          onLoggedFail={() => {}}
          onClose={() => {
            setShowSignwall(false)
            setShowTypeLanding('landing')
          }}
        />
      ) : null}
    </>
  )
}

export default HeaderSubs
