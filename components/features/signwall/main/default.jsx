import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import Fingerprint2 from 'fingerprintjs2'

import { Paywall } from './_children/paywall'
import { Premium } from './_children/premium'

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
      showPaywall: false,
      showPremium: false,
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
    const { siteProperties, arcSite } = this.props
    const W = window || {}

    const iOS = /iPad|iPhone|iPod/.test(W.navigator.userAgent) && !W.MSStream
    const dataContTyp = W.document.querySelector('meta[name="content-type"]')
    const dataContSec = W.document.querySelector('meta[name="section-id"]')
    const dataContentPremium = W.content_paywall || false
    const URL_ORIGIN = Domains.getOriginAPI(arcSite)

    if (iOS && QueryString.getQuery('surface') === 'meter_limit_reached') {
      const artURL = decodeURIComponent(
        QueryString.getQuery('article_url') || ''
      )
      W.sessionStorage.setItem('paywall_last_url', artURL)
      W.location.href = Domains.getUrlLandingAuth(arcSite)
    }

    if (dataContentPremium && siteProperties.activePaywall) {
      this.getPremium()
    } else if (W.ArcP) {
      W.ArcP.run({
        paywallFunction: campaignURL => {
          if (campaignURL.match(/signwallHard/)) {
            W.location.href = Domains.getUrlSignwall(
              arcSite,
              'signwallHard',
              '1'
            )
          }

          if (campaignURL.match(/signwallPaywall/)) {
            this.setState({ showPaywall: true })
          }
        },
        contentType: dataContTyp ? dataContTyp.getAttribute('content') : 'none',
        section: dataContSec ? dataContSec.getAttribute('content') : 'none',
        userName: W.Identity.userIdentity.uuid || null,
        jwt: W.Identity.userIdentity.accessToken || null,
        apiOrigin: URL_ORIGIN,
        customSubCheck: () => {
          // user subscription state only GESTION & EL COMERCIO
          if (
            siteProperties.activePaywall &&
            W.Identity.userIdentity.accessToken
          ) {
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
          // user register state
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
    const { siteProperties, arcSite } = this.props

    if (typeof window !== 'undefined') {
      const dataContType = window.document.querySelector(
        'meta[name="content-type"]'
      )
      if (
        Cookies.getCookie('arc_e_id') &&
        dataContType &&
        siteProperties.activePaywall
      ) {
        window.location.href = Domains.getUrlSignwall(
          arcSite,
          'reloginHash',
          '1'
        )
      }
    }
    return null
  }

  redirectURL = (typeDialog, hash) => {
    const { arcSite } = this.props
    window.location.href = Domains.getUrlSignwall(arcSite, typeDialog, hash)
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
        window.location.href = Domains.getUrlSignwall(
          arcSite,
          'signwallOrganic',
          '1'
        )
      }
    }
  }

  render() {
    const { userName, initialUser, showPaywall, showPremium } = this.state
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
            {this.getUrlParam('tokenVerify') && (
              <>
                {this.redirectURL(
                  'tokenVerify',
                  this.getUrlParam('tokenVerify')
                )}
              </>
            )}

            {this.getUrlParam('tokenReset') && (
              <>
                {this.redirectURL('tokenReset', this.getUrlParam('tokenReset'))}
              </>
            )}

            {this.getUrlParam('reloginEmail') && (
              <>
                {this.redirectURL(
                  'reloginEmail',
                  this.getUrlParam('reloginEmail')
                )}
              </>
            )}

            {!this.checkSession() && <>{this.checkCookieHash()}</>}
          </>
        )}

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

export default SignwallComponent
