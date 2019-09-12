import React from 'react'
import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
import { AddIdentity, userProfile } from '../_dependencies/Identity'
import Icon from '../_children/icon'
import './paywall.css'
import Signwall from '../../signwall/default'
import SignwallPaywall from '../../signwall/_main/signwall/login-paywall'
import GetProfile from '../../signwall/_main/utils/get-profile'

@Consumer
class Head extends React.PureComponent {
  state = {
    firstName: 'Invitado',
    isActive: false,
    showSignwall: false,
    userName: new GetProfile().username,
    stepForm: 1,
  }

  componentDidMount() {
    this.addEventListener('currentStep', this.currentStepHandler)
    this.getFirstName()
  }

  componentDidUpdate() {
    if (this.checkSession()) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        userName: new GetProfile().username,
      })
    }
  }

  componentWillUnmount() {
    this.removeEventListener(this.currentStepHandler)
  }

  currentStepHandler = currentStep => {
    this.setState({ stepForm: currentStep })
  }

  getFirstName = () => {
    window.dataLayer = window.dataLayer || [] // temporalmente hasta agregar GTM
    AddIdentity().then(() => {
      userProfile()
        .then(({ firstName }) => {
          this.setState({ firstName })
        })
        .catch(() => {
          this.setState({ showSignwall: true })
        })
    })
  }

  checkSession = () => {
    const profileStorage = window.localStorage.getItem('ArcId.USER_PROFILE')
    const sesionStorage = window.localStorage.getItem('ArcId.USER_INFO')
    if (profileStorage) {
      return !(profileStorage === 'null' || sesionStorage === '{}') || false
    }
    return false
  }

  closeShowSignwall = () => {
    const { showSignwall } = this.state
    this.setState({ showSignwall: !showSignwall })
    this.getFirstName()
  }

  userName = name => {
    return name.length > 6 ? `${name.substring(0, 6)}..` : name
  }

  closeSignwall() {
    this.setState({ isActive: false })
  }

  render() {
    const {
      siteProperties,
      contextPath,
      deployment,
      arcSite,
      customFields,
    } = this.props
    const { assets } = siteProperties
    const { firstName, showSignwall, userName, isActive, stepForm } = this.state
    const checkForceLogin = customFields.forceLogin

    return (
      <div className="head">
        {showSignwall && checkForceLogin ? (
          <SignwallPaywall
            brandModal={arcSite}
            closePopup={() => this.closeShowSignwall()}
            reloadLogin
          />
        ) : null}
        <div className="head__background">
          <div className="background_left" />
          <div className="background_right" />
        </div>
        <div className="head__content">
          <img
            className="content__img"
            src={deployment(`${contextPath}${assets.pwAssets()}`)}
            alt="Logo el comercio"
          />
          <div className="head__login">
            <span className="login__username">
              {stepForm !== 1 ? (
                <span>
                  {this.checkSession() ? `${userName}` : 'Hola Invitado'}
                </span>
              ) : (
                <button
                  type="button"
                  className="head__btn-login"
                  onClick={() => this.setState({ isActive: true })}>
                  <span>
                    {this.checkSession() ? `${userName}` : 'Iniciar Sesión'}
                  </span>
                </button>
              )}

              {/* <span>
                {this.checkSession() ? `Hola ${userName}` : 'Iniciar Sesión'}
              </span> */}
              {/* <span>Hola {firstName || 'Lector'}</span> */}
              <span className="login_icon">
                <Icon type="profile" fill="#FFF" width="30" height="30" />
              </span>
            </span>
          </div>
        </div>
        {isActive && (
          <Signwall singleSign closeSignwall={() => this.closeSignwall()} />
        )}
      </div>
    )
  }
}

Head.propTypes = {
  customFields: PropTypes.shape({
    forceLogin: PropTypes.bool.tag({
      name: 'Forzar login:',
      defaultValue: true,
      description: 'Check para forzar a estar logeado.',
    }),
  }),
}

export default Head
