import { useAppContext } from 'fusion:context'
import * as React from 'react'

import {
  SdksProvider,
  SdkStatus,
  useSdksContext,
} from '../../../contexts/subscriptions-sdks'
import useSentry from '../../../hooks/useSentry'
import {
  deleteCookie,
  getCookie,
  setCookie,
} from '../../../utilities/client/cookies'
import { getQuery } from '../../../utilities/parse/queries'
import { isLoggedIn } from '../../../utilities/subscriptions/identity'
import Loading from '../../signwall/_children/loading'
import { PropertiesCommon } from '../_dependencies/Properties'
import { SignOrganic } from './_children/Organic'

const COOKIE_NAME = 'signreferer'
const HARD = 'hard'
const RELOGIN_EMAIL = 'relogemail'
const RELOGIN_HASH = 'reloghash'
const TOKEN_VERIFY = 'verify'
const RESET_PASSWORD = 'resetpass'
const ORGANIC = 'organico'

type ModalType =
  | typeof COOKIE_NAME
  | typeof HARD
  | typeof RELOGIN_EMAIL
  | typeof RELOGIN_HASH
  | typeof TOKEN_VERIFY
  | typeof RESET_PASSWORD
  | typeof ORGANIC

const AuthUser = () => {
  const { arcSite } = useAppContext()
  const { status: identityStatus } = useSdksContext() || {}
  const [activeModal, setActiveModal] = React.useState<ModalType>()
  const { urls: urlCommon } = PropertiesCommon

  useSentry(urlCommon.sentrySign)

  React.useEffect(() => {
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
      {identityStatus === SdkStatus.loading ? (
        <Loading typeBg="full" />
      ) : (
        <>
          {(isOrganic || isHard || isReloginEmail || isReloginHash) && (
            <>
              {!isLoggedIn() ? (
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
      )}
    </>
  )
}

const AuthUserContainer = (): JSX.Element => (
  <SdksProvider>
    <AuthUser />
  </SdksProvider>
)

AuthUserContainer.label = 'Signwall - Página Login / Registro / Hard'

export default AuthUserContainer
