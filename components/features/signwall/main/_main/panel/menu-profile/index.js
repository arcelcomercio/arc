/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { WrapperMenu } from './styles'
import { Avatar } from './avatar'
import Cookies from '../../utils/cookies'
import Domains from '../../utils/domains'

const closeSession = props => {
  const { closePopup, closeDispatchEvent, arcSite } = props
  const isSubs = window.location.pathname.indexOf('suscripciones') >= 0 || false
  const isPremium = window.content_paywall

  Cookies.deleteCookie('arc_e_id')
  Cookies.deleteCookie('mpp_sess')
  Cookies.deleteCookie('ArcId.USER_INFO')
  Cookies.deleteCookie('EcoId.REQUEST_STUDENTS')
  window.sessionStorage.removeItem('paywall-profile-form') // formik raul
  window.sessionStorage.removeItem('paywall-payment-form') // formik raul
  window.sessionStorage.removeItem('paywall_last_url') // url redireccion despues de compra

  window.Identity.apiOrigin = Domains.getOriginAPI(arcSite)
  window.Identity.logout()
    .then(() => {
      if (isSubs || arcSite === 'gestion' || arcSite === 'elcomercio') {
        closeDispatchEvent()
        if (window.Sales) {
          window.Sales.subscriptions = []
        }
        if (isPremium) {
          window.location.reload()
        }
      }
      closePopup()
      // window.scrollTo(0, 100)
      // setTimeout(() => {
      //   window.scrollTo(0, 0)
      // }, 500)
    })
    .catch(() => {
      window.location.reload()
    })
}

// eslint-disable-next-line import/prefer-default-export
export const MenuProfile = props => {
  const { userName, typeLogin, arcSite, emailUser, userNameFB } = props
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <>
      <Avatar
        typeLogin={typeLogin}
        arcSite={arcSite}
        emailUser={emailUser}
        userNameFB={userNameFB}
      />
      <WrapperMenu>
        <h1 className="hello" id="name-user-profile">
          Hola {userName || 'Usuario'}
        </h1>
        <p className="welcome">Bienvenido a tu Perfil</p>
        <div className="cont-menu">
          <ul>
            {arcSite === 'gestion' || arcSite === 'elcomercio' ? (
              <li>
                <a href="#" onClick={() => props.home()}>
                  Inicio
                </a>
              </li>
            ) : null}

            <li>
              <a href="#" onClick={() => props.prof()}>
                Mis Datos
              </a>
            </li>

            {arcSite === 'gestion' || arcSite === 'elcomercio' ? (
              <li>
                <a
                  id="btn-mis-suscripciones"
                  href="#"
                  onClick={() => props.subs()}>
                  Mi Suscripción
                </a>
              </li>
            ) : null}

            {arcSite === 'gestion' ? (
              <li>
                <a href="#" onClick={() => props.news()}>
                  Newsletters
                </a>
              </li>
            ) : null}

            <li>
              <a
                className="close-sesion"
                href="#"
                id="web_link_cerrarsesion"
                onClick={() => closeSession(props)}>
                Cerrar sesión
              </a>
            </li>
          </ul>
        </div>
      </WrapperMenu>
    </>
  )
}
