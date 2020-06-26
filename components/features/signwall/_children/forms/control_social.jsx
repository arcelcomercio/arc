import React, { useState } from 'react'
import { sha256 } from 'js-sha256'
import styled, { css } from 'styled-components'
import { device } from '../../_dependencies/breakpoints'
import { Facebook, Google, Mail } from '../iconos'
import { Button } from './styles'
import Services from '../../_dependencies/services'
import Domains from '../../_dependencies/domains'
import Cookies from '../../_dependencies/cookies'
import getDevice from '../../_dependencies/get-device'
import Taggeo from '../../_dependencies/taggeo'
import QueryString from '../../_dependencies/querystring'

const ButtonStyleSocial = styled(Button)`
  font-size: ${props => (props.size === 'full' ? '18' : '16')}px !important;
  position: relative;
  height: 45px !important;
  display: inline-block;
  vertical-align: top;
  padding: 0px 10px 0px 45px !important;
  width: calc(50% - 10px) !important;
  background: #4285f4;
  border: 1px solid #4285f4;
  text-transform: capitalize;
  font-weight: normal;
  margin-right: 0px;
  margin-left: 0px;

  ${props =>
    props.size === 'full' &&
    css`
      padding: 0px 45px 0px 45px !important;
      width: calc(100% - 0px) !important;
    `}
  
  ${props =>
    props.size === 'middle' &&
    props.brand === 'facebook' &&
    css`
      margin-right: 10px !important;
    `}

  ${props =>
    props.size === 'middle' &&
    props.brand === 'google' &&
    css`
      margin-left: 10px !important;
    `}

  ${props =>
    props.brand === 'facebook' &&
    css`
      background: #4267b2 !important;
      border: 1px solid #4267b2 !important;
    `}

  & svg {
    position: absolute;
    left: 1px;
    top: 1px;
    ${props =>
      props.brand === 'facebook' &&
      css`
        left: 10px !important;
        top: 8px !important;
      `}
  }

  @media ${device.tablet} {
    padding: 0px ${props => (props.size === 'full' ? '30px' : '10px')} 0px 45px;
  }
`

const ButtonStyleEmail = styled(Button)`
  background: #f2f2f2;
  color: #818181;
  font-weight: normal;
  border-bottom: 2px solid #d4d4d4 !important;
  margin-bottom: 40px;
  & svg {
    margin-right: 10px;
  }
`

const originAction = dialogModal => {
  switch (dialogModal) {
    case 'organico':
      return '0'
    case 'hard':
      return '1'
    case 'relogemail':
      return 'reloginemail'
    case 'reloghash':
      return 'reloginhash'
    default:
      return dialogModal
  }
}

const AfterLoginRegister = (
  emailUser,
  typeDialog,
  typeForm,
  provider,
  arcSite,
  onLogged,
  resProfile,
  checkUserSubs,
  onStudents,
  onClose
) => {
  Taggeo(
    `Web_Sign_Wall_${typeDialog}`,
    `web_sw${typeDialog[0]}_${typeForm}_success_${provider}`
  )
  Cookies.setCookie('arc_e_id', sha256(emailUser), 365)
  const USER_IDENTITY = JSON.stringify(window.Identity.userIdentity || {})
  Cookies.setCookieDomain('ArcId.USER_INFO', USER_IDENTITY, 1, arcSite)

  onLogged(resProfile)

  const btnSignwall = document.getElementById('signwall-nav-btn')

  switch (typeDialog) {
    case 'students':
      onStudents()
      break
    case 'premium':
    case 'paywall':
      checkUserSubs()
      break
    case 'newsletter':
      if (btnSignwall) {
        btnSignwall.textContent = `${resProfile.firstName ||
          'Bienvenido'}  ${resProfile.lastName || ''}`
      }
      onClose()
      break
    default:
      onClose()
  }
}

