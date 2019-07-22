import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import Fingerprint2 from 'fingerprintjs2'

import LoginRegister from './_main/signwall/index'

import Panel from './_main/user-dashboard/index'
import addScriptAsync from './_main/utils/script-async'
import Cookie from './_main/utils/cookie'

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

    Fingerprint2.getV18({}, result => {
      Cookies.setCookie('gecdigarc', result, 365)
    })
  }

  componentWillMount() {
    const {
      siteProperties: { signwall: { ORIGIN_API, ORIGIN_PAYWALL } = {} } = {},
    } = this.props

    window.Identity.apiOrigin = ORIGIN_API

    addScriptAsync({
      name: 'Paywall',
      url: `${ORIGIN_PAYWALL}?v=${new Date().toISOString().slice(0, 10)}`,
    })
      .then(() => {
        window.ArcP.run({
          paywallFunction: campaignURL => console.log('Paywall!', campaignURL),
          // customPageData: () => ({
          //   c: 'story',
          //   s: 'business',
          //   ci: 'https://www.your.domain.com/canonical/url'
          // })
        })
          .then(results =>
            console.log('Results from running paywall script: ', results)
          )
          .catch(() => console.error())
      })
      .catch(errPaywall => {
        console.error('Error', errPaywall)
      })
  }

  componentDidUpdate = () => {
    const { sessUser } = this.state
    if (this.checkSession() && !sessUser) {
      this.setState({
        sessUser: true,
      })
      this.togglePopupPanel()
    } else if (this.checkSession() === false && sessUser) {
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
    const { arcSite } = this.props
    return (
      <div className="signwall">
        <div className="link-identity__content">
          {showLogin && (
            <LoginRegister
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
