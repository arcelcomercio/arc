import React, { Component } from 'react'
import ENV from 'fusion:environment'
import Consumer from 'fusion:consumer'
import Fingerprint2 from 'fingerprintjs2'
import LoginRegister from './_main/signwall/index'
import LoginPaywall from './_main/signwall/login-paywall'
import Panel from './_main/panel'
import Cookie from './_main/utils/cookie'
import Domains from './_main/utils/domains'

const Cookies = new Cookie()

@Consumer
class Signwall extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showLogin: false,
      showPanel: false,
      sessUser: false,
    }

    const { arcSite } = this.props
    this.origin_api = Domains.getOriginAPI(arcSite)

    Fingerprint2.getV18({}, result => {
      Cookies.setCookie('gecdigarc', result, 365)
    })
  }

  componentWillMount() {
    window.Identity.apiOrigin = this.origin_api
  }

  componentDidUpdate = () => {
    const { sessUser } = this.state
    if (this.checkSession() && !sessUser) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        sessUser: true,
      })
      this.togglePopupPanel()
    } else if (this.checkSession() === false && sessUser) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        sessUser: false,
      })
      this.togglePopupLogin()
    }
  }

  componentDidMount = () => {
    const { sessUser } = this.state
    if (this.checkSession() && !sessUser) {
      this.setState({
        sessUser: true,
      })
      this.togglePopupPanel()
    } else {
      this.togglePopupLogin()
    }
    if (ENV.ENVIRONMENT !== 'elcomercio') {
      // add cookie isECO only SANDBOX
      Cookies.setCookie('isECO', true, 1)
    }
  }

  checkSession = () => {
    const profileStorage = window.localStorage.getItem('ArcId.USER_PROFILE')
    const sesionStorage = window.localStorage.getItem('ArcId.USER_INFO')
    if (profileStorage) {
      return !(profileStorage === 'null' || sesionStorage === '{}') || false
    }
    return false
  }

  togglePopupLogin() {
    const { showLogin } = this.state
    const { closeSignwall } = this.props
    this.setState({
      showLogin: !showLogin,
    })
    if (showLogin) closeSignwall()
  }

  togglePopupPanel() {
    const { showPanel } = this.state
    const { closeSignwall } = this.props
    this.setState({
      showPanel: !showPanel,
    })
    if (showPanel) closeSignwall()
  }

  render() {
    const { showLogin, showPanel } = this.state
    const { arcSite, singleSign } = this.props
    return (
      <div className="signwall">
        <div className="link-identity__content">
          {showLogin && !singleSign && (
            <LoginRegister
              closePopup={() => this.togglePopupLogin()}
              brandModal={arcSite}
            />
          )}

          {showLogin && singleSign && (
            <LoginPaywall
              closePopup={() => this.togglePopupLogin()}
              brandModal={arcSite}
            />
          )}

          {showPanel && <Panel closePopup={() => this.togglePopupPanel()} />}
        </div>
      </div>
    )
  }
}

export default Signwall
