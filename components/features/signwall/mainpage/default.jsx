import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import { Generic } from './_main/generic'
import Domains from '../_dependencies/domains'

@Consumer
class SignwallComponentInt extends PureComponent {
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
    }
  }

  componentWillUnmount() {
    this._isMounted = false
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

  closePopUp = name => {
    if (typeof window !== 'undefined') {
      // if (window.document.referrer) {
      //   const rg = new RegExp(`[(&|?)]+${name}=`)
      //   const queryMatch = window.document.referrer.match(rg)
      //   const newUrl = window.document.referrer.split(queryMatch)
      //   window.location.href = newUrl[0] || '/?ref=signwall'
      // } else {
      window.location.href = '/?ref=signwall'
      // }
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
      </>
    )
  }
}

export default SignwallComponentInt
