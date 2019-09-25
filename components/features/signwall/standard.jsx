import Consumer from 'fusion:consumer'
import ENV from 'fusion:environment'
import React, { PureComponent } from 'react'

// import Button from '../../global-components/button'

import Signwall from './default'
import SignWallHard from './_main/signwall/hard'
import SignWallVerify from './_main/signwall/verify'
import SignWallReset from './_main/signwall/reset'
import SignWallRelogin from './_main/signwall/relogin'
import SignWallPayPre from './_main/signwall/paywall-premium'
import Services from './_main/utils/services'
import GetProfile from './_main/utils/get-profile'

const services = new Services()

const classes = {
  btnLogin: 'nav__btn flex items-center btn capitalize text-sm font-bold', // Tiene lógica abajo
  iconSignwallMobile: 'uppercase ',
  iconLogin: 'nav__icon icon-user',
  btnSignwallMobile:
    'nav__btn--login-m bg-secondary text-primary-color rounded',
}

@Consumer
class SignwallComponent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isActive: false,
      showHard: false,
      showVerify: false,
      showReset: false,
      showRelogin: false,
      showPaywall: false,
      userName: new GetProfile().username,
      initialUser: new GetProfile().initname,
      // countAnonymous: 0,
      // countRegister: 0,
    }
  }

  componentDidMount() {
    const { arcSite } = this.props

    // ---------- Start Premium & Paywall ----------- //

    if (arcSite === 'gestion') {
      this.getPaywall()
    }

    // ---------- End Premium & Paywall ------------ //
  }

  componentDidUpdate() {
    if (this.checkSession()) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        userName: new GetProfile().username,
        initialUser: new GetProfile().initname,
      })
    } else {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        userName: 'Iniciar Sesión',
        initialUser: false,
      })
    }
  }

  getPremium() {
    const W = window
    if (!this.checkSession()) {
      W.location.href = '/?signwallPremium=1'
    } else {
      return this.getListSubs().then(p => {
        if (p && p.length === 0) {
          W.location.href = '/?signwallPremium=1'
        }
        return false // tengo subs :D
      })
    }
    return false
  }

  getPaywall() {
    const { arcSite } = this.props
    const W = window

    const dataContTyp = W.document.querySelector('meta[name="content-type"]')
    const dataContSec = W.document.querySelector('meta[name="section-id"]')
    const dataContentPremium = W.content_paywall || false

    const URL_ORIGIN =
      ENV.ENVIRONMENT === 'elcomercio'
        ? `https://api.${arcSite}.pe`
        : `https://api-sandbox.${arcSite}.pe`

    // this.checkIsEco().then(res => {
    //   window.console.log(res)
    // })

    // if (dataContentPremium && ENV.ENVIRONMENT !== 'elcomercio') {

    // if (dataContentPremium && W.document.cookie.indexOf('isECO=true') >= 0) {
    if (dataContentPremium) {
      this.getPremium() // Only sandbox ;)
    } else if (window.ArcP) {
      W.ArcP.run({
        paywallFunction: campaignURL => {
          // if (ENV.ENVIRONMENT === 'elcomercio') {
          //   if (
          //     campaignURL.indexOf('signwallPaywall') >= 0 &&
          //     W.location.pathname.indexOf('podcast') >= 0
          //   ) {
          //     window.console.log('signwallPaywall')
          //     this.checkIsEco().then(res => {
          //       if (res === true) W.location.href = campaignURL
          //     })
          //   } else if (campaignURL.indexOf('signwallHard') >= 0) {
          //     window.console.log('signwallHard')
          //     W.location.href = campaignURL
          //   }
          // } else {
          //  window.console.log('signwallHard & signwallPaywall')
          W.location.href = campaignURL
          // }
        },
        contentType: dataContTyp ? dataContTyp.getAttribute('content') : 'none',
        section: dataContSec ? dataContSec.getAttribute('content') : 'none',
        userName: W.Identity.userIdentity.uuid || null,
        jwt: W.Identity.userIdentity.accessToken || null,
        apiOrigin: URL_ORIGIN,
        customSubCheck: () => {
          // estado de suscripcion
          return this.getListSubs().then(p => {
            const isLoggedInSubs = !!(
              W.localStorage.getItem('ArcId.USER_PROFILE') !== 'null' &&
              W.localStorage.getItem('ArcId.USER_PROFILE')
            )
            return {
              s: isLoggedInSubs,
              p: p || null,
              timeTaken: 100,
              updated: Date.now(),
            }
          })
        },
        customRegCheck: () => {
          // estado de registro
          const start = Date.now()
          const isLoggedIn = !!(
            W.localStorage.getItem('ArcId.USER_PROFILE') !== 'null' &&
            W.localStorage.getItem('ArcId.USER_PROFILE')
          )
          return Promise.resolve({
            l: isLoggedIn,
            timeTaken: Date.now() - start,
            updated: Date.now(),
          })
        },
      }).then(() => {
        this.initCounters()
      })
      // .then(() => {
      // W.console.log('Results from running paywall script: ', results)
      // })
      // .catch(() => W.console.error())
    }
  }

  getListSubs() {
    const { arcSite } = this.props
    const W = window
    return services
      .getEntitlement(W.Identity.userIdentity.accessToken, arcSite)
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
  }

  // Saber si hay sesion inicada
  checkSession = () => {
    const profileStorage = window.localStorage.getItem('ArcId.USER_PROFILE')
    const sesionStorage = window.localStorage.getItem('ArcId.USER_INFO')
    if (profileStorage) {
      return !(profileStorage === 'null' || sesionStorage === '{}') || false
    }
    return false
  }

  // initCounters = () => {
  //   const userId = JSON.parse(window.localStorage.getItem('ArcId.USER_INFO'))
  //   const UUID = userId ? userId.uuid : window.Identity.userIdentity.uuid
  //   const localCounter = JSON.parse(window.localStorage.getItem('ArcP'))

  //   if (localCounter) {
  //     if (localCounter.anonymous) {
  //       const cAnon = localCounter.anonymous.v.ci.length || 0
  //       this.setState({
  //         countAnonymous: cAnon,
  //       })
  //     }

  //     if (UUID && localCounter[UUID]) {
  //       const cReg = localCounter[UUID].v.ci.length || 0
  //       this.setState({
  //         countRegister: cReg,
  //       })
  //     }
  //   }
  // }

  // check Url string popup
  getUrlParam = name => {
    const vars = {}
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
      vars[key] = value
    })
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
            this.setState({ showRelogin: true })
            break
          case 'signwallPaywall':
          case 'signwallPremium':
            this.setState({ showPaywall: true })
            break
          default:
          // return false
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
        this.setState({ showRelogin: false })
        break
      case 'signwallPaywall':
        this.setState({ showPaywall: false })
        break
      default:
        return null
    }
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
      showRelogin,
      showPaywall,
      // countAnonymous,
      // countRegister,
    } = this.state
    const { arcSite, siteProperties, typeMobile } = this.props

    return (
      <>
        <button
          type="button"
          id={
            this.checkSession()
              ? 'web_link_ingresaperfil'
              : 'web_link_ingresacuenta'
          }
          className={
            typeMobile
              ? `${classes.btnSignwallMobile} ${
                  arcSite === 'peru21' ? 'bg-white' : null
                }`
              : `${classes.btnLogin} btn--outline`
          }
          //   className={`${classes.btnSignwallMobile} ${
          //             arcSite === 'peru21' ? 'bg-white' : null
          //           }`}

          onClick={() => this.setState({ isActive: true })}>
          {typeMobile ? (
            <i
              className={
                initialUser
                  ? `${classes.iconSignwallMobile} font-bold`
                  : `${classes.iconLogin} ${
                      classes.iconSignwallMobile
                    }  title-sm`
              }>
              {initialUser}
            </i>
          ) : (
            <span>{this.checkSession() ? userName : 'Iniciar Sesión'}</span>
          )}
        </button>

        {isActive && <Signwall closeSignwall={() => this.closeSignwall()} />}

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
        showRelogin &&
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
      </>
    )
  }
}

export default SignwallComponent
