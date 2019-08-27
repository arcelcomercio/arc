import React from 'react'
import ENV from 'fusion:environment'
import Consumer from 'fusion:consumer'
import { sha256 } from 'js-sha256'
import { Facebook } from '../../../common/iconos'
import Cookie from '../../../utils/cookie'
import getDevice from '../../../utils/get-device'
import Services from '../../../utils/services'
import Taggeo from '../../../utils/taggeo'

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
            .then(resPro => {
              this.setState({
                sendingFbText: 'Cargando perfil...',
              })

              const { typePopUp } = this.props

              const EMAIL_USER =
                resPro.email || `${resPro.identities[0].userName}@facebook.com`

              if (!resPro.displayName && !resPro.attributes) {
                const originAction = tipmodal => {
                  const isHard = document.querySelector(
                    '#arc-popup-signwallhard'
                  )
                  if (isHard) {
                    return '1'
                  }
                  if (tipmodal === 'relogemail') {
                    return 'reloginemail'
                  }
                  return '0'
                }

                const newProfileFB = {
                  firstName: resPro.firstName.replace(/\./g, ''),
                  lastName: resPro.lastName.replace(/\./g, ''),
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
                      value: originAction(typePopUp) || 'none',
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

                if (EMAIL_USER) {
                  Cookies.setCookie('arc_e_id', sha256(EMAIL_USER), 365)
                }

                this.enterProfilePanel()
              } else {
                if (EMAIL_USER) {
                  Cookies.setCookie('arc_e_id', sha256(EMAIL_USER), 365)
                }

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
          if (window.location.pathname.indexOf('suscripciones') >= 0) {
            window.location.reload()
          } else {
            closePopup()
          }
        }
      })
      .catch(errLoginFb => {
        window.console.error(errLoginFb)
        this.taggeoError() // -- test de tageo error
      })
  }

  taggeoSuccess = () => {
    const { typePopUp, typeForm } = this.props

    // switch (typePopUp) {
    //   case 'organico':
    //   case 'hard':
    //     window.dataLayer.push({
    //       event: `${typeForm}_fb_success`,
    //       eventCategory: `Web_Sign_Wall_${typePopUp}`,
    //       eventAction: `web_sw${typePopUp[0]}_${typeForm}_success_facebook`,
    //     })
    //     break
    //   case 'relogin':
    //     window.dataLayer.push({
    //       event: 'relogin_fb_success',
    //     })
    //     break
    //   case 'relogemail':
    //     if (typeForm === 'login') {
    //       window.dataLayer.push({
    //         event: 'relogin_email_fb_success',
    //       })
    //     } else if (typeForm === 'register') {
    //       window.dataLayer.push({
    //         event: 'relogin_email_registro_fb_success',
    //       })
    //     }
    //     break
    //   default:
    // }

    Taggeo(
      `Web_Sign_Wall_${typePopUp}`,
      `web_sw${typePopUp[0]}_${typeForm}_success_facebook`
    )
  }

  taggeoError = () => {
    const { typePopUp, typeForm } = this.props

    // switch (typePopUp) {
    //   case 'organico':
    //   case 'hard':
    //     window.dataLayer.push({
    //       event: `${typeForm}_fb_error`,
    //       eventCategory: `Web_Sign_Wall_${typePopUp}`,
    //       eventAction: `web_sw${typePopUp[0]}_${typeForm}_error_facebook`,
    //     })
    //     break
    //   case 'relogin':
    //     window.dataLayer.push({
    //       event: 'relogin_fb_error',
    //     })
    //     break
    //   case 'relogemail':
    //     if (typeForm === 'login') {
    //       window.dataLayer.push({
    //         event: 'relogin_email_fb_error',
    //       })
    //     } else if (typeForm === 'register') {
    //       window.dataLayer.push({
    //         event: 'relogin_email_registro_fb_error',
    //       })
    //     }
    //     break
    //   default:
    // }

    Taggeo(
      `Web_Sign_Wall_${typePopUp}`,
      `web_sw${typePopUp[0]}_${typeForm}_error_facebook`
    )
  }

  render = () => {
    const { id, align, typePopUp, typeForm } = this.props
    const { sendingFb, loadedFB, sendingFbText } = this.state

    return (
      <>
        <button
          type="button"
          name="facebook"
          id={id}
          className={`btn btn-facebook ${align}`}
          onClick={() => {
            Taggeo(
              `Web_Sign_Wall_${typePopUp}`,
              `web_sw${typePopUp[0]}_${typeForm}_boton_facebook`
            )
            this.clickLoginFacebookEcoID()
          }}
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
    this.taggeoSuccess() // -- test de tageo sucess
    if (window.location.pathname.indexOf('suscripciones') >= 0) {
      window.location.reload()
    } else {
      closePopup()
    }
  }
}

export default AuthFacebook
