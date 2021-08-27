import Identity from '@arc-publishing/sdk-identity'
import { isUserIdentity } from '@arc-publishing/sdk-identity/lib/sdk/userIdentity'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import * as React from 'react'
import { FC } from 'types/features'

import { SdksProvider } from '../../../contexts/subscriptions-sdks'
import { getCookie, setCookie } from '../../../utilities/client/cookies'
import { ContentTiers } from '../../../utilities/constants/content-tiers'
import { getQuery } from '../../../utilities/parse/queries'
import {
  getOriginAPI,
  getUrlLandingAuth,
  getUrlSignwall,
} from '../_dependencies/domains'
import { getEntitlement } from '../_dependencies/services'
import { Paywall as PaywallModal } from './_children/paywall'
import { Premium as PremiumModal } from './_children/premium'

enum Walls {
  Paywall = 'paywall',
  Premium = 'premium',
}

const SignwallComponent: FC = () => {
  const [activeWall, setActiveWall] = React.useState<Walls | null>()

  const { arcSite } = useAppContext()
  const { activeSignwall, activePaywall } = getProperties(arcSite)

  function getListSubs() {
    const apiOrigin = getOriginAPI(arcSite)
    Identity.options({
      apiOrigin,
    })

    return Identity.extendSession().then((resExt) => {
      if (isUserIdentity(resExt)) {
        const checkEntitlement = getEntitlement(resExt.accessToken, arcSite)
          .then((res) => {
            if (res.skus) {
              const result = Object.keys(res.skus).map(
                (key) => res.skus[key].sku
              )
              return result
            }
            return []
          })
          .catch((err) => window.console.error(err))

        return checkEntitlement
      }
      return Promise.reject(new Error(`${resExt.code} - ${resExt.message}`))
    })
  }

  function checkSession() {
    if (typeof window !== 'undefined') {
      const profileStorage = window.localStorage.getItem('ArcId.USER_PROFILE')
      const sesionStorage = window.localStorage.getItem('ArcId.USER_INFO')
      if (profileStorage) {
        return !(profileStorage === 'null' || sesionStorage === '{}') || false
      }
    }
    return false
  }

  function unblockContent() {
    const divPremium = document.getElementById('contenedor')
    if (divPremium) {
      divPremium.classList.remove('story-content__nota-premium')
      divPremium.removeAttribute('style')
    }
    const parallaxBannerDiv = document.querySelector<HTMLElement>(
      '.story-subs-call'
    )
    if (parallaxBannerDiv) {
      parallaxBannerDiv.style.display = 'none'
    }
  }

  function getPremium() {
    if (!checkSession()) {
      window.showArcP = true
      setActiveWall(Walls.Premium)
    } else {
      return getListSubs()
        .then((p) => {
          if (p && p.length === 0) {
            // no tengo subs -> muestra valla
            window.showArcP = true
            window.top.postMessage(
              { id: 'iframe_paywall' },
              window.location.origin
            )
            setActiveWall(Walls.Premium)
          } else {
            // tengo subs
            unblockContent()
          }
          return false // tengo subs :D
        })
        .catch((err) => {
          window.console.error(err)
        })
    }

    return false
  }

  function getPaywall() {
    const W = window || {}

    const iOS = /iPad|iPhone|iPod/.test(W.navigator.userAgent) && !W.MSStream
    const dataContTyp = W.document.head.querySelector(
      'meta[name="content-type"]'
    )
    const dataContSec = W.document.head.querySelector('meta[name="section-id"]')
    const contentTier = W.document.head.querySelector(
      'meta[property="article:content_tier"]'
    )
    const URL_ORIGIN = getOriginAPI(arcSite)
    const typeContentTier = contentTier
      ? contentTier.getAttribute('content')
      : 'metered'

    if (iOS && getQuery('surface') === 'meter_limit_reached') {
      const artURL = decodeURIComponent(getQuery('article_url') || '')
      W.sessionStorage.setItem('paywall_last_url', artURL)
      W.postMessage(
        {
          id: 'iframe_signwall',
          redirectUrl: getUrlLandingAuth(arcSite),
        },
        W.location.origin
      )
      W.location.href = getUrlLandingAuth(arcSite)
    }

    if (typeContentTier === 'locked') {
      getPremium()
    } else if (W.ArcP) {
      W.ArcP.run({
        paywallFunction: (campaignURL: string) => {
          if (/signwallHard/.test(campaignURL) && !checkSession()) {
            W.location.href = getUrlSignwall(arcSite, 'signwallHard', '1')
          } else if (/signwallPaywall/.test(campaignURL) && checkSession()) {
            setActiveWall(Walls.Paywall)
          }
        },

        contentType:
          dataContTyp && typeContentTier !== ContentTiers.Free
            ? dataContTyp.getAttribute('content')
            : 'none',

        section:
          dataContSec && typeContentTier !== ContentTiers.Free
            ? dataContSec.getAttribute('content')
            : 'none',

        userName: Identity.userIdentity.uuid || null,
        jwt: Identity.userIdentity.accessToken || null,
        apiOrigin: URL_ORIGIN,
        customSubCheck: () => {
          if (Identity.userIdentity.accessToken) {
            return getListSubs().then((p) => {
              const isLoggedInSubs = checkSession()
              return {
                s: isLoggedInSubs,
                p: p || null,
                timeTaken: 100,
                updated: Date.now(),
              }
            })
          }
          return {
            s: false,
            p: null,
            timeTaken: 100,
            updated: Date.now(),
          }
        },
        customRegCheck: () => {
          const start = Date.now()
          const isLoggedIn = checkSession()
          return Promise.resolve({
            l: isLoggedIn,
            timeTaken: Date.now() - start,
            updated: Date.now(),
          })
        },
      })
    }
  }

  function redirectURL(
    typeDialog: 'tokenVerify' | 'tokenReset' | 'reloginEmail' | 'reloginHash',
    hash: string
  ) {
    const urlSignwall = getUrlSignwall(arcSite, typeDialog, hash)
    const messageId =
      typeDialog === 'reloginHash' ? 'iframe_relogin' : 'iframe_signwall'

    window.top.postMessage(
      { id: messageId, redirectUrl: urlSignwall },
      window.location.origin
    )
    window.location.href = urlSignwall
  }

  function checkCookieHash() {
    const dataContType = window.document.head.querySelector(
      'meta[name="content-type"]'
    )

    if (getCookie('arc_e_id') && dataContType && activePaywall) {
      redirectURL('reloginHash', '1')
    }
    return null
  }

  function closeWall() {
    setActiveWall(null)
    if (getQuery('signOrganic')) {
      window.history.pushState({}, document.title, '/')
      window.location.reload()
    }
    return null
  }

  React.useEffect(() => {
    const fpPromise = FingerprintJS.load()
    fpPromise
      .then((fp) => fp.get())
      .then((result) => {
        setCookie('gecdigarc', result.visitorId, 365)
      })
      .catch((error) => {
        window.console.error(
          'Ha ocurrido un error al crear la cookie - gecdigarc: ',
          error
        )
      })
  }, [])

  React.useEffect(() => {
    if (activeSignwall) {
      window.requestIdle(() => {
        const tokenVerify = getQuery('tokenVerify')
        if (tokenVerify) redirectURL('tokenVerify', tokenVerify)

        const tokenReset = getQuery('tokenReset')
        if (tokenReset) redirectURL('tokenReset', tokenReset)

        const reloginEmail = getQuery('reloginEmail')
        if (reloginEmail) redirectURL('reloginEmail', reloginEmail)

        if (!checkSession()) checkCookieHash()
      })
    }
  }, [])

  React.useEffect(() => {
    if (activePaywall) {
      window.requestIdle(() => getPaywall())
    }
  }, [])

  return activePaywall ? (
    <>
      {activeWall === Walls.Paywall && (
        <PaywallModal
          onClose={() => closeWall()}
          arcSite={arcSite}
          typeDialog="paywall"
        />
      )}

      {activeWall === Walls.Premium && (
        <PremiumModal
          onClose={() => closeWall()}
          arcSite={arcSite}
          typeDialog="premium"
        />
      )}
    </>
  ) : null
}

const SignwallComponentContainer = (): JSX.Element => (
  <SdksProvider>
    <SignwallComponent />
  </SdksProvider>
)

export default SignwallComponentContainer
