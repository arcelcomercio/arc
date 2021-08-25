import Identity from '@arc-publishing/sdk-identity'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import Consumer from 'fusion:consumer'
import * as React from 'react'

import { SdksProvider } from '../../../contexts/subscriptions-sdks'
import { getCookie, setCookie } from '../../../utilities/client/cookies'
import { getQuery } from '../../../utilities/parse/queries'
import {
  // getUsername,
  isLoggedIn,
} from '../../../utilities/subscriptions/identity'
import { Taggeo } from '../../subscriptions/_dependencies/Taggeo'
import {
  getOriginAPI,
  getUrlLandingAuth,
  getUrlProfile,
  getUrlSignwall,
} from '../_dependencies/domains'
import GetProfile from '../_dependencies/get-profile'
import { getEntitlement } from '../_dependencies/services'
import { Paywall } from './_children/paywall'
import { Premium } from './_children/premium'

const classes = {
  iconLogin: 'nav__icon icon-user  title-sm text-primary-color',
}

@Consumer
class SignwallComponent extends React.PureComponent {
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
    const { siteProperties } = this.props

    const fpPromise = FingerprintJS.load()
    fpPromise
      .then((fp) => fp.get())
      .then((result) => {
        setCookie('gecdigarc', result.visitorId, 365)
        console.log({ result })
      })
      .catch((error) => {
        console.error(
          'Ha ocurrido un error al crear la cookie - gecdigarc: ',
          error
        )
      })

    window.requestIdle(() => {
      this.checkUserName()
      if (siteProperties.activePaywall || siteProperties.activeRulesCounter) {
        this.getPaywall()
      }
    })
  }

  componentDidUpdate() {
    this.checkUserName()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  getPremium() {
    const isLogged = isLoggedIn()
    this._isMounted = true
    if (typeof window !== 'undefined' && this._isMounted) {
      if (!isLogged) {
        this.setState({ showPremium: true })
      } else {
        return this.getListSubs().then((p) => {
          if (p && p.length === 0) {
            this.setState({ showPremium: true })
          } else {
            const divPremium = document.getElementById('contenedor')
            if (divPremium) {
              divPremium.classList.remove('story-content__nota-premium')
              divPremium.removeAttribute('style')
            }
          }
          return false // tengo subs :D
        })
      }
    }
    return false
  }

  getPaywall() {
    const { countOnly, arcSite } = this.props
    const W = window || {}
    const isLogged = isLoggedIn()

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
      W.location.href = getUrlLandingAuth(arcSite)
    }

    if (typeContentTier === 'locked') {
      this.getPremium()
    } else if (W.ArcP) {
      W.ArcP.run({
        paywallFunction: (campaignURL) => {
          if (countOnly) return
          if (campaignURL.match(/signwallHard/) && !isLogged) {
            W.location.href = getUrlSignwall(arcSite, 'signwallHard', '1')
          } else if (campaignURL.match(/signwallPaywall/) && isLogged) {
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
            return this.getListSubs().then((p) => ({
              s: isLogged,
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
            l: isLogged,
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

  checkCookieHash = () => {
    const { siteProperties, arcSite } = this.props

    if (typeof window !== 'undefined') {
      window.document.cookie = `ArcId.USER_INFO=;path=/;domain=.${arcSite}.pe; expires=Thu, 01 Jan 1970 00:00:01 GMT`
      const dataContType = window.document.head.querySelector(
        'meta[name="content-type"]'
      )
      if (
        getCookie('arc_e_id') &&
        dataContType &&
        siteProperties.activePaywall
      ) {
        window.location.href = getUrlSignwall(arcSite, 'reloginHash', '1')
      }
    }
    return null
  }

  redirectURL = (typeDialog, hash) => {
    const { arcSite } = this.props
    window.location.href = getUrlSignwall(arcSite, typeDialog, hash)
  }

  getUrlParam = (name) => {
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
    const isLogged = isLoggedIn()

    if (isLogged && this._isMounted) {
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
    const isLogged = isLoggedIn()
    if (typeof window !== 'undefined') {
      if (isLogged) {
        Taggeo(`Web_Sign_Wall_General`, `web_swg_link_ingresacuenta`)
        window.location.href = getUrlProfile(arcSite)
      } else {
        Taggeo(`Web_Sign_Wall_General`, `web_swg_link_ingresaperfil`)
        window.location.href = getUrlSignwall(arcSite, 'signwallOrganic', '1')
      }
    }
  }

  render() {
    const { userName, initialUser, showPaywall, showPremium } = this.state
    const { countOnly, arcSite, siteProperties, classButton = '' } = this.props
    const isLogged = isLoggedIn()
    return (
      <>
        <button
          aria-label={userName}
          className={classButton}
          type="button"
          onClick={() => this.toogleButton()}>
          <i className={!initialUser ? `${classes.iconLogin}` : ``}>
            {initialUser}
          </i>
          <span className="capitalize" aria-hidden="true">
            {userName}
          </span>
        </button>

        {siteProperties.activeSignwall && (
          <>
            {this.getUrlParam('reloginEmail') && (
              <>
                {this.redirectURL(
                  'reloginEmail',
                  this.getUrlParam('reloginEmail')
                )}
              </>
            )}

            {!isLogged && <>{this.checkCookieHash()}</>}
          </>
        )}

        {!countOnly && siteProperties.activePaywall && (
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

const SignwallComponentContainer = ({ classButton, countOnly }) => (
  <SdksProvider>
    <SignwallComponent classButton={classButton} countOnly={countOnly} />
  </SdksProvider>
)

export default SignwallComponentContainer
