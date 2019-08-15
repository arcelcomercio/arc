import React from 'react'
import ENV from 'fusion:environment'
import Consumer from 'fusion:consumer'
import { sha256 } from 'js-sha256'
import { Facebook } from '../../../common/iconos'
import Cookie from '../../../utils/cookie'
import getDevice from '../../../utils/get-device'
import Services from '../../../utils/services'

const Cookies = new Cookie()
const services = new Services()

const ORIGIN_ECOID =
  ENV.ENVIRONMENT === 'elcomercio' ? 'https://ecoid.pe' : 'https://pre.ecoid.pe'

@Consumer
class AuthFacebook extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loadedFB: true,
      sendingFbText: 'Facebook',
    }
    const { arcSite } = this.props
    this.origin_api =
      ENV.ENVIRONMENT === 'elcomercio'
        ? `https://api.${arcSite}.pe`
        : `https://api-sandbox.${arcSite}.pe`

    const { typePopUp = '', typeForm = '' } = this.props
    this.tipCat = typePopUp
    this.tipAct = typePopUp ? `web_sw${typePopUp.slice(0, 1)}` : ''
    this.tipForm = typeForm

    window.removeEventListener('message', this.OAuthFacebook)
    window.removeEventListener('onmessage', this.OAuthFacebook)
  }

  componentDidMount = () => {
    window.Identity.apiOrigin = this.origin_api

    const eventMethod = window.addEventListener
      ? 'addEventListener'
      : 'attachEvent'
    const eventer = window[eventMethod]
    const messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message'
    eventer(messageEvent, this.OAuthFacebook)
  }

  componentWillUnmount = () => {
    window.removeEventListener('message', this.OAuthFacebook)
    window.removeEventListener('onmessage', this.OAuthFacebook)
  }

  clickLoginFacebookEcoID = () => {
    const width = 780
    const height = 640
    const left = window.screen.width / 2 - 800 / 2
    const top = window.screen.height / 2 - 600 / 2
    const url = `${ORIGIN_ECOID}/mpp/facebook/login/`
    return window.open(
      url,
      '',
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    )
  }

  OAuthFacebook = data => {
    if (data.origin !== ORIGIN_ECOID) {
      return
    }

    if (window.Identity.userIdentity.uuid) {
      return
    }

    this.setState({
      loadedFB: false,
      sendingFbText: 'Cargando...',
    })

    services
      .loginFBeco(this.origin_api, '', data.data.accessToken, 'facebook')
      .then(resLoginFb => {
        if (resLoginFb.accessToken) {
          this.setState({
            sendingFbText: 'Ingresando...',
          })

          window.localStorage.setItem(
            'ArcId.USER_INFO',
            JSON.stringify(resLoginFb)
          )

          window.Identity.userIdentity = resLoginFb

          window.Identity.apiOrigin = this.origin_api
          window.Identity.getUserProfile()
            .then(resFbProfile => {
              this.setState({
                sendingFbText: 'Cargando perfil...',
              })

              const EmailUserProfile = resFbProfile.email
                ? resFbProfile.email
                : `${resFbProfile.identities[0].userName}@facebook.com`

              if (!resFbProfile.displayName && !resFbProfile.attributes) {
                const originAction = tipcat => {
                  const isHard = document.querySelector(
                    '#arc-popup-signwallhard'
                  )
                  if (isHard) {
                    return '1'
                  }
                  if (tipcat === 'relogemail') {
                    return 'reloginemail'
                  }
                  return '0'
                }

                const newProfileFB = {
                  firstName: resFbProfile.firstName.replace(/\./g, ''),
                  lastName: resFbProfile.lastName.replace(/\./g, ''),
                  displayName: EmailUserProfile,
                  email: EmailUserProfile,
                  attributes: [
                    {
                      name: 'originDomain',
                      value: window.location.hostname || 'none',
                      type: 'String',
                    },
                    {
                      name: 'originReferer',
                      value: window.location.href || 'none',
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
                      value: originAction(this.tipCat) || 'none',
                      type: 'String',
                    },
                    {
                      name: 'termsCondPrivaPoli', // Terms Conditions and Privacy Policy
                      value: '1',
                      type: 'String',
                    },
                  ],
                }

                window.Identity.apiOrigin = this.origin_api
                window.Identity.updateUserProfile(newProfileFB) // update profile add attibutes

                if (EmailUserProfile) {
                  Cookies.setCookie('arc_e_id', sha256(EmailUserProfile), 365)
                }

                this.taggeoSuccess() // -- test de tageo success REGISTRO
                this.enterProfilePanel()
              } else {
                if (EmailUserProfile) {
                  Cookies.setCookie('arc_e_id', sha256(EmailUserProfile), 365)
                }

                this.taggeoSuccess() // -- test de tageo  success LOGIN
                this.enterProfilePanel()
              }
            })
            .catch(errFbProfile => {
              window.console.error(errFbProfile)
              this.taggeoError() // -- test de tageo error
            })
        } else {
          const { closePopup } = this.props
          window.console.error(resLoginFb)
          this.taggeoError() // -- test de tageo error
          closePopup()
        }
      })
      .catch(errLoginFb => {
        window.console.error(errLoginFb)
        this.taggeoError() // -- test de tageo error
      })
  }

  taggeoSuccess = () => {
    switch (this.tipCat) {
      case 'organico':
      case 'hard':
        window.dataLayer.push({
          event: `${this.tipForm}_fb_success`,
          eventCategory: `Web_Sign_Wall_${this.tipCat}`,
          eventAction: `${this.tipAct}_${this.tipForm}_success_facebook`,
        })
        break
      case 'relogin':
        window.dataLayer.push({
          event: 'relogin_fb_success',
        })
        break
      case 'relogemail':
        if (this.tipForm === 'login') {
          window.dataLayer.push({
            event: 'relogin_email_fb_success',
          })
        } else if (this.tipForm === 'register') {
          window.dataLayer.push({
            event: 'relogin_email_registro_fb_success',
          })
        }
        break
      default:
        return null
    }
  }

  taggeoError = () => {
    switch (this.tipCat) {
      case 'organico':
      case 'hard':
        window.dataLayer.push({
          event: `${this.tipForm}_fb_error`,
          eventCategory: `Web_Sign_Wall_${this.tipCat}`,
          eventAction: `${this.tipAct}_${this.tipForm}_error_facebook`,
        })
        break
      case 'relogin':
        window.dataLayer.push({
          event: 'relogin_fb_error',
        })
        break
      case 'relogemail':
        if (this.tipForm === 'login') {
          window.dataLayer.push({
            event: 'relogin_email_fb_error',
          })
        } else if (this.tipForm === 'register') {
          window.dataLayer.push({
            event: 'relogin_email_registro_fb_error',
          })
        }
        break
      default:
        return null
    }
  }

  render = () => {
    const { id, align } = this.props
    const { sendingFb, loadedFB, sendingFbText } = this.state

    return (
      <>
        <button
          type="button"
          name="facebook"
          id={id}
          className={`btn btn-facebook ${align}`}
          onClick={this.clickLoginFacebookEcoID}
          disabled={sendingFb || !loadedFB}>
          <Facebook />
          <span>{sendingFbText}</span>
        </button>
      </>
    )
  }

  enterProfilePanel = () => {
    const { closePopup } = this.props
    Cookies.deleteCookie('mpp_sess') // borra session MPP
    closePopup()
  }
}

export default AuthFacebook
