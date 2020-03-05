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
import { Landing } from '../../signwall/main/_main/landing/index'
import Taggeo from '../_dependencies/taggeo'
import * as S from './styled'
import { getAssetsPath } from '../../../utilities/constants'
import QueryString from '../../signwall/_dependencies/querystring'

const NAME_MAX_LENGHT = 10

const Head = props => {
  const msgs = useStrings()
  const {
    theme,
    arcSite,
    contextPath,
    siteProperties: {
      paywall: { urls, images },
    },
    customFields: { id, forceLogin: _forceLogin },
    dispatchEvent,
    addEventListener,
    removeEventListener,
  } = props

  const [profile, setProfile] = React.useState()
  const [showSignwall, setShowSignwall] = React.useState(false)
  const [stepForm, setStepForm] = React.useState(1)

  const typeSignWall = React.useRef('landing')
  const forceLogin = React.useRef()

  // eslint-disable-next-line react/sort-comp
  const signInReqHandler = React.useRef(type => {
    typeSignWall.current = type
    setShowSignwall(true)
  }).current

  const logoutHandler = React.useRef(() => {
    setProfile()
  }).current

  const profileUpdateHandler = React.useRef(profile => {
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
    forceLogin.current = _forceLogin
    if (isLogged()) {
      window.Identity.options({ apiOrigin: interpolateUrl(urls.originApi) })
      window.Identity.getUserProfile()
        .then(profile => {
          const conformedProfile = conformProfile(profile)
          setProfile(conformedProfile)
        })
        .catch(() => {})
    }

    if (QueryString.getQuery('signLanding')) {
      setShowSignwall(true)
    }

    return unregisterListeners
  }, [])

  const getFullName = () => {
    let fullName = msgs.startSession
    if (isLogged() && profile) {
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
  const students = typeSignWall.current === 'students'

  return (
    <S.Head id={id}>
      {(showSignwall || (!isLogged() && forceLogin.current)) && (
        <Landing
          typeDialog={typeSignWall.current} // tipo de modal (students , landing)
          nameDialog={typeSignWall.current} // nombre de modal
          onLogged={profile => {
            const conformedProfile = conformProfile(profile)
            dispatchEvent('logged', conformedProfile)
            setProfile(conformedProfile)
          }}
          onLoggedFail={() => dispatchEvent('loginFailed')}
          onClose={() => {
            dispatchEvent('loginCanceled')
            typeSignWall.current = 'landing'
            setShowSignwall(false)
            QueryString.deleteQuery('signLanding') // remover queryString signLanding
          }}
          noBtnClose={students ? false : !!_forceLogin}
        />
      )}
      <S.Background>
        <S.Left backgroundColor={leftColor} />
        <S.Right />
      </S.Background>
      <S.Content backgroundColor={leftColor}>
        <S.WrapLogo as="a" href="/" target="_blank">
          <img
            alt={`logo ${arcSite}`}
            src={`${getAssetsPath(arcSite, contextPath)}${interpolateUrl(
              images.mainLogo
            )}`}
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
                    `web_link_ingresar_${isLogged() ? 'perfil' : 'cuenta'}`
                  )
                  if (isLogged()) {
                    window.location.href = interpolateUrl(urls.profileSignwall)
                  } else {
                    if (profile) setProfile()
                    typeSignWall.current = 'landing'
                    setShowSignwall(true)
                  }
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
      defaultValue: false,
      description: 'Check para forzar a estar logeado.',
    }),
  }),
}

export default ThemedHead
