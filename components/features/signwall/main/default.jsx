import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import Fingerprint2 from 'fingerprintjs2'

import { Generic } from './_main/generic'
import { Paywall } from './_main/paywall'
import { Premium } from './_main/premium'

import Services from '../_dependencies/services'
import GetProfile from '../_dependencies/get-profile'
import Domains from '../_dependencies/domains'
import Cookies from '../_dependencies/cookies'
import Taggeo from '../_dependencies/taggeo'
import QueryString from '../_dependencies/querystring'

const classes = {
  iconLogin: 'nav__icon icon-user  title-sm text-primary-color',
}

@Consumer
class SignwallComponent extends PureComponent {
  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {
      userName: false,
      initialUser: false,
      showOrganic: false,
      showHard: false,
      showVerify: false,
      showReset: false,
      showReEmail: false,
      showPaywall: false,
      showPremium: false,
      showRelogHash: false,
    }
  }

  componentDidMount() {
    const { siteProperties, arcSite } = this.props
    if (typeof window !== 'undefined' && window.Identity) {
      window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })
      if (window.Sales !== undefined) {
        window.Sales.options({ apiOrigin: Domains.getOriginAPI(arcSite) })
      }
      Fingerprint2.getV18({}, result => {
        Cookies.setCookie('gecdigarc', result, 365)
      })
    }

    this.checkUserName()

    if (siteProperties.activePaywall) {
      this.getPaywall()
    }
  }

  componentDidUpdate() {
    this.checkUserName()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  getPremium() {
    this._isMounted = true
    if (typeof window !== 'undefined' && this._isMounted) {
      if (!this.checkSession()) {
        this.setState({ showPremium: true })
      } else {
        return this.getListSubs().then(p => {
          if (p && p.length === 0) {
            this.setState({ showPremium: true })
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
    const dataContTyp = W.document.querySelector('meta[name="content-type"]')
    const dataContSec = W.document.querySelector('meta[name="section-id"]')
    const contentTier = W.document.querySelector(
      'meta[property="article:content_tier"]'
    )
    const dataContentPremium = W.content_paywall || false
    const URL_ORIGIN = Domains.getOriginAPI(arcSite)
    const typeContentTier = contentTier
      ? contentTier.getAttribute('content')
      : 'metered'

    if (iOS && QueryString.getQuery('surface') === 'meter_limit_reached') {
      const artURL = decodeURIComponent(
        QueryString.getQuery('article_url') || ''
      )
      W.sessionStorage.setItem('paywall_last_url', artURL)
      W.location.href = Domains.getUrlLandingAuth(arcSite)
    }

    if (dataContentPremium || typeContentTier === 'locked') {
      this.getPremium()
    } else if (W.ArcP) {
      W.ArcP.run({
        paywallFunction: campaignURL => {
          W.location.href = `${campaignURL}&ref=${W.location.pathname}`
        },

        contentType:
          dataContTyp && typeContentTier !== 'free'
            ? dataContTyp.getAttribute('content')
            : 'none',

        section:
          dataContSec && typeContentTier !== 'free'
            ? dataContSec.getAttribute('content')
            : 'none',

        userName: W.Identity.userIdentity.uuid || null,
        jwt: W.Identity.userIdentity.accessToken || null,
        apiOrigin: URL_ORIGIN,
        customSubCheck: () => {
          if (W.Identity.userIdentity.accessToken) {
            return this.getListSubs().then(p => {
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
    const W = window
    return W.Identity.extendSession().then(resExt => {
      const checkEntitlement = Services.getEntitlement(
        resExt.accessToken,
        arcSite
      )
        .then(res => {
          if (res.skus) {
            const result = Object.keys(res.skus).map(key => {
              return res.skus[key].sku
            })
            this.listSubs = result
            return result
          }
          return []
        })
        .catch(err => W.console.error(err))

      return checkEntitlement
    })
  }

  checkSession = () => {
    if (typeof window !== 'undefined') {
      const profileStorage =
        window.localStorage.getItem('ArcId.USER_PROFILE') ||
        window.sessionStorage.getItem('ArcId.USER_PROFILE')
      const sesionStorage = window.localStorage.getItem('ArcId.USER_INFO')
      if (profileStorage) {
        return !(profileStorage === 'null' || sesionStorage === '{}') || false
      }
    }
    return false
  }

  checkCookieHash = () => {
    const { siteProperties } = this.props

    if (typeof window !== 'undefined') {
      const dataContType = window.document.querySelector(
        'meta[name="content-type"]'
      )
      if (
        Cookies.getCookie('arc_e_id') &&
        dataContType &&
        siteProperties.activePaywall
      ) {
        window.location.href = '/?reloginHash=1'
      }
    }
    return null
  }

  getUrlParam = name => {
    const vars = {}
    if (typeof window !== 'undefined')
      window.location.href.replace(
        /[?&]+([^=&]+)=([^&]*)/gi,
        (m, key, value) => {
          vars[key] = value
        }
      )
    if (vars[name]) {
      setTimeout(() => {
        switch (name) {
          case 'signOrganic':
            this.setState({ showOrganic: true })
            break
          case 'signwallHard':
          case 'signHard':
            this.setState({ showHard: true })
            break
          case 'tokenVerify':
            this.setState({ showVerify: true })
            break
          case 'tokenReset':
            this.setState({ showReset: true })
            break
          case 'reloginEmail':
          case 'signEmail':
            this.setState({ showReEmail: true })
            break
          case 'signwallPaywall':
          case 'signPaywall':
            this.setState({ showPaywall: true })
            break
          case 'signPremium':
            this.setState({ showPremium: true })
            break
          case 'reloginHash':
          case 'signHash':
            this.setState({ showRelogHash: true })
            break
          default:
        }
      }, 500)
    }
    return vars[name]
  }

  checkUserName() {
    this._isMounted = true
    const { arcSite } = this.props

    if (this.checkSession() && this._isMounted) {
      this.setState({
        userName: new GetProfile().username,
        initialUser: new GetProfile().initname,
      })
    } else if (this._isMounted) {
      this.setState({
        userName: arcSite === 'elcomercio' ? 'Iniciar' : 'Iniciar Sesión',
        initialUser: false,
      })
    }
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

  toogleButton() {
    const { arcSite } = this.props
    if (typeof window !== 'undefined') {
      if (this.checkSession()) {
        Taggeo(`Web_Sign_Wall_General`, `web_swg_link_ingresacuenta`)
        window.location.href = Domains.getUrlProfile(arcSite)
      } else {
        Taggeo(`Web_Sign_Wall_General`, `web_swg_link_ingresaperfil`)
        this.setState({ showOrganic: true })
      }
    }
  }

  render() {
    const {
      userName,
      initialUser,
      showOrganic,
      showHard,
      showVerify,
      showReset,
      showReEmail,
      showPaywall,
      showPremium,
      showRelogHash,
    } = this.state
    const { arcSite, siteProperties, classButton } = this.props
    return (
      <>
        <button
          site={arcSite}
          className={classButton}
          type="button"
          onClick={() => this.toogleButton()}>
          <i className={!initialUser ? `${classes.iconLogin}` : ``}>
            {initialUser}
          </i>
          <span className="capitalize">{userName}</span>
        </button>

        {siteProperties.activeSignwall && (
          <>
            {(this.getUrlParam('signOrganic') || showOrganic) && (
              <Generic
                onClose={() => this.closePopUp('showOrganic')}
                arcSite={arcSite}
                typeDialog="organico"
              />
            )}

            {this.getUrlParam('tokenVerify') && showVerify && (
              <Generic
                onClose={() => this.closePopUp('showVerify')}
                arcSite={arcSite}
                typeDialog="verify"
                tokenVerify={this.getUrlParam('tokenVerify')}
              />
            )}

            {this.getUrlParam('tokenReset') && showReset && (
              <Generic
                onClose={() => this.closePopUp('showReset')}
                arcSite={arcSite}
                typeDialog="resetpass"
                tokenReset={this.getUrlParam('tokenReset')}
              />
            )}

            {!this.checkSession() && (
              <>
                {this.checkCookieHash()}

                {(this.getUrlParam('signHard') ||
                  this.getUrlParam('signwallHard')) &&
                  showHard && (
                    <Generic
                      onClose={() => this.closePopUp('showHard')}
                      arcSite={arcSite}
                      typeDialog="hard"
                    />
                  )}

                {(this.getUrlParam('signEmail') ||
                  this.getUrlParam('reloginEmail')) &&
                  showReEmail && (
                    <Generic
                      onClose={() => this.closePopUp('showReEmail')}
                      arcSite={arcSite}
                      typeDialog="relogemail"
                    />
                  )}

                {(this.getUrlParam('signHash') ||
                  this.getUrlParam('reloginHash')) &&
                  showRelogHash && (
                    <Generic
                      onClose={() => this.closePopUp('showRelogHash')}
                      arcSite={arcSite}
                      typeDialog="reloghash"
                    />
                  )}
              </>
            )}
          </>
        )}

        {siteProperties.activePaywall && (
          <>
            {(this.getUrlParam('signPaywall') ||
              this.getUrlParam('signwallPaywall')) &&
              showPaywall && (
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

export default SignwallComponent
