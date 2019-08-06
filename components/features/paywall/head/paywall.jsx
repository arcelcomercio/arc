import React from 'react'
import Consumer from 'fusion:consumer'
import ENV from 'fusion:environment'
import { AddIdentity, userProfile } from '../_dependencies/Identity'
import Icon from '../_children/icon'
import './paywall.css'
import SignwallPaywall from '../../signwall/_main/signwall/paywall'

@Consumer
class Head extends React.PureComponent {
  state = {
    firstName: 'cargando..',
    showSignwall: false,
  }

  componentDidMount() {
    const { siteProperties } = this.props
    AddIdentity(siteProperties).then(() => {
      userProfile()
        .then(({ firstName }) => {
          this.setState({ firstName })
        })
        .catch(() => {
          this.setState({ showSignwall: true })
        })
    })
  }

  render() {
    const { siteProperties, contextPath, deployment, arcSite } = this.props

    const { assets } = siteProperties
    const { firstName, showSignwall } = this.state

    return (
      <div className="head">
        {showSignwall && <SignwallPaywall brandModal={arcSite}/>}
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

export default Head
