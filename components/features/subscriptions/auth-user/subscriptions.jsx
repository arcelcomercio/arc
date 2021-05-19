import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'

import Domains from '../../signwall/_dependencies/domains'
import { deleteCookie, getCookie, setCookie } from '../_dependencies/Cookies'
import { Generic } from './_children/generic'

@Consumer
class MainPage extends PureComponent {
  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {
      showOrganic: false,
      showHard: false,
      showVerify: false,
      showReset: false,
      showReEmail: false,
      showRelogHash: false,
    }
  }

  componentDidMount() {
    const { arcSite } = this.props
    if (typeof window !== 'undefined' && window.Identity) {
      window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })
      if (window.Sales !== undefined) {
        window.Sales.options({ apiOrigin: Domains.getOriginAPI(arcSite) })
      }
      if (
        window.document.referrer &&
        !window.document.referrer.match(/facebook.com/)
      ) {
        deleteCookie('signreferer')
        setCookie('signreferer', window.document.referrer, 365)
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false
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
          case 'signwallOrganic':
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

  closePopUp = () => {
    if (typeof window !== 'undefined') {
      if (
        getCookie('signreferer') &&
        getCookie('signreferer') !== '' &&
        !getCookie('signreferer').match(/\/signwall\//)
      ) {
        const URL_CLEAR = getCookie('signreferer').split('?')
        deleteCookie('signreferer')
        window.location.href = `${URL_CLEAR[0]}?ref=signwall`
      } else {
        deleteCookie('signreferer')
        window.location.href = '/?ref=signwall'
      }
    }
  }

  render() {
    const {
      showOrganic,
      showHard,
      showVerify,
      showReset,
      showReEmail,
      showRelogHash,
    } = this.state
    const { arcSite, siteProperties } = this.props
    return (
      <>
        {siteProperties.activeSignwall && (
          <>
            {(this.getUrlParam('signOrganic') ||
              this.getUrlParam('signwallOrganic')) &&
              showOrganic && (
                <>
                  {!this.checkSession() ? (
                    <Generic
                      onClose={() => this.closePopUp('showOrganic')}
                      arcSite={arcSite}
                      typeDialog="organico"
                    />
                  ) : (
                    <>{this.closePopUp()}</>
                  )}
                </>
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

            {(this.getUrlParam('signHard') ||
              this.getUrlParam('signwallHard')) &&
              showHard && (
                <>
                  {!this.checkSession() ? (
                    <Generic
                      onClose={() => this.closePopUp('showHard')}
                      arcSite={arcSite}
                      typeDialog="hard"
                    />
                  ) : (
                    <>{this.closePopUp()}</>
                  )}
                </>
              )}

            {(this.getUrlParam('signEmail') ||
              this.getUrlParam('reloginEmail')) &&
              showReEmail && (
                <>
                  {!this.checkSession() ? (
                    <Generic
                      onClose={() => this.closePopUp('showReEmail')}
                      arcSite={arcSite}
                      typeDialog="relogemail"
                    />
                  ) : (
                    <>{this.closePopUp()}</>
                  )}
                </>
              )}

            {(this.getUrlParam('signHash') ||
              this.getUrlParam('reloginHash')) &&
              showRelogHash && (
                <>
                  {!this.checkSession() ? (
                    <Generic
                      onClose={() => this.closePopUp('showRelogHash')}
                      arcSite={arcSite}
                      typeDialog="reloghash"
                    />
                  ) : (
                    <>{this.closePopUp()}</>
                  )}
                </>
              )}
          </>
        )}
      </>
    )
  }
}

MainPage.label = 'Signwall - Página Inicial'

export default MainPage
