import Identity from '@arc-publishing/sdk-identity'
import Sales from '@arc-publishing/sdk-sales'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

import useProfile from '../../../../../hooks/useProfile'
import { deleteCookie } from '../../../../../utilities/client/cookies'
import { SITE_ELCOMERCIO } from '../../../../../utilities/constants/sitenames'
import { formatUsername } from '../../../../../utilities/subscriptions/identity'
import { isAuthenticated } from '../../../_dependencies/Session'
import { Taggeo } from '../../../_dependencies/Taggeo'
import Avatar from './avatar'

const classes = {
  menu: 'profile-menu',
  hello: 'profile-menu__hello',
  welcome: 'profile-menu__welcome',
  body: 'profile-menu__body',
  list: 'profile-menu__list',
  item: 'profile-menu__item',
  button: 'profile-menu__button',
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

  const { userProfile } = useProfile()
  const [activeButton, setActiveButton] = React.useState('home')
  const { firstName, email, identities } = userProfile || {}
  const [identitie = { type: 'Password' }] = identities || []
  const [usernameid = { userName: '' }] = identities || []

  const hasExternalNewsletters = arcSite === SITE_ELCOMERCIO

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
      if (hasExternalNewsletters && item === 'news') {
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
          Hola {formatUsername(firstName || '', 17)}
        </h1>
        <p className={classes.welcome}>Bienvenido a tu perfil</p>
        <div className={classes.body}>
          <ul className={classes.list}>
            {activePaywall && (
              <li className={classes.item}>
                <button
                  className={`${classes.button} ${
                    activeButton === 'home' ? 'active' : ''
                  }`}
                  type="button"
                  style={{ color: mainColorLink }}
                  onClick={() => {
                    openItemMenu('home')
                    setActiveButton('home')
                  }}>
                  Inicio
                </button>
              </li>
            )}
            <li className={classes.item}>
              <button
                id="btn-profile"
                className={`${classes.button} ${
                  activeButton === 'prof' ? 'active' : ''
                }`}
                type="button"
                style={{ color: mainColorLink }}
                onClick={() => {
                  openItemMenu('prof')
                  setActiveButton('prof')
                }}>
                Mis Datos
              </button>
            </li>
            {activePaywall && (
              <li className={classes.item}>
                <button
                  className={`${classes.button} ${
                    activeButton === 'subs' ? 'active' : ''
                  }`}
                  type="button"
                  style={{ color: mainColorLink }}
                  id="btn-subs"
                  onClick={() => {
                    openItemMenu('subs')
                    setActiveButton('subs')
                  }}>
                  Mi Suscripción
                </button>
              </li>
            )}
            {activeNewsletter && (
              <li className={classes.item}>
                <button
                  id="btn-newsletter"
                  className={`${classes.button} ${
                    activeButton === 'news' ? 'active' : ''
                  }`}
                  type="button"
                  style={{ color: mainColorLink }}
                  onClick={() => {
                    openItemMenu('news')
                    if (!hasExternalNewsletters) setActiveButton('news')
                  }}>
                  Newsletters
                </button>
              </li>
            )}
            <li className={classes.item}>
              <button
                className={`${classes.button} close-session`}
                type="button"
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
