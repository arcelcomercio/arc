import React from 'react'
import styled from 'styled-components'
import { device } from '../../../_styles/breakpoints'
import { Facebook, Google, Mail } from '../../common/iconos'
import { Button } from './styles'
import Services from '../../utils/new_services'
import Domains from '../../utils/domains'

export const ButtonStyleSocial = styled(Button)`
  font-size: 16px;
  position: relative;
  & svg {
    position: absolute;
    left: ${props => (props.brand === 'facebook' ? '10px' : '0px')} !important;
    top: ${props => (props.brand === 'facebook' ? '10px' : '0px')} !important;
  }
  height: 48px !important;
  display: inline-block;
  vertical-align: top;
  padding: ${props =>
    props.size === 'full'
      ? '0px 45px 0px 45px'
      : '0px 10px 0px 45px'} !important;
  background: ${props =>
    props.brand === 'facebook' ? '#4267b2' : '#4285f4'} !important;
  border: 1px solid
    ${props => (props.brand === 'facebook' ? '#4267b2' : '#4285f4')} !important;
  margin-right: ${props =>
    props.size === 'middle' && props.brand === 'facebook'
      ? '10px'
      : '0px'} !important;
  margin-left: ${props =>
    props.size === 'middle' && props.brand === 'google'
      ? '10px'
      : '0px'} !important;
  width: calc(
    ${props => (props.size === 'full' ? '100% - 0px' : '50% - 10px')}
  ) !important;
  text-transform: capitalize;
  font-size: 18px !important;
  font-weight: normal;
  @media ${device.tablet} {
    padding: 0px ${props => (props.size === 'full' ? '30px' : '10px')} 0px 45px;
  }
`

export const ButtonStyleEmail = styled(Button)`
  background: #f2f2f2;
  color: #818181;
  font-weight: normal;
  border-bottom: 2px solid #d4d4d4;
  margin-bottom: 40px;
  & svg {
    margin-right: 10px;
  }
`

export const ButtonSocial = ({
  typeDialog,
  brand,
  size,
  onLogged,
  onClose,
  onStudents,
  arcSite,
}) => {
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

  const OAuthFacebook = ({ data }) => {
    if (
      data.origin !== Domains.getUrlECOID() &&
      window.Identity.userIdentity.uuid
    ) {
      return
    }

    Services.loginFBeco(
      Domains.getOriginAPI(arcSite),
      '',
      data.accessToken,
      'facebook'
    ).then(resLogSocial => {
      window.localStorage.setItem(
        'ArcId.USER_INFO',
        JSON.stringify(resLogSocial)
      )
      window.Identity.userIdentity = resLogSocial
      window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })
      window.Identity.getUserProfile().then(resProfile => {
        onLogged(resProfile)
        if (typeDialog === 'students') {
          onStudents()
        } else {
          onClose()
        }
      })
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
      const url = `${Domains.getUrlECOID()}/mpp/facebook/login/`
      return window.open(
        url,
        '',
        `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
      )
    }
    return null
  }

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <ButtonStyleSocial
      type="button"
      brand={brand}
      size={size}
      onClick={() => clickLoginFacebookEcoID(brand)}>
      {brand === 'facebook' ? <Facebook /> : <Google />}
      {brand}
    </ButtonStyleSocial>
  )
}

export const ButtonEmail = props => {
  const { size, onClick } = props
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <ButtonStyleEmail type="button" size={size} onClick={onClick}>
      <Mail />
      Ingresa con tu usuario
    </ButtonStyleEmail>
  )
}
