import React from 'react'
import Consumer from 'fusion:consumer'
import { sha256 } from 'js-sha256'
import { Facebook } from '../../../common/iconos'
import Cookies from '../../../utils/cookies'
import getDevice from '../../../utils/get-device'
import Services from '../../../utils/services'
import Taggeo from '../../../utils/taggeo'
import Domains from '../../../utils/domains'

@Consumer
class AuthFacebook extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loadedFB: true,
      sendingFbText: 'Facebook',
    }

    const { arcSite } = this.props
    this.origin_api = Domains.getOriginAPI(arcSite)

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
    const url = `${Domains.getUrlECOID()}/mpp/facebook/login/`
    return window.open(
      url,
      '',
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    )
  }

  OAuthFacebook = data => {
    const { arcSite } = this.props

    if (
      data.origin !== Domains.getUrlECOID() ||
      window.Identity.userIdentity.uuid
    ) {
      return
    }

    this.setState({
      loadedFB: false,
      sendingFbText: 'Cargando...',
    })

    Services.loginFBeco(this.origin_api, '', data.data.accessToken, 'facebook')
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
                  if (tipmodal === 'reloghash') {
                    return 'reloginhash'
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

                // NEWSLETTER POR DEFAULT
                if (
                  arcSite === 'gestion' &&
                  EMAIL_USER.indexOf('facebook.com') < 0
                ) {
                  Services.sendNewsLettersUser(
                    resPro.uuid,
                    EMAIL_USER,
                    arcSite,
                    resLoginFb.accessToken,
                    ['general']
                  )
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

    Taggeo(
      `Web_Sign_Wall_${typePopUp}`,
      `web_sw${typePopUp[0]}_${typeForm}_success_facebook`
    )
  }

  taggeoError = () => {
    const { typePopUp, typeForm } = this.props

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
    const { checkPremium, typePopUp, closePopup, arcSite } = this.props
    Cookies.deleteCookie('mpp_sess') // borra session MPP
    this.taggeoSuccess() // -- test de tageo sucess

    // set token cookie
    const USER_IDENTITY = JSON.stringify(window.Identity.userIdentity || {})
    Cookies.setCookieDomain('ArcId.USER_INFO', USER_IDENTITY, 1, arcSite)

    if (window.location.pathname.indexOf('suscripciones') >= 0) {
      window.location.reload()
    } else if (typePopUp === 'premium') {
      checkPremium()
    } else {
      closePopup()
    }
  }
}

export default AuthFacebook
