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
      siteProperties: {
        signwall: { ORIGIN_IDENTITY_SDK, ORIGIN_API, ORIGIN_SALES_SDK } = {},
      } = {},
    } = this.props

    const today = new Date()
    const dd = String(today.getDate())
    const mm = String(today.getMonth() + 1)
    const yyyy = today.getFullYear()
    const queryStringDate = dd + mm + yyyy

    addScriptAsync({
      name: 'sdkIndetityARC',
      url: `${ORIGIN_IDENTITY_SDK}?v=${queryStringDate}`,
    })
      .then(() => {
        window.Identity.apiOrigin = ORIGIN_API
      })
      .catch(errIdentity => {
        console.log('Error', errIdentity)
      })

    addScriptAsync({
      name: 'sdkSalesARC',
      url: `${ORIGIN_SALES_SDK}?v=${queryStringDate}`,
    })
      .then(() => {
        window.Sales.apiOrigin = ORIGIN_API
      })
      .catch(errSales => {
        console.log('Error', errSales)
      })

    // --Script Waldo--//
    /* addScriptAsync({
      name: 'sdkTalk',
      type: 'module',
      url: `https://s3-sa-east-1.amazonaws.com/pic.resize2/module.talk.min.js?v=${queryStringDate}`,
    })
      .then(() => {
        window.TalkInit({
          talk: 'http://52.71.25.247/',
          arc_token: window.Identity.userIdentity.accessToken,
          target: document.getElementById('coral_talk_stream'),
          debug: false,
          openSignIn: () => {
            window.openLoginOrganic()
          },
        })
      })
      .catch(errTalk => {
        console.log('Error', errTalk)
      }) */
    // --Script Waldo--//
  }

  componentDidUpdate = () => {
    const { sessUser } = this.state
    if (this.checkSesion() && !sessUser) {
      this.setState({
        sessUser: true,
      })
      this.togglePopupPanel()
    } else if (this.checkSesion() === false && sessUser) {
      this.setState({
        sessUser: false,
      })
      this.togglePopupLogin()
    }
  }

  componentDidMount = () => {
    const { sessUser } = this.state
    if (this.checkSesion() && !sessUser) {
      this.setState({
        sessUser: true,
      })
      this.togglePopupPanel()
    } else {
      this.togglePopupLogin()
    }
  }

  checkSesion = () => {
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
    return (
      <div className="signwall">
        <div className="link-identity__content">
          {showLogin && (
            <LoginRegister closePopup={() => this.togglePopupLogin()} />
          )}

          {showPanel && <Panel closePopup={() => this.togglePopupPanel()} />}
        </div>
      </div>
    )
  }
}

export default Signwall
