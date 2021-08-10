import Identity from '@arc-publishing/sdk-identity'
import Sales from '@arc-publishing/sdk-sales'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { deleteCookie } from '../../../../../utilities/client/cookies'
import { SITE_ELCOMERCIO } from '../../../../../utilities/constants/sitenames'
import { formatUsername } from '../../../../../utilities/subscriptions/identity'
import { useModalContext } from '../../../_context/modal'
import { isAuthenticated } from '../../../_dependencies/Session'
import { Taggeo } from '../../../_dependencies/Taggeo'
import Avatar from './avatar'

const classes = {
  menu: 'profile-menu',
  hello: 'profile-menu__hello',
  welcome: 'profile-menu__welcome',
  body: 'profile-menu__body',
}

const MenuSignwall = ({ handleMenu }) => {
  const {
    siteProperties: {
      signwall: { mainColorLink },
      activePaywall,
      activeNewsletter,
      siteDomain,
    },
    arcSite,
  } = useAppContext() || {}

  const { userProfile } = useModalContext()
  const { firstName, lastName, email, identities } = userProfile || {}

  const [identitie = { type: 'Password' }] = identities || []
  const [usernameid = { userName: '' }] = identities || []

  const closeSession = () => {
    deleteCookie('arc_e_id')
    deleteCookie('mpp_sess')
    deleteCookie('ArcId.USER_INFO', siteDomain)
    deleteCookie('EcoId.REQUEST_STUDENTS')

    const isSubs =
      window.location.pathname.indexOf('suscripciones') >= 0 || false
    window.sessionStorage.removeItem('ArcId.USER_STEP') // Borrar step nueva landing de compra

    Identity.logout()
      .then(() => {
        if (isSubs || activePaywall) {
          Sales.subscriptions = []
        }
        Taggeo(`Web_Sign_Wall_General`, `web_swg_link_cerrarsesion`)
        window.location.href = document.referrer ? document.referrer : '/'
      })
      .catch(() => {
        window.location.reload()
      })
  }

  const openItemMenu = (item) => {
    if (isAuthenticated()) {
      if (arcSite === SITE_ELCOMERCIO && item === 'news') {
        window.open('/newsletters', '_blank')
      } else {
        handleMenu(item)
      }
    } else {
      window.location.href = '/?ref=signwall'
    }
  }

  return (
    <>
      <Avatar
        arcSite={arcSite}
        email={email}
        username={usernameid.userName}
        loginType={identitie.type.toLowerCase()}
      />
      <div className={classes.menu}>
        <h1 className={classes.hello} id="name-user-profile">
          Hola {formatUsername(`${firstName} ${lastName}`, 17)}
        </h1>
        <p className={classes.welcome}>Bienvenido a tu perfil</p>
        <div className={classes.body}>
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
