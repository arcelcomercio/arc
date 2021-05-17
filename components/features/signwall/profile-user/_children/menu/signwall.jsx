import md5 from 'crypto-js/md5'
import { useFusionContext } from 'fusion:context'
import * as React from 'react'

import Loading from '../../../_children/loading'
import Cookies from '../../../_dependencies/cookies'
import Domains from '../../../_dependencies/domains'
import GetProfile from '../../../_dependencies/get-profile'
import Taggeo from '../../../_dependencies/taggeo'
import { WrapperAvatar, WrapperMenu } from './styled'

const MenuSignwall = ({ handleMenu }) => {
  const {
    siteProperties: {
      signwall: { mainColorBr, mainColorLink },
      activePaywall,
      activeNewsletter,
    },
    arcSite,
  } = useFusionContext() || {}

  const { publicProfile } = new GetProfile()
  const { identities = [] } = publicProfile
  const [identitie = { type: 'Password' }] = identities || []
  const [usernameid = { userName: '' }] = identities || []
  const nameInit = publicProfile.firstName || 'Usuario'
  const typeLogin = identitie.type.toLowerCase()
  const userNAME =
    nameInit && nameInit.length >= 20 ? `${nameInit.slice(0, 16)}...` : nameInit
  const userMAIL = publicProfile.email || 'admin@elcomercio.pe'
  const userFB = usernameid.userName
  const hashMAIL = md5(userMAIL)

  const [showLoading, setShowLoading] = React.useState(false)

  const closeSession = () => {
    if (typeof window !== 'undefined') {
      setShowLoading(true)
      Cookies.deleteCookie('arc_e_id')
      Cookies.deleteCookie('mpp_sess')
      Cookies.deleteCookieDomain('ArcId.USER_INFO', arcSite)
      Cookies.deleteCookie('EcoId.REQUEST_STUDENTS')

      const isSubs =
        window.location.pathname.indexOf('suscripciones') >= 0 || false
      window.sessionStorage.removeItem('ArcId.USER_STEP') // Borrar step nueva landing de compra
      window.Identity.apiOrigin = Domains.getOriginAPI(arcSite)
      window.Identity.logout()
        .then(() => {
          if (isSubs || activePaywall) {
            if (window.Sales) window.Sales.subscriptions = []
          }
          Taggeo(`Web_Sign_Wall_General`, `web_swg_link_cerrarsesion`)
          window.location.href = document.referrer ? document.referrer : '/'
        })
        .catch(() => {
          window.location.reload()
        })
    }
  }

  const checkSession = () => {
    if (typeof window !== 'undefined') {
      const profileStorage = window.localStorage.getItem('ArcId.USER_PROFILE')
      const sesionStorage = window.localStorage.getItem('ArcId.USER_INFO')
      if (profileStorage) {
        return !(profileStorage === 'null' || sesionStorage === '{}') || false
      }
    }
    return false
  }

  const openItemMenu = (item) => {
    if (typeof window !== 'undefined') {
      if (checkSession()) {
        if (arcSite === 'elcomercio' && item === 'news') {
          window.open('/newsletters', '_blank')
        } else {
          handleMenu(item)
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
          <WrapperAvatar br={mainColorBr}>
            <img
              src={
                typeLogin === 'facebook'
                  ? `https://graph.facebook.com/${userFB}/picture?type=large&redirect=true&width=500&height=500`
                  : `https://www.gravatar.com/avatar/${hashMAIL}?s=180&d=identicon`
              }
              alt="Avatar"
            />
          </WrapperAvatar>

          <WrapperMenu cl={mainColorLink}>
            <h1 className="hello" id="name-user-profile">
              Hola {userNAME || 'Lector'}
            </h1>
            <p className="welcome">Bienvenido a tu perfil</p>
            <div className="cont-menu">
              <ul>
                {activePaywall && (
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        openItemMenu('home')
                      }}>
                      Inicio
                    </button>
                  </li>
                )}
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      openItemMenu('prof')
                    }}>
                    Mis Datos
                  </button>
                </li>
                {activePaywall && (
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        openItemMenu('subs')
                      }}>
                      Mi Suscripción
                    </button>
                  </li>
                )}
                {activeNewsletter && (
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        openItemMenu('news')
                      }}>
                      Newsletters
                    </button>
                  </li>
                )}
                <li>
                  <button
                    type="button"
                    className="close-sesion"
                    id="web_link_cerrarsesion"
                    onClick={() => {
                      closeSession()
                    }}>
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            </div>
          </WrapperMenu>
        </>
      )}
    </>
  )
}

export default MenuSignwall