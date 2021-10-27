import { useAppContext } from 'fusion:context'
import * as React from 'react'
import { ValuesOf } from 'types/utils'

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
import { AuthProvider } from '../_context/auth'
import { PropertiesCommon } from '../_dependencies/Properties'
import { SignOrganic } from './_children/Organic'

type ModalType = ValuesOf<Modals>

enum Modals {
  CookieName = 'signreferer',
  Hard = 'hard',
  ReloginEmail = 'relogemail',
  ReloginHash = 'reloghash',
  TokenVerify = 'verify',
  ResetPassword = 'resetpass',
  Organic = 'organico',
  Banner = 'banner',
}

const AuthUser = () => {
  const { arcSite } = useAppContext()
  const { status: identityStatus } = useSdksContext()
  const [activeModal, setActiveModal] = React.useState<ModalType>()
  const { urls: urlCommon } = PropertiesCommon

  useSentry(urlCommon.sentrySign)

  React.useEffect(() => {
    const urlRef = window.document.referrer
    if (urlRef && !/facebook.com/.test(urlRef)) {
      deleteCookie(Modals.CookieName)
      setCookie(Modals.CookieName, urlRef, 365)
    }

    if (getQuery('signHard') || getQuery('signwallHard')) {
      setActiveModal(Modals.Hard)
    } else if (getQuery('signEmail') || getQuery('ReloginEmail')) {
      setActiveModal(Modals.ReloginEmail)
    } else if (getQuery('signHash') || getQuery('ReloginHash')) {
      setActiveModal(Modals.ReloginHash)
    } else if (getQuery('tokenVerify') || getQuery('tokenMagicLink')) {
      setActiveModal(Modals.TokenVerify)
    } else if (getQuery('tokenReset')) {
      setActiveModal(Modals.ResetPassword)
    } else if (getQuery('banner')) {
      setActiveModal(Modals.Banner)
    } else {
      setActiveModal(Modals.Organic)
    }
  }, [])

  const closePopUp = () => {
    if (typeof window !== 'undefined') {
      const cookie = getCookie(Modals.CookieName)
      if (cookie && cookie !== '' && !/\/signwall\//.test(cookie)) {
        const URL_CLEAR = cookie.split('?')
        deleteCookie(Modals.CookieName)
        window.location.href = `${URL_CLEAR[0]}?ref=signwall`
      } else {
        deleteCookie(Modals.CookieName)
        window.location.href = '/?ref=signwall'
      }
    }
  }

  const isOrganic = activeModal === Modals.Organic
  const isBanner = activeModal === Modals.Banner
  const isHard = activeModal === Modals.Hard
  const isReloginEmail = activeModal === Modals.ReloginEmail
  const isReloginHash = activeModal === Modals.ReloginHash
  const isTokenVerify = activeModal === Modals.TokenVerify
  const isResetPassword = activeModal === Modals.ResetPassword

  return (
    <>
      {identityStatus === SdkStatus.Loading ? (
        <Loading typeBg="full" />
      ) : (
        <>
          {(isOrganic ||
            isHard ||
            isReloginEmail ||
            isReloginHash ||
            isBanner) && (
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
              tokenMagicLink={isTokenVerify && getQuery('tokenMagicLink')}
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
    <AuthProvider>
      <AuthUser />
    </AuthProvider>
  </SdksProvider>
)

AuthUserContainer.label = 'Signwall - Página Login / Registro / Hard'

export default AuthUserContainer
