/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { WrapperMenu } from './styles'
import { Avatar } from './avatar'
import Cookie from '../../utils/cookie'
import Domains from '../../utils/domains'

const Cookies = new Cookie()

const closeSession = props => {
  const { closePopup, closeDispatchEvent, arcSite } = props

  Cookies.deleteCookie('arc_e_id')
  Cookies.deleteCookie('mpp_sess')
  Cookies.deleteCookie('ArcId.USER_INFO')
  window.sessionStorage.setItem('preferencesNews', '[]')

  window.Identity.apiOrigin = Domains.getOriginAPI(arcSite)
  window.Identity.logout()
    .then(() => {
      if (
        window.location.pathname.indexOf('suscripciones') >= 0 ||
        arcSite === 'gestion'
      ) {
        closeDispatchEvent()
        window.location.reload()
      } else {
        closePopup()
      }
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
        <h1 className="hello">Hola {userName || 'Usuario'}</h1>
        <p className="welcome">Bienvenido a tu Perfil</p>
        <div className="cont-menu">
          <ul>
            {arcSite === 'gestion' && (
              <li>
                <a href="#" onClick={() => props.home()}>
                  Inicio
                </a>
              </li>
            )}

            <li>
              <a href="#" onClick={() => props.prof()}>
                Mis Datos
              </a>
            </li>

            {arcSite === 'gestion' && (
              <li>
                <a href="#" onClick={() => props.subs()}>
                  Mi Suscripción
                </a>
              </li>
            )}

            {arcSite === 'gestion' && (
              <li>
                <a href="#" onClick={() => props.news()}>
                  Newsletters
                </a>
              </li>
            )}

            {/* <li>
              <a href="#">Contáctanos</a>
            </li> */}
            <li>
              <a
                className="close-sesion"
                href="#"
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
