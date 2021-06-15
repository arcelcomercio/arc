import * as Sentry from '@sentry/browser'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

import useSentry from '../../../hooks/useSentry'
import addScriptAsync from '../../../utilities/script-async'
import { getOriginAPI } from '../../signwall/_dependencies/domains'
import { deleteCookie, getCookie, setCookie } from '../_dependencies/Cookies'
import { PropertiesCommon } from '../_dependencies/Properties'
import { getQuery } from '../_dependencies/QueryString'
import { isLogged } from '../_dependencies/Session'
import { SignOrganic } from './_children/Organic'

const COOKIE_NAME = 'signreferer'
const HARD = 'hard'
const RELOGIN_EMAIL = 'relogemail'
const RELOGIN_HASH = 'reloghash'
const TOKEN_VERIFY = 'verify'
const RESET_PASSWORD = 'resetpass'
const ORGANIC = 'organico'

const AuthUser = () => {
  const { arcSite } = useAppContext() || {}
  const [activeModal, setActiveModal] = React.useState()
  const { links, urls: urlCommon } = PropertiesCommon

  useSentry(urlCommon.sentrySign)

  React.useEffect(() => {
    addScriptAsync({
      name: 'IdentitySDK',
      url: links.identity,
      includeNoScript: false,
    })
      .then(() => {
        window.Identity.options({ apiOrigin: getOriginAPI(arcSite) })
      })
      .catch((errIdentitySDK) => {
        Sentry.captureEvent({
          message: 'SDK Identity no ha cargado correctamente',
          level: 'error',
          extra: errIdentitySDK || {},
        })
      })

    const urlRef = window.document.referrer
    if (urlRef && !/facebook.com/.test(urlRef)) {
      deleteCookie(COOKIE_NAME)
      setCookie(COOKIE_NAME, urlRef, 365)
    }

    if (getQuery('signHard') || getQuery('signwallHard')) {
      setActiveModal(HARD)
    } else if (getQuery('signEmail') || getQuery('reloginEmail')) {
      setActiveModal(RELOGIN_EMAIL)
    } else if (getQuery('signHash') || getQuery('reloginHash')) {
      setActiveModal(RELOGIN_HASH)
    } else if (getQuery('tokenVerify')) {
      setActiveModal(TOKEN_VERIFY)
    } else if (getQuery('tokenReset')) {
      setActiveModal(RESET_PASSWORD)
    } else {
      setActiveModal(ORGANIC)
    }
  }, [])

  const closePopUp = () => {
    if (typeof window !== 'undefined') {
      const cookie = getCookie(COOKIE_NAME)
      if (cookie && cookie !== '' && !/\/signwall\//.test(cookie)) {
        const URL_CLEAR = cookie.split('?')
        deleteCookie(COOKIE_NAME)
        window.location.href = `${URL_CLEAR[0]}?ref=signwall`
      } else {
        deleteCookie(COOKIE_NAME)
        window.location.href = '/?ref=signwall'
      }
    }
  }

  const isOrganic = activeModal === ORGANIC
  const isHard = activeModal === HARD
  const isReloginEmail = activeModal === RELOGIN_EMAIL
  const isReloginHash = activeModal === RELOGIN_HASH
  const isTokenVerify = activeModal === TOKEN_VERIFY
  const isResetPassword = activeModal === RESET_PASSWORD

  return (
    <>
      {(isOrganic || isHard || isReloginEmail || isReloginHash) && (
        <>
          {!isLogged() ? (
            <SignOrganic
              onClose={() => closePopUp()}
              arcSite={arcSite}
              typeDialog={activeModal}
            />
          ) : (
            closePopUp()
          )}
        </>
      )}

      {(isTokenVerify || isResetPassword) && (
        <SignOrganic
          onClose={() => closePopUp()}
          arcSite={arcSite}
          typeDialog={activeModal}
          tokenVerify={isTokenVerify && getQuery('tokenVerify')}
          tokenReset={isResetPassword && getQuery('tokenReset')}
        />
      )}
    </>
  )
}

AuthUser.label = 'Signwall - Página Login / Registro / Hard'

export default AuthUser
