/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react'
import ENV from 'fusion:environment'
import Consumer from 'fusion:consumer'
import { sha256 } from 'js-sha256'
import FormValid from '../../utils/form-valid'
import * as Icon from '../../common/iconos'
import ListBenefits from './benefits'
import AuthFacebook from './social-auths/auth-facebook'
import Cookie from '../../utils/cookie'
import { emailRegex } from '../../utils/regex'
import Services from '../../utils/services'
import Taggeo from '../../utils/taggeo'
import { ModalConsumer } from '../context'

const Cookies = new Cookie()
const services = new Services()

@Consumer
class FormLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hiddenEnterUser: false,
      hiddenListBenefits: true,
      hiddenbutton: true,
      showSocialButtons: false,
      hiddenPass: true,
      email: null,
      password: null,
      formErrors: {
        email: '',
        password: '',
      },
      messageError: false,
      sending: true,
    }

    const { arcSite } = this.props
    if (arcSite !== 'peru21') {
      this.origin_api =
        ENV.ENVIRONMENT === 'elcomercio'
          ? `https://api.${arcSite}.pe`
          : `https://api-sandbox.${arcSite}.pe`
    } else {
      this.origin_api =
        ENV.ENVIRONMENT === 'elcomercio'
          ? `https://api.${arcSite}.pe`
          : `https://api-elcomercio-peru21-sandbox.cdn.arcpublishing.com`
    }
  }

  componentWillMount() {
    window.Identity.apiOrigin = this.origin_api
  }

  handleFormSubmit = e => {
    e.preventDefault()
    const { email, password } = this.state

    if (FormValid(this.state)) {
      this.setState({ sending: false })

      window.Identity.apiOrigin = this.origin_api
      window.Identity.login(email, password, {
        rememberMe: true,
        cookie: true,
      })
        .then(() => {
          this.setState({ sending: true })
          this.handleGetProfile()
          Cookies.deleteCookie('mpp_sess')

          this.taggeoSuccess() // -- test de tageo success
        })
        .catch(errLogin => {
          let messageES = ''
          const { typePopUp, arcSite } = this.props

          switch (errLogin.code) {
            case '300037':
            case '300040':
              // aqui va el api de Guido:
              services
                .reloginEcoID(
                  email,
                  password,
                  typePopUp === 'organico' ? 'organico' : '1',
                  arcSite,
                  window
                )
                .then(resEco => {
                  if (resEco.retry) {
                    setTimeout(() => {
                      window.Identity.apiOrigin = this.origin_api
                      window.Identity.login(email, password, {
                        rememberMe: true,
                        cookie: true,
                      })
                        .then(() => {
                          this.setState({ sending: true })
                          this.handleGetProfile()
                          // delete cookie mpp_sess
                          Cookies.deleteCookie('mpp_sess')

                          this.taggeoSuccess() // -- test de tageo success
                        })
                        .catch(errReLogin => {
                          messageES = errReLogin

                          this.taggeoError() // -- test de tageo error
                        })
                    }, 500)
                  } else {
                    this.setState({
                      messageError:
                        'Correo electrónico y/o  contraseña incorrecta.',
                      sending: true,
                    })

                    this.taggeoError() // -- test de tageo error
                  }
                })
                .catch(errEco => {
                  window.console.error(errEco)
                })
              // aqui va el api de Guido:
              return
            case '130051`':
              messageES = 'El Correo electrónico no ha sido verificado.'
              break
            case '300014':
              messageES =
                'Tu cuenta ha sido bloqueada debido a demasiados intentos fallidos. Por favor inténtalo más tarde.'
              break
            default:
              messageES = errLogin.message
          }

          if (messageES !== '') {
            this.setState({
              messageError:
                messageES === 'Failed to fetch'
                  ? 'Oops. Ocurrió un error inesperado.'
                  : messageES,
              sending: true,
            })

            this.taggeoError() // -- test de tageo error
          }
        })
    } else {
      const { formErrors } = this.state
      if (email === null) {
        formErrors.email = 'Este campo es requerido'
        this.setState({ formErrors, email: '' })
      }
      if (password === null) {
        formErrors.password = 'Este campo es requerido'
        this.setState({ formErrors, password: '' })
      }
    }
  }

  handleGetProfile = () => {
    const { closePopup, arcSite } = this.props
    window.Identity.apiOrigin = this.origin_api
    window.Identity.getUserProfile().then(resProfile => {
      closePopup()
      Cookies.setCookie('arc_e_id', sha256(resProfile.email), 365)
      Cookies.deleteCookie('mpp_sess')

      // set token cookie
      const cookieName = 'ArcId.USER_INFO'
      const cookieValue = window.Identity.userIdentity || '{}'
      const myDate = new Date()
      myDate.setDate(myDate.getDate() + 1)
      document.cookie = `${cookieName}=${JSON.stringify(
        cookieValue
      )};expires=${myDate};domain=.${arcSite}.pe;path=/`
    })
  }

  handleLoginClick = () => {
    this.setState({
      hiddenEnterUser: true,
      hiddenbutton: false,
    })

    if (window.innerWidth < 1024) {
      this.setState({
        showSocialButtons: true,
      })
    }
  }

  toggleShowHidePass = () => {
    const { hiddenPass } = this.state
    this.setState({ hiddenPass: !hiddenPass })
  }

  componentDidMount = () => {
    const { password } = this.props
    if (password) {
      this.setState({ password })
    }
  }

  handleChangeValidation = e => {
    e.preventDefault()
    const { name, value } = e.target
    const { formErrors } = this.state

    if (name === 'email') {
      const isValidEmail = emailRegex.test(value)
        ? ''
        : 'Correo Electrónico Inválido'
      formErrors.email =
        value.length === 0 ? 'Este campo es requerido' : isValidEmail
    } else if (name === 'password') {
      const trimSpace = value.includes(' ')
        ? 'Contraseña inválida, no se permite espacios'
        : ''
      const isValidPass = value.length < 8 ? 'Mínimo 8 caracteres' : trimSpace
      formErrors.password =
        value.length === 0 ? 'Este campo es requerido' : isValidPass
    }
    this.setState({
      messageError: false,
      formErrors,
      [name]: value,
    })
  }

  handleLoginBackSocial = () => {
    this.setState({
      hiddenEnterUser: false,
      hiddenbutton: true,
      showSocialButtons: false,
    })
  }

  hanbleShowListBenefits = () => {
    const { hiddenListBenefits } = this.state
    this.setState({
      hiddenListBenefits: !hiddenListBenefits,
    })
  }

  taggeoSuccess() {
    const { typePopUp } = this.props

    // if (typePopUp === 'relogin') {
    //   window.dataLayer.push({
    //     event: `${typePopUp}_relogin_success`,
    //     eventCategory: `Web_Sign_Wall_${typePopUp}`,
    //     eventAction: `web_sw${typePopUp[0]}_relogin_success_ingresar`,
    //   })
    // } else {
    //   window.dataLayer.push({
    //     event: 'login_success',
    //     eventCategory: `Web_Sign_Wall_${typePopUp}`,
    //     eventAction: `web_sw${typePopUp[0]}_login_success_ingresar`,
    //   })
    // }

    Taggeo(
      `Web_Sign_Wall_${typePopUp}`,
      `web_sw${typePopUp[0]}_login_success_ingresar`
    )
    // esta pendiente el taggeo de relogin
  }

  taggeoError() {
    const { typePopUp } = this.props

    // if (typePopUp === 'relogin') {
    //   window.dataLayer.push({
    //     event: `${typePopUp}_relogin_error`,
    //     eventCategory: `Web_Sign_Wall_${typePopUp}`,
    //     eventAction: `web_sw${typePopUp[0]}_relogin_error_ingresar`,
    //   })
    // } else {
    //   window.dataLayer.push({
    //     event: 'login_error',
    //     eventCategory: `Web_Sign_Wall_${typePopUp}`,
    //     eventAction: `web_sw${typePopUp[0]}_login_error_ingresar`,
    //   })
    // }

    Taggeo(
      `Web_Sign_Wall_${typePopUp}`,
      `web_sw${typePopUp[0]}_login_error_ingresar`
    )
  }

  render = () => {
    const {
      formErrors,
      showSocialButtons,
      hiddenListBenefits,
      hiddenEnterUser,
      messageError,
      hiddenPass,
      sending,
      hiddenbutton,
    } = this.state
    const { closePopup, typePopUp, typeForm, arcSite } = this.props
    return (
      <ModalConsumer>
        {value => (
          <div className="modal-body__wrapper">
            <form
              className="form-grid"
              noValidate
              onSubmit={e => this.handleFormSubmit(e)}>
              <div
                className="form-grid__group"
                hidden={!showSocialButtons || !hiddenListBenefits}>
                <div className="form-grid__back">
                  <button
                    type="button"
                    onClick={e => this.handleLoginBackSocial(e)}
                    className="link-back">
                    <Icon.Back />
                    <span>Volver</span>
                  </button>
                </div>
              </div>

              <div className="form-grid__group" hidden={hiddenListBenefits}>
                <div className="form-grid__back">
                  <button
                    type="button"
                    onClick={e => this.hanbleShowListBenefits(e)}
                    className="link-back">
                    <Icon.Back />
                    <span>Volver</span>
                  </button>
                </div>
                <ListBenefits />
              </div>

              <div className="form-grid__group" hidden={!hiddenListBenefits}>
                {arcSite !== 'peru21' ? (
                  <h1
                    className="form-grid__title-big text-center lg:hidden"
                    hidden={hiddenEnterUser}>
                    Regístrate y mantente siempre informado con las noticias más
                    relevantes del Perú y el mundo
                  </h1>
                ) : null}

                <h1 className="form-grid__title-login text-center mt-20 mb-10">
                  Ingresa con tu cuenta de:
                </h1>

                <div className="form-grid__group" hidden={showSocialButtons}>
                  <div className="form-group form-group--unique">
                    <AuthFacebook
                      closePopup={closePopup}
                      id="facebook-sign-in-button"
                      typePopUp={typePopUp}
                      typeForm={typeForm}
                    />
                  </div>
                </div>

                <div
                  className="form-grid__group mt-30"
                  hidden={!hiddenEnterUser}>
                  <div
                    className={`form-grid--error ${messageError && 'active'}`}>
                    {messageError}
                  </div>

                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      className={
                        formErrors.email.length > 0
                          ? 'form-group__input form-group__input--error'
                          : 'form-group__input'
                      }
                      placeholder="Correo Electrónico"
                      noValidate
                      onChange={this.handleChangeValidation}
                    />
                    <label htmlFor="email" className="form-group__label">
                      Correo Electrónico
                    </label>

                    {formErrors.email.length > 0 && (
                      <span className="message__error">{formErrors.email}</span>
                    )}
                  </div>

                  <div className="form-group row-pass">
                    <input
                      type={hiddenPass ? 'password' : 'text'}
                      name="password"
                      id="password"
                      className={
                        formErrors.password.length > 0
                          ? 'form-group__input form-group__input--error'
                          : 'form-group__input'
                      }
                      placeholder="Contraseña"
                      noValidate
                      onChange={this.handleChangeValidation}
                    />
                    <input
                      type="button"
                      onClick={e => this.toggleShowHidePass(e)}
                      className={
                        hiddenPass
                          ? 'row-pass__btn row-pass--hide'
                          : 'row-pass__btn row-pass--show'
                      }
                    />
                    <label htmlFor="password" className="form-group__label">
                      Contraseña
                    </label>

                    {formErrors.password.length > 0 && (
                      <span className="message__error">
                        {formErrors.password}
                      </span>
                    )}

                    <p className="form-grid__pass">
                      <button
                        id="link-recuperar-pass"
                        onClick={() => {
                          Taggeo(
                            `Web_Sign_Wall_${typePopUp}`,
                            `web_sw${typePopUp[0]}_contrasena_link_olvide`
                          )
                          value.changeTemplate('forgot')
                        }}
                        type="button"
                        className="link-gray">
                        Olvidé mi contraseña
                      </button>
                    </p>
                  </div>

                  <div className="form-group">
                    <input
                      type="submit"
                      name="ingresar"
                      id="login_boton_ingresar"
                      className={
                        arcSite !== 'peru21'
                          ? 'btn input-button'
                          : 'btn btn--blue btn-bg'
                      }
                      value={!sending ? 'Ingresando...' : 'Iniciar Sesión'}
                      onClick={() =>
                        Taggeo(
                          `Web_Sign_Wall_${typePopUp}`,
                          `web_sw${typePopUp[0]}_login_boton_ingresar`
                        )
                      }
                      disabled={!sending}
                    />
                  </div>
                </div>

                <div className="form-grid__group" hidden={!hiddenbutton}>
                  <button
                    onClick={e => {
                      this.handleLoginClick(e)
                      Taggeo(
                        `Web_Sign_Wall_${typePopUp}`,
                        `web_sw${typePopUp[0]}_open_login_boton_ingresar`
                      )
                    }}
                    type="button"
                    name="enterUserName"
                    id="open_login_boton_ingresar"
                    className="btn btn-email">
                    <Icon.Mail />
                    <span className="btn-text">Ingresa con tu usuario</span>
                  </button>
                </div>
              </div>

              <div className="form-grid__group">
                <p className="form-grid__link text-center text-sm pt-20 pb-20">
                  ¿Aún no tienes una cuenta?
                  <button
                    type="button"
                    id="login_boton_registrate"
                    onClick={() => {
                      Taggeo(
                        `Web_Sign_Wall_${typePopUp}`,
                        `web_sw${typePopUp[0]}_login_boton_registrate`
                      )
                      value.changeTemplate('register')
                    }}
                    className="link-blue link-color text-sm">
                    Regístrate
                  </button>
                </p>
                <p className="form-grid__subtitle form-grid__subtitle--fb text-center mt-10">
                  Al registrarte, nos ayudarás a mejorar tu experiencia de
                  navegación. Tus datos no se publicarán sin tu autorización.
                </p>
              </div>

              {arcSite !== 'peru21' ? (
                <div
                  className="form-grid__group lg:hidden"
                  hidden={!hiddenListBenefits}>
                  <p className="form-grid__subtitle text-center form-group--center">
                    <button
                      type="button"
                      onClick={e => this.hanbleShowListBenefits(e)}
                      className="link-blue link-color">
                      Conoce aquí los beneficios de registrarte
                    </button>
                  </p>
                </div>
              ) : null}
            </form>
          </div>
        )}
      </ModalConsumer>
    )
  }
}

export default FormLogin
