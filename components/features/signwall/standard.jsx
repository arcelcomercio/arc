import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'

import Signwall from './default'
import SignWallHard from './_main/signwall/hard'
import SignWallVerify from './_main/signwall/verify'
import SignWallReset from './_main/signwall/reset'
import SignWallRelogin from './_main/signwall/relogin'
import SignWallPayPre from './_main/signwall/paywall-premium'
import SignwallReHash from './_main/signwall/relogin-hash'
import Services from './_main/utils/services'
import GetProfile from './_main/utils/get-profile'
import Domains from './_main/utils/domains'
import { ButtonSignwall } from './styles'
import Cookie from './_main/utils/cookie'

const services = new Services()
const Cookies = new Cookie()

const classes = {
  iconLogin: 'nav__icon icon-user  title-sm text-primary-color',
}

@Consumer
class SignwallComponent extends PureComponent {
  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {
      isActive: false,
      showHard: false,
      showVerify: false,
      showReset: false,
      showReEmail: false,
      showPaywall: false,
      showRelogHash: false,
      userName: false,
      initialUser: false,
    }
    const { arcSite } = this.props
    this.origin_api = Domains.getOriginAPI(arcSite)
  }

  componentDidMount() {
    const { siteProperties } = this.props

    if (typeof window !== 'undefined') {
      window.Identity.options({ apiOrigin: this.origin_api })
      if (window.Sales !== undefined) {
        window.Sales.options({ apiOrigin: this.origin_api })
      }
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
    if (typeof window !== 'undefined') {
      const W = window
      if (!this.checkSession()) {
        W.location.href = `/?signwallPremium=1&ref=${W.location.pathname}`
      } else {
        return this.getListSubs().then(p => {
          if (p && p.length === 0) {
            W.location.href = `/?signwallPremium=1&ref=${W.location.pathname}`
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

    const dataContTyp = W.document.querySelector('meta[name="content-type"]')
    const dataContSec = W.document.querySelector('meta[name="section-id"]')
    const dataContentPremium = W.content_paywall || false
    const URL_ORIGIN = Domains.getOriginAPI(arcSite)

    if (dataContentPremium && arcSite === 'gestion') {
      this.getPremium()
    } else if (window.ArcP) {
      W.ArcP.run({
        paywallFunction: campaignURL => {
          W.location.href = `${campaignURL}&ref=${W.location.pathname}`
        },
        contentType: dataContTyp ? dataContTyp.getAttribute('content') : 'none',
        section: dataContSec ? dataContSec.getAttribute('content') : 'none',
        userName: W.Identity.userIdentity.uuid || null,
        jwt: W.Identity.userIdentity.accessToken || null,
        apiOrigin: URL_ORIGIN,
        customSubCheck: () => {
          // user subscription state GESTION & EL COMERCIO
          if (
            (arcSite === 'gestion' || arcSite === 'elcomercio') &&
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
      const checkEntitlement = services
        .getEntitlement(resExt.accessToken, arcSite)
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
    this._isMounted = true
    const { arcSite } = this.props

    if (typeof window !== 'undefined') {
      const dataContType = window.document.querySelector(
        'meta[name="content-type"]'
      )
      if (
        Cookies.getCookie('arc_e_id') &&
        !this.checkSession() &&
        dataContType &&
        this._isMounted &&
        (arcSite === 'elcomercio' || arcSite === 'gestion')
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
          case 'signwallHard':
            this.setState({ showHard: true })
            break
          case 'tokenVerify':
            this.setState({ showVerify: true })
            break
          case 'tokenReset':
            this.setState({ showReset: true })
            break
          case 'reloginEmail':
            this.setState({ showReEmail: true })
            break
          case 'signwallPaywall':
          case 'signwallPremium':
            this.setState({ showPaywall: true })
            break
          case 'reloginHash':
            this.setState({ showRelogHash: true })
            break
          default:
        }
      }, 500)
    }
    return vars[name]
  }

  checkIsEco = () => {
    const response = services.getIpEco().then(res => {
      return !!(
        res.ip === '200.4.199.49' ||
        res.ip === '201.234.125.242' ||
        res.ip === '201.234.62.52'
      )
    })
    return response
  }

  checkUserName() {
    this._isMounted = true
    const { arcSite } = this.props

    if (this.checkSession() && this._isMounted) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        userName: new GetProfile().username,
        initialUser: new GetProfile().initname,
      })
    } else if (this._isMounted) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        userName: arcSite === 'elcomercio' ? 'Iniciar' : 'Iniciar Sesión',
        initialUser: false,
      })
    }
  }

  closeSignwall() {
    this.setState({ isActive: false })
  }

  closePopUp(name) {
    switch (name) {
      case 'signwallHard':
        this.setState({ showHard: false })
        break
      case 'tokenVerify':
        this.setState({ showVerify: false })
        break
      case 'tokenReset':
        this.setState({ showReset: false })
        break
      case 'reloginEmail':
        this.setState({ showReEmail: false })
        break
      case 'signwallPaywall':
        this.setState({ showPaywall: false })
        break
      case 'reloginHash':
        this.setState({ showRelogHash: false })
        break
      default:
        return null
    }
    if (typeof window !== 'undefined')
      window.history.pushState({}, document.title, '/')
    return null
  }

  render() {
    const {
      isActive,
      userName,
      initialUser,
      showHard,
      showVerify,
      showReset,
      showReEmail,
      showPaywall,
      showRelogHash,
    } = this.state
    const { arcSite, siteProperties, classButton } = this.props

    return (
      <>
        {classButton ? (
          <button
            site={arcSite}
            className={classButton}
            type="button"
            id={
              this.checkSession()
                ? 'web_link_ingresaperfil'
                : 'web_link_ingresacuenta'
            }
            onClick={() => this.setState({ isActive: true })}>
            <span>{userName}</span>
          </button>
        ) : (
          <ButtonSignwall
            site={arcSite}
            type="button"
            id={
              this.checkSession()
                ? 'web_link_ingresaperfil'
                : 'web_link_ingresacuenta'
            }
            onClick={() => this.setState({ isActive: true })}>
            <i className={!initialUser ? `${classes.iconLogin}` : ``}>
              {initialUser}
            </i>
            <span>{userName}</span>
          </ButtonSignwall>
        )}

        {isActive && <Signwall closeSignwall={() => this.closeSignwall()} />}

        {this.checkCookieHash()}

        {this.getUrlParam('signwallHard') &&
        !this.checkSession() &&
        showHard &&
        siteProperties.activeSignwall ? (
          <SignWallHard
            closePopup={() => this.closePopUp('signwallHard')}
            brandModal={arcSite}
          />
        ) : null}

        {this.getUrlParam('tokenVerify') &&
        showVerify &&
        siteProperties.activeSignwall ? (
          <SignWallVerify
            closePopup={() => this.closePopUp('tokenVerify')}
            brandModal={arcSite}
            tokenVerify={this.getUrlParam('tokenVerify')}
          />
        ) : null}

        {this.getUrlParam('tokenReset') &&
        showReset &&
        siteProperties.activeSignwall ? (
          <SignWallReset
            closePopup={() => this.closePopUp('tokenReset')}
            brandModal={arcSite}
            tokenReset={this.getUrlParam('tokenReset')}
          />
        ) : null}

        {this.getUrlParam('reloginEmail') &&
        !this.checkSession() &&
        showReEmail &&
        siteProperties.activeSignwall ? (
          <SignWallRelogin
            closePopup={() => this.closePopUp('reloginEmail')}
            brandModal={arcSite}
          />
        ) : null}

        {(this.getUrlParam('signwallPaywall') ||
          this.getUrlParam('signwallPremium')) &&
        showPaywall &&
        siteProperties.activePaywall ? (
          <SignWallPayPre
            closePopup={() => this.closePopUp('signwallPaywall')}
            brandModal={arcSite}
            typeModal={
              this.getUrlParam('signwallPaywall') ? 'paywall' : 'premium'
            }
          />
        ) : null}

        {this.getUrlParam('reloginHash') &&
        !this.checkSession() &&
        showRelogHash &&
        siteProperties.activePaywall ? (
          <SignwallReHash
            closePopup={() => this.closePopUp('reloginHash')}
            brandModal={arcSite}
          />
        ) : null}
      </>
    )
  }
}

export default SignwallComponent
