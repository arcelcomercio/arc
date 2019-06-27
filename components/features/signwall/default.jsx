import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import Fingerprint2 from 'fingerprintjs2'

import LoginRegister from './_main/signwall/index'
import Panel from './_main/user-dashboard/index'
import addScriptAsync from './_main/utils/script-async'
import GetProfile from './_main/utils/get-profile'
import { User } from './_main/common/iconos'
import Cookie from './_main/utils/cookie'

const Brand = 'gestion'

const Cookies = new Cookie()

@Consumer
class Signwall extends Component {
  constructor() {
    super()
    this.state = {
      showLogin: false,
      showPanel: false,
      nameUser: new GetProfile().username,
      initialUser: new GetProfile().initname,
      sessUser: false,
      accessPanel: false,
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
        nameUser: new GetProfile().username,
        initialUser: new GetProfile().initname,
      })
    } else if (this.checkSesion() === false && sessUser)
      this.setState({
        sessUser: false,
      })
  }

  componentDidMount = () => {
    const { sessUser } = this.state
    if (this.checkSesion() === true && !sessUser) {
      this.setState({
        sessUser: true,
        nameUser: new GetProfile().username,
        initialUser: new GetProfile().initname,
      })
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
    this.setState({
      showLogin: !showLogin,
    })
  }

  togglePopupPanel() {
    const { showPanel } = this.state
    this.setState({
      showPanel: !showPanel,
    })

    // const hasOverlay = document.documentElement.classList.contains('overlay')
    // const removeOverlay = document.documentElement.classList.remove('overlay')
    // const addOverlay = document.documentElement.classList.add('overlay')

    // // eslint-disable-next-line no-unused-expressions
    // hasOverlay ? removeOverlay : addOverlay
  }

  render() {
    const {
      sessUser,
      accessPanel,
      initialUser,
      nameUser,
      showLogin,
      showPanel,
    } = this.state
    return (
      <div className="signwall">
        <div className="link-identity__content">
          {sessUser || accessPanel ? (
            <button
              type="button"
              onClick={() => this.togglePopupPanel()}
              id="web_link_ingresaperfil"
              className="link-identity__link">
              <i
                className={
                  initialUser
                    ? `link-identity__icon link-identity__icon--text  bg-icon icon-color`
                    : `link-identity__icon bg-icon`
                }>
                {initialUser || (
                  <User
                    color={Brand === 'elcomercio' ? '#fcc913' : '#ffffff'}
                  />
                )}
              </i>
              <span className="link-identity__text">{nameUser}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => this.togglePopupLogin()}
              id="web_link_ingresacuenta"
              className="link-identity__link">
              <i className="link-identity__icon bg-icon">
                <User color={Brand === 'elcomercio' ? '#fcc913' : '#ffffff'} />
              </i>
              <span className="link-identity__text">Ingresa a tu Cuenta</span>
            </button>
          )}

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
