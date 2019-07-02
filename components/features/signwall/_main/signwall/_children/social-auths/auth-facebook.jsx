import React from 'react'
import { sha256 } from 'js-sha256'
import { Facebook } from '../../../common/iconos'
import GetProfile from '../../../utils/get-profile'
import Cookie from '../../../utils/cookie'

const Cookies = new Cookie()

class AuthFacebook extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sendingFb: true,
    }

    if (!window.onFacebookSignOn) {
      window.onFacebookSignOn = () => {
        window.Identity.facebookSignOn()
          .then(() => {
            window.Identity.getUserProfile()
              .then(res => {
                if (res.email != null) {
                  Cookies.setCookie('arc_e_id', sha256(res.email), 365)
                }
                window.sessUser.setState({ accessPanel: true })
                window.nameUser.setState({
                  nameUser: new GetProfile().username,
                })
                window.initialUser.setState({
                  initialUser: new GetProfile().initname,
                })
              })
              .catch(err => {
                console.log(err)
              })
          })
          .catch(e => {
            console.log('error', e)
          })
      }
    }
  }

  componentDidMount = () => {
    const waitForGlobal = (key, callback) => {
      if (window[key]) {
        callback()
      } else {
        setTimeout(() => {
          waitForGlobal(key, callback)
        }, 100)
      }
    }

    waitForGlobal('Identity', () => {
      // process.env FACEBOOK_APPID
      window.Identity.initFacebookLogin('287130908774061')
    })
  }

  handleFacebookLogin() {
    const { typePopUp, typeForm, closePopup } = this.props
    const tipCat = typePopUp || ''
    const tipAct = typePopUp ? `web_sw${typePopUp.slice(0, 1)}` : ''
    const tipForm = typeForm || ''
    console.log(tipCat, tipAct, tipForm)

    this.setState({
      sendingFb: false,
    })

    // SET WINDOWS CALLBACK
    window.FB.login(
      response => {
        if (response.authResponse) {
          window.onFacebookSignOn()
          closePopup()
          // -- test de tageo
          if (tipCat === 'organico' || tipCat === 'hard') {
            window.dataLayer = window.dataLayer || []
            window.dataLayer.push({
              event: `${tipForm}_fb_success`,
              eventCategory: `Web_Sign_Wall_${tipCat}`,
              eventAction: `${tipAct}_${tipForm}_success_facebook`,
            })
          }
          // -- test de tageo
        } else {
          this.setState({
            sendingFb: true,
          })

          // -- test de tageo
          if (tipCat === 'organico' || tipCat === 'hard') {
            window.dataLayer = window.dataLayer || []
            window.dataLayer.push({
              event: `${tipForm}_fb_error`,
              eventCategory: `Web_Sign_Wall_${tipCat}`,
              eventAction: `${tipAct}_${tipForm}_error_facebook`,
            })
          }
          // -- test de tageo
        }
      },
      {
        scope: 'email,public_profile',
        return_scopes: true,
      }
    )
  }

  render = () => {
    const { id, align } = this.props
    const { sendingFb } = this.state

    return (
      <>
        <button
          type="button"
          name="facebook"
          id={id}
          className={`btn btn-facebook ${align}`}
          onClick={() => this.handleFacebookLogin()}
          disabled={!sendingFb}>
          <Facebook />
          <span className="btn-text">
            {!sendingFb ? 'Ingresando...' : 'Facebook'}
          </span>
        </button>
      </>
    )
  }
}

export default AuthFacebook
