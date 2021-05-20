import * as Sentry from '@sentry/browser'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { env } from '../../../utilities/arc/env'
import { PROD } from '../../../utilities/constants/environment'
import addScriptAsync from '../../../utilities/script-async'
import { deleteCookie, getCookie, setCookie } from '../_dependencies/Cookies'
import { PropertiesCommon, PropertiesSite } from '../_dependencies/Properties'
import { getQuery } from '../_dependencies/QueryString'
import { isLogged } from '../_dependencies/Session'
import { SignOrganic } from './_children/Organic'

const AuthUser = () => {
  const { arcSite, deployment } = useAppContext() || {}
  const [showOrganic, setShowOrganic] = React.useState(false)
  const [showHard, setShowHard] = React.useState(false)
  const [showReEmail, setShowReEmail] = React.useState(false)
  const [showRelogHash, setShowRelogHash] = React.useState(false)
  const [showVerify, setShowVerify] = React.useState(false)
  const [showReset, setShowReset] = React.useState(false)
  const [nameModal, setNameModal] = React.useState()
  const { links, urls: urlCommon } = PropertiesCommon
  const { urls } = PropertiesSite[arcSite]

  React.useEffect(() => {
    Sentry.init({
      dsn: urlCommon.sentrySign,
      debug: env !== PROD,
      release: `arc-deployment@${deployment}`,
      environment: env,
      ignoreErrors: [
        'Unexpected end of JSON input',
        'JSON.parse: unexpected end of data at line 1 column 1 of the JSON data',
        'JSON Parse error: Unexpected EOF',
      ],
      denyUrls: [/delivery\.adrecover\.com/, /analytics/, /facebook/],
    })

    Sentry.configureScope((scope) => {
      scope.setTag('brand', arcSite)
    })

    addScriptAsync({
      name: 'IdentitySDK',
      url: links.identity,
      includeNoScript: false,
    })
      .then(() => {
        window.Identity.options({ apiOrigin: urls.arcOrigin })
      })
      .catch((errIdentitySDK) => {
        Sentry.captureEvent({
          message: 'SDK Identity no ha cargado correctamente',
          level: 'error',
          extra: errIdentitySDK || {},
        })
      })

    const UrlRef = window.document.referrer
    if (UrlRef && !UrlRef.match(/facebook.com/)) {
      deleteCookie('signreferer')
      setCookie('signreferer', UrlRef, 365)
    }

    if (getQuery('signHard') || getQuery('signwallHard')) {
      setShowHard(true)
      setNameModal('hard')
    } else if (getQuery('signEmail') || getQuery('reloginEmail')) {
      setShowReEmail(true)
      setNameModal('relogemail')
    } else if (getQuery('signHash') || getQuery('reloginHash')) {
      setShowRelogHash(true)
      setNameModal('reloghash')
    } else if (getQuery('tokenVerify')) {
      setShowVerify(true)
      setNameModal('verify')
    } else if (getQuery('tokenReset')) {
      setShowReset(true)
      setNameModal('resetpass')
    } else {
      setShowOrganic(true)
      setNameModal('organico')
    }
  }, [])

  const closePopUp = () => {
    if (typeof window !== 'undefined') {
      if (
        getCookie('signreferer') &&
        getCookie('signreferer') !== '' &&
        !getCookie('signreferer').match(/\/signwall\//)
      ) {
        const URL_CLEAR = getCookie('signreferer').split('?')
        deleteCookie('signreferer')
        window.location.href = `${URL_CLEAR[0]}?ref=signwall`
      } else {
        deleteCookie('signreferer')
        window.location.href = '/?ref=signwall'
      }
    }
  }

  return (
    <>
      {(showOrganic || showHard || showReEmail || showRelogHash) && (
        <>
          {!isLogged() ? (
            <SignOrganic
              onClose={() => closePopUp()}
              arcSite={arcSite}
              typeDialog={nameModal}
            />
          ) : (
            <> {closePopUp()}</>
          )}
        </>
      )}

      {(showVerify || showReset) && (
        <SignOrganic
          onClose={() => closePopUp()}
          arcSite={arcSite}
          typeDialog={nameModal}
          tokenVerify={showVerify && getQuery('tokenVerify')}
          tokenReset={showReset && getQuery('tokenReset')}
        />
      )}
    </>
  )
}

AuthUser.label = 'Signwall - Página Login / Registro / Hard'

export default AuthUser
