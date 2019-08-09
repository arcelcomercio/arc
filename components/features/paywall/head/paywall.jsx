import React from 'react'
import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
import { AddIdentity, userProfile } from '../_dependencies/Identity'
import Icon from '../_children/icon'
import './paywall.css'
import SignwallPaywall from '../../signwall/_main/signwall/login-paywall'

@Consumer
class Head extends React.PureComponent {
  state = {
    firstName: 'cargando..',
    showSignwall: false,
  }

  componentDidMount() {
    AddIdentity().then(() => {
      userProfile().then(({ firstName }) => {
        this.setState({ firstName })
      })
    })
    this.getFirstName()
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

  closeShowSignwall = () => {
    const { showSignwall } = this.state
    this.setState({ showSignwall: !showSignwall })
    this.getFirstName()
  }

  render() {
    const { siteProperties, contextPath, deployment, arcSite } = this.props

    const { assets } = siteProperties
    const { firstName, showSignwall } = this.state

    return (
      <div className="head">
        {showSignwall && (
          <SignwallPaywall
            brandModal={arcSite}
            closePopup={() => this.closeShowSignwall()}
          />
        )}
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
              <span>Hola {firstName || 'Lector'}</span>
              <span className="login_icon">
                <Icon type="profile" fill="#FFF" width="30" height="30" />
              </span>
            </span>
          </div>
        </div>
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
