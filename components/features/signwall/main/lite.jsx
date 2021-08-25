import Identity from '@arc-publishing/sdk-identity'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'

import { SdksProvider } from '../../../contexts/subscriptions-sdks'
import { getCookie, setCookie } from '../../../utilities/client/cookies'
import { getQuery } from '../../../utilities/parse/queries'
import {
  getOriginAPI,
  getUrlLandingAuth,
  getUrlSignwall,
} from '../_dependencies/domains'
import { getEntitlement } from '../_dependencies/services'
import { Paywall } from './_children/paywall'
import { Premium } from './_children/premium'

@Consumer
class SignwallComponent extends PureComponent {
  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {
      showPaywall: false,
      showPremium: false,
    }
  }

  componentDidMount() {
    const { siteProperties } = this.props

    const fpPromise = FingerprintJS.load()
    fpPromise
      .then((fp) => fp.get())
      .then((result) => {
        setCookie('gecdigarc', result.visitorId, 365)
        window.console.log({ result })
      })
      .catch((error) => {
        window.console.error(
          'Ha ocurrido un error al crear la cookie - gecdigarc: ',
          error
        )
      })

    if (siteProperties.activeSignwall) {
      window.requestIdle(() => {
        const tokenVerify = this.getUrlParam('tokenVerify')
        if (tokenVerify) this.redirectURL('tokenVerify', tokenVerify)

        const tokenReset = this.getUrlParam('tokenReset')
        if (tokenReset) this.redirectURL('tokenReset', tokenReset)

        const reloginEmail = this.getUrlParam('reloginEmail')
        if (reloginEmail) this.redirectURL('reloginEmail', reloginEmail)

        if (!this.checkSession()) this.checkCookieHash()
      })
    }

    if (siteProperties.activePaywall) {
      window.requestIdle(() => this.getPaywall())
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  getPremium() {
    this._isMounted = true
    if (typeof window !== 'undefined' && this._isMounted) {
      if (!this.checkSession()) {
        window.showArcP = true
        this.setState({ showPremium: true })
      } else {
        return this.getListSubs().then((p) => {
          if (p && p.length === 0) {
            window.showArcP = true
            window.top.postMessage(
              { id: 'iframe_paywall' },
              window.location.origin
            )
            this.setState({ showPremium: true })
          } else {
            const divPremium = document.getElementById('contenedor')
            if (divPremium) {
              divPremium.classList.remove('story-content__nota-premium')
              divPremium.removeAttribute('style')
            }
            const parallaxBannerDiv = document.querySelector('.story-subs-call')
            if (parallaxBannerDiv) {
              parallaxBannerDiv.style = 'display:none;'
            }
          }
          return false // tengo subs :D
        })
      }
    }
    return false
  }

  getPaywall() {
    const { arcSite } = this.props
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
      this.getPremium()
    } else if (W.ArcP) {
      W.ArcP.run({
        paywallFunction: (campaignURL) => {
          if (campaignURL.match(/signwallHard/) && !this.checkSession()) {
            W.location.href = getUrlSignwall(arcSite, 'signwallHard', '1')
          } else if (
            campaignURL.match(/signwallPaywall/) &&
            this.checkSession()
          ) {
            this.setState({ showPaywall: true })
          }
        },

        contentType:
          dataContTyp && typeContentTier !== 'free'
            ? dataContTyp.getAttribute('content')
            : 'none',

        section:
          dataContSec && typeContentTier !== 'free'
            ? dataContSec.getAttribute('content')
            : 'none',

        userName: Identity.userIdentity.uuid || null,
        jwt: Identity.userIdentity.accessToken || null,
        apiOrigin: URL_ORIGIN,
        customSubCheck: () => {
          if (Identity.userIdentity.accessToken) {
            return this.getListSubs().then((p) => {
              const isLoggedInSubs = this.checkSession()
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
          const isLoggedIn = this.checkSession()
          return Promise.resolve({
            l: isLoggedIn,
            timeTaken: Date.now() - start,
            updated: Date.now(),
          })
        },
      })
    }
  }

  getListSubs() {
    const { arcSite } = this.props
    const apiOrigin = getOriginAPI(arcSite)
    Identity.options({
      apiOrigin,
    })
    return Identity.extendSession().then((resExt) => {
      const checkEntitlement = getEntitlement(resExt.accessToken, arcSite)
        .then((res) => {
          if (res.skus) {
            const result = Object.keys(res.skus).map((key) => res.skus[key].sku)
            this.listSubs = result
            return result
          }
          return []
        })
        .catch((err) => window.console.error(err))

      return checkEntitlement
    })
  }

  checkSession = () => {
    if (typeof window !== 'undefined') {
      const profileStorage = window.localStorage.getItem('ArcId.USER_PROFILE')
      const sesionStorage = window.localStorage.getItem('ArcId.USER_INFO')
      if (profileStorage) {
        return !(profileStorage === 'null' || sesionStorage === '{}') || false
      }
    }
    return false
  }

  checkCookieHash = () => {
    const { siteProperties, arcSite } = this.props

    if (typeof window !== 'undefined') {
      const dataContType = window.document.head.querySelector(
        'meta[name="content-type"]'
      )
      if (
        getCookie('arc_e_id') &&
        dataContType &&
        siteProperties.activePaywall
      ) {
        const urlSignwallRelogin = getUrlSignwall(arcSite, 'reloginHash', '1')
        window.top.postMessage(
          { id: 'iframe_relogin', redirectUrl: urlSignwallRelogin },
          window.location.origin
        )
        window.location.href = urlSignwallRelogin
      }
    }
    return null
  }

  redirectURL = (typeDialog, hash) => {
    const { arcSite } = this.props
    const urlSignwall = getUrlSignwall(arcSite, typeDialog, hash)
    window.top.postMessage(
      { id: 'iframe_signwall', redirectUrl: urlSignwall },
      window.location.origin
    )
    window.location.href = urlSignwall
  }

  getUrlParam = (name) => {
    const vars = {}
    if (typeof window !== 'undefined') {
      window.location.href.replace(
        /[?&]+([^=&]+)=([^&]*)/gi,
        (m, key, value) => {
          vars[key] = value
        }
      )
      if (vars[name]) {
        setTimeout(() => {
          switch (name) {
            case 'signPaywall':
              this.setState({ showPaywall: true })
              break
            case 'signPremium':
              this.setState({ showPremium: true })
              break
            default:
          }
        }, 500)
      }
    }
    return vars[name]
  }

  closePopUp(name) {
    this._isMounted = true
    if (this._isMounted) this.setState({ [name]: false })

    if (typeof window !== 'undefined') {
      if (name !== 'showOrganic') {
        window.history.pushState({}, document.title, '/')
      }
      if (this.getUrlParam('signOrganic')) {
        window.history.pushState({}, document.title, '/')
        window.location.reload()
      }
    }
    return null
  }

  render() {
    const { showPaywall, showPremium } = this.state
    const { arcSite, siteProperties } = this.props
    return (
      <>
        {siteProperties.activePaywall && (
          <>
            {(this.getUrlParam('signPaywall') || showPaywall) && (
              <Paywall
                onClose={() => this.closePopUp('showPaywall')}
                arcSite={arcSite}
                typeDialog="paywall"
              />
            )}

            {(this.getUrlParam('signPremium') || showPremium) && (
              <Premium
                onClose={() => this.closePopUp('showPremium')}
                arcSite={arcSite}
                typeDialog="premium"
              />
            )}
          </>
        )}
      </>
    )
  }
}

const SignwallComponentContainer = () => (
  <SdksProvider>
    <SignwallComponent />
  </SdksProvider>
)

export default SignwallComponentContainer
