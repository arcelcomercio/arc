import Identity from '@arc-publishing/sdk-identity'
import { isUserIdentity } from '@arc-publishing/sdk-identity/lib/sdk/userIdentity'
import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import * as React from 'react'
import { FC } from 'types/features'

import {
  SdksProvider,
  SdkStatus,
  useSdksContext,
} from '../../../contexts/subscriptions-sdks'
import { deleteCookie, getCookie } from '../../../utilities/client/cookies'
import { ContentTiers } from '../../../utilities/constants/content-tiers'
import { getQuery } from '../../../utilities/parse/queries'
import { isLoggedIn } from '../../../utilities/subscriptions/identity'
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

const SignwallComponent = () => {
  const [activeWall, setActiveWall] = React.useState<Walls | null>()

  useSdksContext()
  const { status } = useSdksContext()
  const { arcSite } = useAppContext()
  const { activeSignwall, activePaywall, activeRegisterwall } = getProperties(
    arcSite
  )

  function getListSubs() {
    // const apiOrigin = getOriginAPI(arcSite)
    // Identity.options({
    //   apiOrigin,
    // })

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

  function hasActiveSubscriptions() {
    getListSubs()
      .then((p) => {
        if (p && p.length === 0) {
          // no tengo subs -> muestra valla
          window.showArcP = true
          window.top?.postMessage(
            { id: 'iframe_paywall' },
            window.location.origin
          )
          setActiveWall(Walls.Premium)
        } else {
          // tengo subs
          unblockContent()
        }
      })
      .catch((err) => {
        window.console.error(err)
      })
  }

  function getPremium() {
    if (isLoggedIn()) {
      if (activeRegisterwall) {
        unblockContent()
      } else {
        hasActiveSubscriptions()
      }
    } else {
      window.showArcP = true
      setActiveWall(Walls.Premium)
    }
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
      : ContentTiers.Metered

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
    if (typeContentTier === ContentTiers.Locked) {
      getPremium()
    } else if (W.ArcP) {
      W.ArcP.run({
        paywallFunction: (campaignURL: string) => {
          const isLogged = isLoggedIn()
          if (/signwallHard/.test(campaignURL) && !isLogged) {
            W.location.href = getUrlSignwall(arcSite, 'signwallHard', '1')
          } else if (/signwallPaywall/.test(campaignURL) && isLogged) {
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
            return getListSubs().then((p) => ({
              s: isLoggedIn(),
              p: p || null,
              timeTaken: 100,
              updated: Date.now(),
            }))
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
          return Promise.resolve({
            l: isLoggedIn(),
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

    window.top?.postMessage(
      { id: messageId, redirectUrl: urlSignwall },
      window.location.origin
    )
    window.location.href = urlSignwall
  }

  function checkCookieHash() {
    deleteCookie('ArcId.USER_INFO')
    const dataContType = window.document.head.querySelector(
      'meta[name="content-type"]'
    )
    if (
      getCookie('arc_e_id') &&
      dataContType &&
      (activePaywall || activeRegisterwall)
    ) {
      redirectURL('reloginHash', '1')
    }
    return null
  }

  function closeWall() {
    setActiveWall(null)
    window.history.pushState({}, document.title, '/')
    if (getQuery('signOrganic')) {
      window.location.reload()
    }
    return null
  }

  React.useEffect(() => {
    if (activeSignwall) {
      window.requestIdle(() => {
        const tokenVerify = getQuery('tokenVerify')
        if (tokenVerify) redirectURL('tokenVerify', tokenVerify)

        const tokenReset = getQuery('tokenReset')
        if (tokenReset) redirectURL('tokenReset', tokenReset)

        const reloginEmail = getQuery('reloginEmail')
        if (reloginEmail) redirectURL('reloginEmail', reloginEmail)

        if (!isLoggedIn()) checkCookieHash()
      })
    }
  }, [])

  React.useEffect(() => {
    if ((activePaywall || activeRegisterwall) && status === SdkStatus.Ready) {
      window.requestIdle(() => getPaywall())
    }
  }, [status])

  return activePaywall || activeRegisterwall ? (
    <>
      {getQuery('signPaywall') ||
        (activeWall === Walls.Paywall && (
          <PaywallModal
            onClose={() => closeWall()}
            arcSite={arcSite}
            typeDialog="paywall"
          />
        ))}

      {getQuery('signPremium') ||
        (activeWall === Walls.Premium && (
          <PremiumModal
            onClose={() => closeWall()}
            arcSite={arcSite}
            typeDialog="premium"
          />
        ))}
    </>
  ) : null
}

const SignwallComponentContainer: FC = () => (
  <SdksProvider>
    <SignwallComponent />
  </SdksProvider>
)

export default SignwallComponentContainer
