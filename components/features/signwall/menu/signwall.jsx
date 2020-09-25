/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { PureComponent, useState } from 'react'
import Consumer from 'fusion:consumer'
import { WrapperMenu } from './styled'
import { Avatar } from './_children/avatar'
import Cookies from '../_dependencies/cookies'
import Domains from '../_dependencies/domains'
import GetProfile from '../_dependencies/get-profile'
import Taggeo from '../_dependencies/taggeo'
import Loading from '../_children/loading'

const Menu = ({
  arcSite,
  siteProperties: {
    signwall: { mainColorBr, mainColorLink },
    activePaywall,
    activeNewsletter,
  },
  dispatchEvent,
}) => {
  const W = typeof window !== 'undefined' ? window : null

  const { publicProfile } = new GetProfile()
  const { identities = [] } = publicProfile
  const [identitie = { type: 'Password' }] = identities || []
  const [usernameid = { userName: '' }] = identities || []
  const nameInit = publicProfile.firstName || 'Usuario'
  const typeLogin = identitie.type.toLowerCase()
  const userNAME =
    nameInit.length >= 20 ? `${nameInit.slice(0, 16)}...` : nameInit
  const userMAIL = publicProfile.email || 'admin@elcomercio.pe'
  const userFB = usernameid.userName

  const [showLoading, setShowLoading] = useState(false)

  const closeSession = () => {
    setShowLoading(true)
    Cookies.deleteCookie('arc_e_id')
    Cookies.deleteCookie('mpp_sess')
    // Cookies.deleteCookie('ArcId.USER_INFO')
    Cookies.deleteCookieDomain('ArcId.USER_INFO', arcSite)
    Cookies.deleteCookie('EcoId.REQUEST_STUDENTS')
    Cookies.deleteCookie('lostEmail')
    if (W) {
      const isSubs = W.location.pathname.indexOf('suscripciones') >= 0 || false
      W.localStorage.removeItem('ArcId.USER_STEP') // Borrar step nueva landing de compra
      W.sessionStorage.removeItem('ArcId.USER_STEP') // Borrar step nueva landing de compra
      W.Identity.apiOrigin = Domains.getOriginAPI(arcSite)
      W.Identity.logout()
        .then(() => {
          if (isSubs || activePaywall) {
            if (W.Sales) W.Sales.subscriptions = []
          }
          Taggeo(`Web_Sign_Wall_General`, `web_swg_link_cerrarsesion`)
          W.location.href = document.referrer ? document.referrer : '/'
        })
        .catch(() => {
          W.location.reload()
        })
    }
  }

  const checkSession = () => {
    if (typeof window !== 'undefined') {
      const profileStorage =
        window.localStorage.getItem('ArcId.USER_PROFILE') ||
        window.sessionStorage.getItem('ArcId.USER_PROFILE')
      const sesionStorage = window.localStorage.getItem('ArcId.USER_INFO')
      if (profileStorage) {
        return !(profileStorage === 'null' || sesionStorage === '{}') || false
      }
    }
    return false
  }

  const openItemMenu = item => {
    if (typeof window !== 'undefined') {
      if (checkSession()) {
        if (arcSite === 'elcomercio' && item === 'news') {
          window.open('/newsletters', '_blank')
        } else {
          dispatchEvent('openMenu', item)
        }
      } else {
        window.location.href = '/'
      }
    }
  }

  return (
    <>
      {showLoading ? (
        <div className="back-loading" style={{ zIndex: '20' }}>
          <Loading arcSite={arcSite} />
        </div>
      ) : (
        <>
          <Avatar
            mainColorBr={mainColorBr}
            typeLogin={typeLogin}
            userFB={userFB}
            userMAIL={userMAIL}
          />
          <WrapperMenu cl={mainColorLink}>
            <h1 className="hello" id="name-user-profile">
              Hola {userNAME || 'Lector'}
            </h1>
            <p className="welcome">Bienvenido a tu perfil</p>
            <div className="cont-menu">
              <ul>
                {activePaywall && (
                  <li>
                    <a
                      href="#"
                      onClick={e => {
                        e.preventDefault()
                        openItemMenu('home')
                      }}>
                      Inicio
                    </a>
                  </li>
                )}
                <li>
                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault()
                      openItemMenu('prof')
                    }}>
                    Mis Datos
                  </a>
                </li>
                {activePaywall && (
                  <li>
                    <a
                      href="#"
                      id="btn-subs"
                      onClick={e => {
                        e.preventDefault()
                        openItemMenu('subs')
                      }}>
                      Mi Suscripción
                    </a>
                  </li>
                )}
                {activeNewsletter && (
                  <li>
                    <a
                      href="#"
                      onClick={e => {
                        e.preventDefault()
                        openItemMenu('news')
                      }}>
                      Newsletters
                    </a>
                  </li>
                )}
                <li>
                  <a
                    className="close-sesion"
                    href="#"
                    id="web_link_cerrarsesion"
                    onClick={e => {
                      e.preventDefault()
                      closeSession()
                    }}>
                    Cerrar sesión
                  </a>
                </li>
              </ul>
            </div>
          </WrapperMenu>
        </>
      )}
    </>
  )
}

@Consumer
class MenuSignwall extends PureComponent {
  render() {
    return (
      // eslint-disable-next-line react/jsx-no-bind
      <Menu {...this.props} dispatchEvent={this.dispatchEvent.bind(this)} />
    )
  }
}

export default MenuSignwall
