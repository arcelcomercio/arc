import md5 from 'crypto-js/md5'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { deleteCookie } from '../../../../../utilities/client/cookies'
import { getOriginAPI } from '../../../../signwall/_dependencies/domains'
import { ModalConsumer } from '../../../_context/modal'
import { getUserName, isAuthenticated } from '../../../_dependencies/Session'
import { Taggeo } from '../../../_dependencies/Taggeo'

const MenuSignwall = ({ handleMenu }) => {
  const {
    siteProperties: {
      signwall: { mainColorBr, mainColorLink },
      activePaywall,
      activeNewsletter,
      siteDomain,
    },
    arcSite,
  } = useAppContext() || {}

  const { userProfile } = React.useContext(ModalConsumer)
  const { firstName, lastName, email, identities } = userProfile || {}
  const [identitie = { type: 'Password' }] = identities || []
  const [usernameid = { userName: '' }] = identities || []
  const typeLogin = identitie.type.toLowerCase()
  const userFB = usernameid.userName
  const emailHash = md5(email).toString()

  const closeSession = () => {
    if (typeof window !== 'undefined') {
      deleteCookie('arc_e_id')
      deleteCookie('mpp_sess')
      deleteCookie('ArcId.USER_INFO', siteDomain)
      deleteCookie('EcoId.REQUEST_STUDENTS')

      const isSubs =
        window.location.pathname.indexOf('suscripciones') >= 0 || false
      window.sessionStorage.removeItem('ArcId.USER_STEP') // Borrar step nueva landing de compra
      window.Identity.apiOrigin = getOriginAPI(arcSite)
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

  const openItemMenu = (item) => {
    if (typeof window !== 'undefined') {
      if (isAuthenticated()) {
        if (arcSite === 'elcomercio' && item === 'news') {
          window.open('/newsletters', '_blank')
        } else {
          handleMenu(item)
        }
      } else {
        window.location.href = '/?ref=signwall'
      }
    }
  }

  return (
    <>
      <div
        className="sign-profile_menu-avatar"
        style={{ borderColor: arcSite === 'trome' ? 'black' : mainColorBr }}>
        <img
          src={
            typeLogin === 'facebook'
              ? `https://graph.facebook.com/${userFB}/picture?type=large&redirect=true&width=500&height=500`
              : `https://www.gravatar.com/avatar/${emailHash}?s=180&d=identicon`
          }
          alt="Avatar"
          className="picture"
        />
      </div>
      <div className="sign-profile_menu-wrapper">
        <h1 className="hello" id="name-user-profile">
          Hola {getUserName(firstName, lastName)}
        </h1>
        <p className="welcome">Bienvenido a tu perfil</p>
        <div className="cont-menu">
          <ul>
            {activePaywall && (
              <li>
                <button
                  type="button"
                  style={{ color: mainColorLink }}
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
                style={{ color: mainColorLink }}
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
                  style={{ color: mainColorLink }}
                  id="btn-subs"
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
                  style={{ color: mainColorLink }}
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
      </div>
    </>
  )
}

export default MenuSignwall
