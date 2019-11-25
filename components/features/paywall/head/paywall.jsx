/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable no-extra-boolean-cast */
import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'
import Consumer from 'fusion:consumer'

import { addIdentity, userProfile, isLogged } from '../_dependencies/Identity'
import { useStrings } from '../_children/contexts'
import Icon from '../_children/icon'
import Signwall from '../../signwall/default'
import SignwallPaywall from '../../signwall/_main/signwall/login-paywall'
import Taggeo from '../_dependencies/taggeo'
import * as S from './styled'

const Head = props => {
  const msgs = useStrings()
  const {
    theme,
    arcSite,
    customFields: { id },
    dispatchEvent,
    addEventListener,
    removeEventListener,
  } = props

  const [profile, setProfile] = React.useState()
  const [isActive, setIsActive] = React.useState(false)
  const [showSignwall, setShowSignwall] = React.useState(false)
  const [stepForm, setStepForm] = React.useState(1)

  React.useEffect(() => {
    addIdentity(arcSite).then(() => {
      userProfile().then(profile => {
        setProfile(profile)
      })
    })

    addEventListener('currentStep', setStepForm)
    addEventListener('signInReq', signInReqHandler)
    return () => {
      removeEventListener('currentStep', setStepForm)
      removeEventListener('signInReq', signInReqHandler)
    }
  }, [])

  const getFullName = React.useRef(maxLenght => {
    if (profile) {
      const fullName = profile.firstName
        ? `${profile.firstName} ${profile.lastName}`
        : msgs.welcomeUser
      return fullName.length > maxLenght
        ? `${fullName.substring(0, maxLenght)}..`
        : fullName
    }
    return msgs.startSession
  }).current

  // eslint-disable-next-line react/sort-comp
  const signInReqHandler = React.useRef(() => {
    if (!isLogged()) {
      setShowSignwall(true)
    }
  }).current

  const fullName = getFullName(10)
  const leftColor =
    arcSite === 'elcomercio'
      ? theme.palette.terciary.main
      : theme.palette.primary.main
  const themedLogo =
    arcSite === 'elcomercio' ? theme.icon.logo_full : theme.icon.logo

  return (
    <S.Head id={id}>
      {showSignwall ? (
        <SignwallPaywall
          brandModal={arcSite}
          closePopup={() => {
            setShowSignwall(!showSignwall)
          }}
          onLogged={profile => {
            setProfile(profile)
            dispatchEvent('logged', profile)
          }}
          onLoginFail={() => {
            dispatchEvent('loginFailed')
          }}
        />
      ) : null}
      <S.Background>
        <S.Left backgroundColor={leftColor} />
        <S.Right />
      </S.Background>
      <S.Content backgroundColor={leftColor}>
        <S.WrapLogo as="a" href="/" target="_blank">
          <Icon
            type={themedLogo}
            fill={theme.palette.secondary.contrastText}
            width="30"
            height="30"
          />
        </S.WrapLogo>
        <S.WrapLogin>
          <S.Username>
            {stepForm !== 1 ? (
              <span>{fullName}</span>
            ) : (
              <S.LoginButton
                type="button"
                onClick={() => {
                  Taggeo(
                    `Web_Sign_Wall_Suscripciones`,
                    `web_link_ingresar_${profile ? msgs.profile : msgs.account}`
                  )
                  setIsActive(true)
                }}>
                <span>{fullName}</span>
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
        <Signwall
          singleSign
          closeSignwall={() => {
            setIsActive(false)
          }}
        />
      )}
    </S.Head>
  )
}

@Consumer
class HeadWrapper extends React.Component {
  render() {
    return (
      <Head
        {...this.props}
        dispatchEvent={this.dispatchEvent.bind(this)}
        addEventListener={this.addEventListener.bind(this)}
        removeEventListener={this.removeEventListener.bind(this)}
      />
    )
  }
}

const ThemedHead = withTheme(HeadWrapper)

ThemedHead.propTypes = {
  customFields: PropTypes.shape({
    id: PropTypes.string.isRequired.tag({
      name: 'ID',
      description: 'ID único del componente (Ej. head_[nombre])',
    }),
    forceLogin: PropTypes.bool.tag({
      name: 'Forzar login:',
      defaultValue: true,
      description: 'Check para forzar a estar logeado.',
    }),
  }),
}

export default ThemedHead
