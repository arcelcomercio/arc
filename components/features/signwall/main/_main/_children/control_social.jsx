import React, { useState, useEffect } from 'react'
import { sha256 } from 'js-sha256'
import styled, { css } from 'styled-components'
import { device } from '../../../_dependencies/breakpoints'
import { Facebook, Google, Mail } from '../../../_children/iconos'
import { Button } from './styles'
import Services from '../../../_dependencies/services'
import Domains from '../../../_dependencies/domains'
import Cookies from '../../../_dependencies/cookies'
import getDevice from '../../../_dependencies/get-device'
import Taggeo from '../../../_dependencies/taggeo'

export const ButtonStyleSocial = styled(Button)`
  font-size: ${props => (props.size === 'full' ? '18' : '16')}px !important;
  position: relative;
  height: 48px !important;
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
        top: 10px !important;
      `}
  }

  @media ${device.tablet} {
    padding: 0px ${props => (props.size === 'full' ? '30px' : '10px')} 0px 45px;
  }
`

export const ButtonStyleEmail = styled(Button)`
  background: #f2f2f2;
  color: #818181;
  font-weight: normal;
  border-bottom: 2px solid #d4d4d4 !important;
  margin-bottom: 40px;
  & svg {
    margin-right: 10px;
  }
`

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

  useEffect(() => {
    const vars = {}
    if (typeof window !== 'undefined')
      window.location.href.replace(
        /[?&]+([^=&]+)=([^&]*)/gi,
        (m, key, value) => {
          vars[key] = value
        }
      )

    const URL_QUERY =
      vars.signOrganic ||
      vars.signHard ||
      vars.signEmail ||
      vars.signHash ||
      vars.signPaywall ||
      vars.signPremium

    if (URL_QUERY) {
      OAuthFacebook({
        data: { accessToken: URL_QUERY.replace(/(#_=_)$/, '') },
        origin: Domains.getUrlECOID(),
      })
    }
  }, [])

  const InitGoogle = () => {
    window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })

    const GOOGLEID =
      '519633312892-3kpve55sqi0k1nq2n4f9suag9sji41jh.apps.googleusercontent.com'

    const GoogleSignInRenderOptions = {
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
    }

    window.Identity.initGoogleLogin(
      GOOGLEID,
      { GoogleSignInRenderOptions },
      'google-sign-in-button',
      true
    ).then(() => {
      window.Identity.googleSignOn()
    })
  }

  const originAction = () => {
    switch (typeDialog) {
      case 'organico':
        return '0'
      case 'hard':
        return '1'
      case 'relogemail':
        return 'reloginemail'
      case 'reloghash':
        return 'reloginhash'
      default:
        return typeDialog
    }
  }

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
      default:
        return typeDialog
    }
  }

  const taggeoError = () => {
    Taggeo(
      `Web_Sign_Wall_${typeDialog}`,
      `web_sw${typeDialog[0]}_${typeForm}_error_facebook`
    )
  }

  const enterProfilePanel = email => {
    setShowTextLoad('Cargando...')
    Taggeo(
      `Web_Sign_Wall_${typeDialog}`,
      `web_sw${typeDialog[0]}_${typeForm}_success_facebook`
    )

    Cookies.setCookie('arc_e_id', sha256(email), 365)

    const USER_IDENTITY = JSON.stringify(window.Identity.userIdentity || {})
    Cookies.setCookieDomain('ArcId.USER_INFO', USER_IDENTITY, 1, arcSite)
  }

  const OAuthFacebook = ({ data, origin }) => {
    if (origin !== Domains.getUrlECOID() || window.Identity.userIdentity.uuid) {
      return
    }

    Services.loginFBeco(
      Domains.getOriginAPI(arcSite),
      '',
      data.accessToken,
      'facebook'
    )
      .then(resLogSocial => {
        setShowTextLoad('Conectando...')
        if (resLogSocial.accessToken) {
          window.localStorage.setItem(
            'ArcId.USER_INFO',
            JSON.stringify(resLogSocial)
          )
          window.Identity.userIdentity = resLogSocial
          window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })
          window.Identity.getUserProfile()
            .then(resProfile => {
              const EMAIL_USER =
                resProfile.email ||
                `${resProfile.identities[0].userName}@facebook.com`

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
                        window.location.href
                          .split('&')[0]
                          .replace(/(\/#|#|\/)$/, '') || 'none',
                      type: 'String',
                    },
                    {
                      name: 'originMethod',
                      value: '2',
                      type: 'String',
                    },
                    {
                      name: 'originDevice',
                      value: getDevice(window) || 'none',
                      type: 'String',
                    },
                    {
                      name: 'originAction',
                      value: originAction() || 'none',
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
                window.Identity.updateUserProfile(newProfileFB).then(() => {
                  if (
                    activeNewsletter &&
                    EMAIL_USER.indexOf('facebook.com') < 0
                  ) {
                    Services.sendNewsLettersUser(
                      resProfile.uuid,
                      EMAIL_USER,
                      arcSite,
                      resLogSocial.accessToken,
                      ['general']
                    )
                  }
                })

                enterProfilePanel(EMAIL_USER)
              } else {
                enterProfilePanel(EMAIL_USER)
              }

              onLogged(resProfile)
              if (typeDialog === 'students') {
                onStudents()
              } else {
                if (typeDialog.match(/premium|paywall/)) {
                  checkUserSubs()
                } else {
                  onClose()
                }
                window.removeEventListener('message', OAuthFacebook)
                window.removeEventListener('onmessage', OAuthFacebook)
              }
            })
            .catch(() => {
              taggeoError()
              onClose()
            })
        } else {
          taggeoError()
          onClose()
          window.removeEventListener('message', OAuthFacebook)
          window.removeEventListener('onmessage', OAuthFacebook)
        }
      })
      .catch(() => {
        window.console.error('oups ocurrio un error')
      })
  }

  const clickLoginFacebookEcoID = brandCurrent => {
    if (brandCurrent === 'google') {
      InitGoogle()
    } else {
      const eventMethod = window.addEventListener
        ? 'addEventListener'
        : 'attachEvent'
      const eventer = window[eventMethod]
      const messageEvent =
        eventMethod === 'attachEvent' ? 'onmessage' : 'message'
      eventer(messageEvent, OAuthFacebook)

      const width = 780
      const height = 640
      const left = window.screen.width / 2 - 800 / 2
      const top = window.screen.height / 2 - 600 / 2
      const param =
        getDevice(window) !== 'desktop'
          ? `?urlReference=${window.location.href}&typeModal=${queryDialog()}`
          : ''
      const url = `${Domains.getUrlECOID()}/mpp/facebook/login/${param}`
      return window.open(
        window.encodeURI(url),
        '',
        `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
      )
    }
    return null
  }

  return (
    <ButtonStyleSocial
      type="button"
      brand={brand}
      size={size}
      className={c}
      disabled={showTextLoad}
      onClick={() => {
        Taggeo(
          `Web_Sign_Wall_${typeDialog}`,
          `web_sw${typeDialog[0]}_${typeForm}_boton_facebook`
        )
        clickLoginFacebookEcoID(brand)
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
