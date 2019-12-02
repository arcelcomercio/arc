/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable no-extra-boolean-cast */
import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'
import Consumer from 'fusion:consumer'

import { conformProfile, isLogged } from '../_dependencies/Identity'
import { interpolateUrl } from '../_dependencies/domains'
import { useStrings } from '../_children/contexts'
import Icon from '../_children/icon'
import Signwall from '../../signwall/default'
import { Landing } from '../../signwall/_main/acceso/landing/index'
import Taggeo from '../_dependencies/taggeo'
import * as S from './styled'

const NAME_MAX_LENGHT = 10

const Head = props => {
  const msgs = useStrings()
  const {
    theme,
    arcSite,
    siteProperties: {
      paywall: { urls },
    },
    customFields: { id, forceLogin },
    dispatchEvent,
    addEventListener,
    removeEventListener,
  } = props

  const [profile, setProfile] = React.useState()
  const [isActive, setIsActive] = React.useState(false)
  const [showSignwall, setShowSignwall] = React.useState(false)
  const [stepForm, setStepForm] = React.useState(1)
  const [typeSignWall, setTypeSignWall] = React.useState('landing')

  // eslint-disable-next-line react/sort-comp
  const signInReqHandler = React.useRef(typeSignWall => {
    if (!isLogged() || typeSignWall === 'students') {
      setShowSignwall(true)
      setTypeSignWall(typeSignWall)
    }
  }).current

  const logoutHandler = React.useRef(() => {
    setProfile()
  }).current

  const profileUpdateHandler = React.useRef(profile => {
    // sessionStorage.removeItem(PROFILE_FORM_NAME)
    const conformedProfile = conformProfile(profile)
    dispatchEvent('logged', conformedProfile)
    setProfile(conformedProfile)
  }).current

  React.useEffect(() => {
    addEventListener('currentStep', setStepForm)
    addEventListener('logout', logoutHandler)
    addEventListener('signInReq', signInReqHandler)
    addEventListener('profileUpdate', profileUpdateHandler)
    const unregisterListeners = () => {
      removeEventListener('currentStep', setStepForm)
      removeEventListener('logout', logoutHandler)
      removeEventListener('signInReq', signInReqHandler)
      removeEventListener('profileUpdate', profileUpdateHandler)
    }
    if (isLogged()) {
      window.Identity.options({ apiOrigin: interpolateUrl(urls.originApi) })
      window.Identity.getUserProfile()
        .then(profile => {
          const conformedProfile = conformProfile(profile)
          setProfile(conformedProfile)
        })
        .catch(() => {})
    }
    return unregisterListeners
  }, [])

  const getFullName = () => {
    let fullName = msgs.startSession
    if (profile) {
      fullName = profile.firstName
        ? `${profile.firstName} ${profile.lastName || ''}`.trim()
        : msgs.welcomeUser
      fullName =
        fullName.length > NAME_MAX_LENGHT
          ? `${fullName.substring(0, NAME_MAX_LENGHT)}..`
          : fullName
    }
    return fullName
  }

  const leftColor =
    arcSite === 'elcomercio'
      ? theme.palette.terciary.main
      : theme.palette.primary.main
  const themedLogo =
    arcSite === 'elcomercio' ? theme.icon.logo_full : theme.icon.logo

  return (
    <S.Head id={id}>
      {(showSignwall || (!profile && forceLogin)) && (
        <Landing
          typeDialog={typeSignWall} // tipo de modal (students , landing)
          nameDialog={typeSignWall} // nombre de modal
          onLogged={profile => {
            const conformedProfile = conformProfile(profile)
            dispatchEvent('logged', conformedProfile)
            setProfile(conformedProfile)
          }}
          onLoggedFail={() => dispatchEvent('loginFailed')}
          onClose={() => {
            setShowSignwall(!showSignwall)
            setTypeSignWall('landing')
          }}
          noBtnClose={!!forceLogin}
        />
      )}
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
              <span>{getFullName()}</span>
            ) : (
              <S.LoginButton
                type="button"
                onClick={() => {
                  Taggeo(
                    `Web_Sign_Wall_Suscripciones`,
                    `web_link_ingresar_${profile ? 'perfil' : 'cuenta'}`
                  )
                  profile ? setIsActive(true) : setShowSignwall(true)
                }}>
                <span>{getFullName()}</span>
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