const setupUserProfile = (
  resAccessToken,
  provider,
  arcSite,
  onClose,
  activeNewsletter,
  typeDialog,
  typeForm,
  onLogged,
  checkUserSubs,
  onStudents
) => {
  window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })
  window.Identity.getUserProfile()
    .then(resProfile => {
      const EMAIL_USER =
        resProfile.email ||
        `${resProfile.identities[0].userName}@${provider}.com`

      if (!resProfile.displayName && !resProfile.attributes) {
        const newProfileFB = {
          firstName: resProfile.firstName.replace(/\./g, ''),
          lastName: resProfile.lastName.replace(/\./g, ''),
          displayName: EMAIL_USER,
          email: EMAIL_USER,
          attributes: [
            {
              name: 'originDomain',
              value: window.location.hostname || 'none',
              type: 'String',
            },
            {
              name: 'originReferer',
              value:
                window.location.href.split('&')[0].replace(/(\/#|#|\/)$/, '') ||
                'none',
              type: 'String',
            },
            {
              name: 'originMethod',
              value: provider === 'facebook' ? '2' : '5',
              type: 'String',
            },
            {
              name: 'originDevice',
              value: getDevice(window) || 'none',
              type: 'String',
            },
            {
              name: 'originAction',
              value: originAction(typeDialog) || 'none',
              type: 'String',
            },
            {
              name: 'termsCondPrivaPoli',
              value: '1',
              type: 'String',
            },
          ],
        }

        window.Identity.options({
          apiOrigin: Domains.getOriginAPI(arcSite),
        })

        window.Identity.updateUserProfile(newProfileFB)
          .then(() => {
            if (activeNewsletter && EMAIL_USER.indexOf('facebook.com') < 0) {
              Services.sendNewsLettersUser(
                resProfile.uuid,
                EMAIL_USER,
                arcSite,
                resAccessToken,
                ['general']
              )
                .then(() => {
                  AfterLoginRegister(
                    EMAIL_USER,
                    typeDialog,
                    typeForm,
                    provider,
                    arcSite,
                    onLogged,
                    resProfile,
                    checkUserSubs,
                    onStudents,
                    onClose
                  )
                })
                .catch(() => {
                  onClose()
                })
            } else {
              AfterLoginRegister(
                EMAIL_USER,
                typeDialog,
                typeForm,
                provider,
                arcSite,
                onLogged,
                resProfile,
                checkUserSubs,
                onStudents,
                onClose
              )
            }
          })
          .catch(() => {
            onClose()
          })
      } else {
        AfterLoginRegister(
          EMAIL_USER,
          typeDialog,
          typeForm,
          provider,
          arcSite,
          onLogged,
          resProfile,
          checkUserSubs,
          onStudents,
          onClose
        )
      }
    })
    .catch(() => {
      onClose()
    })
}

const authSocialProviderURL = (
  { data, origin },
  arcSite,
  onClose,
  activeNewsletter,
  typeDialog,
  typeForm,
  onLogged,
  checkUserSubs,
  onStudents
) => {
  if (origin !== Domains.getUrlECOID() || window.Identity.userIdentity.uuid) {
    return
  }

  Services.loginFBeco(
    Domains.getOriginAPI(arcSite),
    '',
    data.accessToken,
    data.providerSource
  )
    .then(resLogSocial => {
      if (resLogSocial.accessToken) {
        window.localStorage.setItem(
          'ArcId.USER_INFO',
          JSON.stringify(resLogSocial)
        )
        window.Identity.userIdentity = resLogSocial
        setupUserProfile(
          resLogSocial.accessToken,
          data.providerSource,
          arcSite,
          onClose,
          activeNewsletter,
          typeDialog,
          typeForm,
          onLogged,
          checkUserSubs,
          onStudents
        )
      } else {
        onClose()
      }
    })
    .catch(() => {
      window.console.error('oups ocurrio un error')
    })
}

export const ButtonSocial = ({
  typeDialog,
  brand,
  size,
  onLogged = i => i,
  onClose,
  onStudents,
  arcSite,
  c,
  typeForm,
  activeNewsletter,
  checkUserSubs,
}) => {
  const [showTextLoad, setShowTextLoad] = useState('')

  const queryDialog = () => {
    switch (typeDialog) {
      case 'organico':
        return 'signOrganic'
      case 'hard':
        return 'signHard'
      case 'relogemail':
        return 'signEmail'
      case 'reloghash':
        return 'signHash'
      case 'paywall':
        return 'signPaywall'
      case 'premium':
        return 'signPremium'
      case 'landing':
        return 'signLanding'
      case 'authfia':
        return 'signFia'
      case 'newsletter':
        return 'signNewsletters'
      case 'students':
        return 'signStudents'
      default:
        return typeDialog
    }
  }

  const taggeoError = resProvider => {
    Taggeo(
      `Web_Sign_Wall_${typeDialog}`,
      `web_sw${typeDialog[0]}_${typeForm}_error_${resProvider}`
    )
  }

  const authSocialProvider = ({ data, origin }) => {
    if (origin !== Domains.getUrlECOID() || window.Identity.userIdentity.uuid) {
      return
    }

    setShowTextLoad('Conectando...')

    Services.loginFBeco(
      Domains.getOriginAPI(arcSite),
      '',
      data.accessToken,
      data.providerSource
    )
      .then(resLogSocial => {
        if (resLogSocial.accessToken) {
          window.localStorage.setItem(
            'ArcId.USER_INFO',
            JSON.stringify(resLogSocial)
          )
          window.Identity.userIdentity = resLogSocial

          setShowTextLoad('Cargando...')
          setupUserProfile(
            resLogSocial.accessToken,
            data.providerSource,
            arcSite,
            onClose,
            activeNewsletter,
            typeDialog,
            typeForm,
            onLogged,
            checkUserSubs,
            onStudents
          )
        } else {
          taggeoError(data.providerSource)
          onClose()
          window.removeEventListener('message', authSocialProvider)
          window.removeEventListener('onmessage', authSocialProvider)
        }
      })
      .catch(() => {
        window.console.error('oups ocurrio un error')
      })
  }

  const clickLoginSocialEcoID = brandCurrent => {
    const eventMethod = window.addEventListener
      ? 'addEventListener'
      : 'attachEvent'
    const eventer = window[eventMethod]
    const messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message'
    eventer(messageEvent, authSocialProvider)

    const isFbBrowser =
      window.navigator.userAgent.indexOf('FBAN') > -1 ||
      window.navigator.userAgent.indexOf('FBAV') > -1

    const width = 780
    const height = 640
    const left = window.screen.width / 2 - 800 / 2
    const top = window.screen.height / 2 - 600 / 2
    const URL = `${Domains.getUrlECOID()}/mpp/${brandCurrent}/login/`

    const URLRedirect = () => {
      window.location.href = `${URL}?urlReference=${encodeURIComponent(
        window.location.href
      )}&typeModal=${queryDialog()}`

      setShowTextLoad('Conectando...')
    }

    const URLWindow = () => {
      window.open(
        URL,
        '',
        `toolbar=no, location=no, directories=no, status=no, menubar=no, 
    scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
    height=${height}, top=${top}, left=${left}`
      )
    }

    if (brandCurrent === 'google') return URLWindow()

    // return getDevice(window) !== 'desktop' ? URLRedirect() : URLWindow()
    return isFbBrowser ? URLRedirect() : URLWindow()
  }

  return (
    <ButtonStyleSocial
      type="button"
      id={`btn-sign-${brand}`}
      brand={brand}
      size={size}
      className={c}
      disabled={showTextLoad}
      onClick={() => {
        Taggeo(
          `Web_Sign_Wall_${typeDialog}`,
          `web_sw${typeDialog[0]}_${typeForm}_boton_${brand}`
        )
        clickLoginSocialEcoID(brand)
      }}>
      {brand === 'facebook' ? <Facebook /> : <Google />}
      {showTextLoad || brand}
    </ButtonStyleSocial>
  )
}

export const ButtonEmail = ({ size, onClick }) => {
  return (
    <ButtonStyleEmail type="button" size={size} onClick={onClick}>
      <Mail />
      Ingresa con tu usuario
    </ButtonStyleEmail>
  )
}

export const AuthURL = ({
  arcSite,
  onClose,
  activeNewsletter,
  typeDialog,
  typeForm,
  onLogged = i => i,
  checkUserSubs,
  onStudents,
}) => {
  const authUrlRedirect = () => {
    const listUrlRedirect = [
      'signOrganic',
      'signHard',
      'signEmail',
      'signHash',
      'signPaywall',
      'signPremium',
      'signLanding',
      'signFia',
      'signNewsletters',
      'signStudents',
    ]

    listUrlRedirect.map(item => {
      if (QueryString.getQuery(item)) {
        setTimeout(() => {
          const btnFacebook = document.getElementById('btn-sign-facebook')
          if (btnFacebook) {
            btnFacebook.disabled = true
          }
        }, 800)

        authSocialProviderURL(
          {
            data: {
              accessToken: QueryString.getQuery(item).replace(/(#_=_)$/, ''),
              providerSource: 'facebook',
            },
            origin: Domains.getUrlECOID(),
          },
          arcSite,
          onClose,
          activeNewsletter,
          typeDialog,
          typeForm,
          onLogged,
          checkUserSubs,
          onStudents
        )
      }
      return null
    })
  }

  return <>{authUrlRedirect()}</>
}
