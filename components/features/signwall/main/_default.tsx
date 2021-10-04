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
import {
  SITE_DIARIOCORREO,
  SITE_ELCOMERCIO,
  SITE_GESTION,
} from '../../../utilities/constants/sitenames'
import { getQuery } from '../../../utilities/parse/queries'
import {
  getUsername,
  getUsernameInitials,
  isLoggedIn,
} from '../../../utilities/subscriptions/identity'
import { Taggeo } from '../../subscriptions/_dependencies/Taggeo'
import useFingerprint from '../../subscriptions/_hooks/useFingerprint'
import {
  getOriginAPI,
  getUrlLandingAuth,
  getUrlProfile,
  getUrlSignwall,
} from '../_dependencies/domains'
import { getEntitlement } from '../_dependencies/services'
import { Paywall as PaywallModal } from './_children/paywall'
import { Premium as PremiumModal } from './_children/premium'
import { Register as RegisterModal } from './_children/register'

export interface SignwallDefaultProps {
  classButton: string
  countOnly: boolean
}

enum Walls {
  Paywall = 'paywall',
  Premium = 'premium',
}

const classes = {
  iconLogin: 'nav__icon icon-user  title-sm text-primary-color',
}

const SignwallComponent: FC<SignwallDefaultProps> = ({
  classButton = '',
  countOnly = false,
}) => {
  useFingerprint()

  const { status } = useSdksContext()
  const { arcSite } = useAppContext()
  const { activeSignwall, activePaywall, activeRulesCounter } = getProperties(
    arcSite
  )

  const [activeWall, setActiveWall] = React.useState<Walls | null>()
  const [user, setUser] = React.useState({
    name: '',
    initials: '',
  })

  function getListSubs() {
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
  }

  function redirectURL(
    typeDialog:
      | 'tokenVerify'
      | 'tokenReset'
      | 'reloginEmail'
      | 'reloginHash'
      | 'signwallOrganic'
      | 'signwallHard',
    hash: string
  ) {
    window.location.href = getUrlSignwall(arcSite, typeDialog, hash)
  }

  function getPremium() {
    if (!isLoggedIn()) {
      setActiveWall(Walls.Premium)
    } else {
      return getListSubs()
        .then((p) => {
          // no tengo subs -> muestra valla
          if (p && p.length === 0) {
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
      : ContentTiers.Metered

    if (iOS && getQuery('surface') === 'meter_limit_reached') {
      const artURL = decodeURIComponent(getQuery('article_url') || '')
      W.sessionStorage.setItem('paywall_last_url', artURL)
      W.location.href = getUrlLandingAuth(arcSite)
    }

    if (typeContentTier === ContentTiers.Locked) {
      getPremium()
    } else if (W.ArcP) {
      W.ArcP.run({
        paywallFunction: (campaignURL: string) => {
          if (countOnly) return
          const isLogged = isLoggedIn()
          if (/signwallHard/.test(campaignURL) && !isLogged) {
            redirectURL('signwallHard', '1')
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

  function checkCookieHash() {
    deleteCookie('ArcId.USER_INFO')
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
    window.history.pushState({}, document.title, '/')
    if (getQuery('signOrganic')) {
      window.location.reload()
    }
    return null
  }

  function toogleButton() {
    if (isLoggedIn()) {
      Taggeo(`Web_Sign_Wall_General`, `web_swg_link_ingresacuenta`)
      window.location.href = getUrlProfile(arcSite)
    } else {
      Taggeo(`Web_Sign_Wall_General`, `web_swg_link_ingresaperfil`)
      redirectURL('signwallOrganic', '1')
    }
  }

  const checkUsername = React.useCallback(async () => {
    if (isLoggedIn()) {
      const name = await getUsername()
      setUser({
        name,
        initials: getUsernameInitials(name),
      })
    } else {
      let btnTitle = 'Iniciar Sesión'
      if (arcSite === SITE_ELCOMERCIO) {
        btnTitle = 'Iniciar'
      } else if (arcSite === SITE_DIARIOCORREO) {
        btnTitle = 'Regístrate'
      }
      setUser({
        name: btnTitle,
        initials: '',
      })
    }
  }, [])

  React.useEffect(() => {
    checkUsername()
    if (activeSignwall) {
      const reloginEmail = getQuery('reloginEmail')
      if (reloginEmail) redirectURL('reloginEmail', reloginEmail)

      if (!isLoggedIn()) checkCookieHash()
    }
  }, [])

  React.useEffect(() => {
    if ((activePaywall || activeRulesCounter) && status === SdkStatus.Ready) {
      window.requestIdle(() => getPaywall())
    }
  }, [status])

  return (
    <>
      <button
        aria-label={user.name}
        className={classButton}
        type="button"
        onClick={() => toogleButton()}>
        <i className={!user.initials ? `${classes.iconLogin}` : ``}>
          {user.initials}
        </i>
        <span className="capitalize" aria-hidden="true">
          {user.name ||
            (arcSite === SITE_ELCOMERCIO || arcSite === SITE_GESTION
              ? 'Bienvenido'
              : 'Mi Perfil')}
        </span>
      </button>

      {!countOnly && activePaywall ? (
        <>
          {(getQuery('signPaywall') || activeWall === Walls.Paywall) && (
            <PaywallModal
              onClose={() => closeWall()}
              arcSite={arcSite}
              typeDialog="paywall"
            />
          )}

          {(getQuery('signPremium') || activeWall === Walls.Premium) && (
            <PremiumModal
              onClose={() => closeWall()}
              arcSite={arcSite}
              typeDialog="premium"
            />
          )}
        </>
      ) : null}
    </>
  )
}

const SignwallComponentContainer: FC<SignwallDefaultProps> = ({
  classButton,
  countOnly,
}) => (
  <SdksProvider>
    <SignwallComponent classButton={classButton} countOnly={countOnly} />
  </SdksProvider>
)

export default SignwallComponentContainer
