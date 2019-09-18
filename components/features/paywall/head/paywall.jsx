/* eslint-disable no-extra-boolean-cast */
import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'
import Consumer from 'fusion:consumer'

import { AddIdentity, userProfile } from '../_dependencies/Identity'
import Icon from '../_children/icon'
import Signwall from '../../signwall/default'
import SignwallPaywall from '../../signwall/_main/signwall/login-paywall'
import GetProfile from '../../signwall/_main/utils/get-profile'
import * as S from './styled'

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
    const { theme, arcSite, customFields } = this.props
    const { showSignwall, userName, isActive, stepForm } = this.state
    const { forceLogin: checkForceLogin } = customFields
    const leftColor =
      arcSite === 'elcomercio'
        ? theme.palette.secondary.main
        : theme.palette.primary.main

    return (
      <S.Head>
        {showSignwall && checkForceLogin ? (
          <SignwallPaywall
            brandModal={arcSite}
            closePopup={() => this.closeShowSignwall()}
            reloadLogin
          />
        ) : null}
        <S.Background>
          <S.Left backgroundColor={leftColor} />
          <S.Right />
        </S.Background>
        <S.Content backgroundColor={leftColor}>
          <S.Img src={theme.images.logo} alt="Logo el comercio" />
          <S.WrapLogin>
            <S.Username>
              {stepForm !== 1 ? (
                <span>
                  {this.checkSession() ? `${userName}` : 'Hola Invitado'}
                </span>
              ) : (
                <S.LoginButton
                  type="button"
                  onClick={() => this.setState({ isActive: true })}>
                  <span>
                    {this.checkSession() ? `${userName}` : 'Iniciar Sesión'}
                  </span>
                </S.LoginButton>
              )}
              <S.WrapIcon>
                <Icon
                  type="profile"
                  fill={theme.palette.secondary.contrastText}
                  width="30"
                  height="30"
                />
              </S.WrapIcon>
            </S.Username>
          </S.WrapLogin>
        </S.Content>
        {isActive && (
          <Signwall singleSign closeSignwall={() => this.closeSignwall()} />
        )}
      </S.Head>
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

export default withTheme(Head)
