/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
// TODO Agregar excepcion a eslint
import React, { Component } from 'react'
import { sha256 } from 'js-sha256'

import FormValid from '../../utils/form-valid'
import * as Icon from '../../common/iconos'
import ListBenefits from './benefits'
// import AuthGoogle from './social-auths/auth-google'
import AuthFacebook from './social-auths/auth-facebook'
import Cookie from '../../utils/cookie'
import { emailRegex } from '../../utils/regex'
import Services from '../../utils/services'
import GetProfile from '../../utils/get-profile'

import { ModalConsumer } from '../context'

const Cookies = new Cookie()
const services = new Services()

class FormLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hiddendiv: false,
      hiddenListBenefits: true,
      hiddenbutton: true,
      hiddenSocialButtons: true,
      hiddenTitleBenefits: true,
      showSocialButtons: false,
      linkListBenefits: false,
      hidden: true,
      email: null,
      password: null,
      formErrors: {
        email: '',
        password: '',
      },
      messageError: false,
      sending: true,
      sendingFb: true,
    }
  }

  handleFormSubmit = e => {
    e.preventDefault()
    const { typePopUp } = this.props
    const { email, password } = this.state
    const tipCat = typePopUp || ''
    const tipAct = typePopUp ? `web_sw${typePopUp.slice(0, 1)}` : ''
    if (FormValid(this.state)) {
      this.setState({ sending: false })
      window.Identity.login(email, password, {
        rememberMe: true,
        cookie: true,
      })
        .then(() => {
          this.setState({ sending: true })
          this.handleGetProfile()
          Cookies.deleteCookie('mpp_sess')
          // -- test de tageo
          window.dataLayer = window.dataLayer || []
          window.dataLayer.push({
            event: 'login_success',
            eventCategory: `Web_Sign_Wall_${tipCat}`,
            eventAction: `${tipAct}_login_success_ingresar`,
          })
          // -- test de tageo
        })
        .catch(errLogin => {
          let messageES = ''

          switch (errLogin.code) {
            case '300037':
            case '300040':
              // aqui va el api de Guido:
              services
                .reloginEcoID(
                  email,
                  password,
                  tipCat === 'organico' ? 'organico' : '1',
                  window
                )
                .then(resEco => {
                  if (resEco.retry) {
                    setTimeout(() => {
                      window.Identity.login(email, password, {
                        rememberMe: true,
                        cookie: true,
                      })
                        .then(() => {
                          this.setState({ sending: true })
                          this.handleGetProfile()
                          // delete cookie mpp_sess
                          Cookies.deleteCookie('mpp_sess')
                          // -- test de tageo success
                          window.dataLayer.push({
                            event: `${tipCat}_relogin_success`, // organico_relogin_success , hard_relogin_success
                            eventCategory: `Web_Sign_Wall_${tipCat}`, // Web_Sign_Wall_organico, Web_Sign_Wall_hard
                            eventAction: `${tipAct}_relogin_success_ingresar`, // web_swo_relogin_success, web_swh_relogin_success
                          })
                          // -- test de tageo success
                        })
                        .catch(errReLogin => {
                          messageES = errReLogin
                          // -- test de tageo error
                          window.dataLayer.push({
                            event: `${tipCat}_relogin_error`, // organico_relogin_error, hard_relogin_error
                            eventCategory: `Web_Sign_Wall_${tipCat}`, // Web_Sign_Wall_organico, Web_Sign_Wall_hard
                            eventAction: `${tipAct}_relogin_error_ingresar`, // web_swo_relogin_error, web_swh_relogin_error
                          })
                          // -- test de tageo error
                        })
                    }, 500)
                  } else {
                    this.setState({
                      messageError:
                        'Correo electrónico y/o  contraseña incorrecta.',
                      sending: true,
                    })
                    // -- test de tageo error
                    window.dataLayer.push({
                      event: 'login_error',
                      eventCategory: `Web_Sign_Wall_${tipCat}`,
                      eventAction: `${tipAct}_login_error_ingresar`,
                    })
                    // -- test de tageo error
                  }
                })
                .catch(errEco => {
                  console.log(errEco)
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
            // -- test de tageo error
            window.dataLayer.push({
              event: 'login_error',
              eventCategory: `Web_Sign_Wall_${tipCat}`,
              eventAction: `${tipAct}_login_error_ingresar`,
            })
            // -- test de tageo error
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
    const { closePopup } = this.props
    window.Identity.getUserProfile().then(resProfile => {
      closePopup()
      Cookies.setCookie('arc_e_id', sha256(resProfile.email), 365)
      Cookies.deleteCookie('mpp_sess');
    })
  }

  handleLoginClick = () => {
    this.setState({
      hiddendiv: true,
      hiddenbutton: false,
      linkListBenefits: true,
    })

    if (window.innerWidth <= 768) {
      this.setState({
        showSocialButtons: true,
        hiddenSocialButtons: false,
        hiddenTitleBenefits: false,
      })
    }
  }

  handleLoginBackSocial = () => {
    this.setState({
      hiddendiv: false,
      hiddenbutton: true,
      hiddenSocialButtons: true,
      showSocialButtons: false,
      hiddenTitleBenefits: true,
      linkListBenefits: false,
    })
  }

  toggleShow = () => {
    const { hidden } = this.state
    this.setState({ hidden: !hidden })
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

  hanbleShowListBenefits = () => {
    const { hiddenListBenefits, linkListBenefits } = this.state
    this.setState({
      hiddenListBenefits: !hiddenListBenefits,
      linkListBenefits: !linkListBenefits,
    })
  }

  render = () => {
    const {
      formErrors,
      showSocialButtons,
      hiddenListBenefits,
      hiddendiv,
      messageError,
      hidden,
      sending,
      hiddenbutton,
    } = this.state
    const { closePopup, typePopUp, typeForm } = this.props
    return (
      <ModalConsumer>
        {value => (
          <div className="modal-body__wrapper">
            <form
              className="form-grid"
              noValidate
              onSubmit={e => this.handleFormSubmit(e)}>
              <div className="form-grid__back" hidden={!showSocialButtons}>
                <button
                  type="button"
                  onClick={e => this.handleLoginBackSocial(e)}
                  className="link-back">
                  <Icon.Back />
                  <span>Volver</span>
                </button>
              </div>

              <div className="form-grid__group" hidden={hiddenListBenefits}>
                <div className="form-grid__back">
                  <button
                    type="button"
                    onClick={this.hanbleShowListBenefits}
                    className="link-back">
                    <Icon.Back />
                    <span>Volver</span>
                  </button>
                </div>
                <ListBenefits />
              </div>

              <div className="form-grid__group" hidden={!hiddenListBenefits}>
                <h1 className="form-grid__title-big text-center hidden-tablet">
                  Regístrate y mantente siempre informado con las noticias más
                  relevantes del Perú y el mundo
                </h1>

                <h1 className="form-grid__title-login text-center">
                  Ingresa con tu cuenta de:
                </h1>

                <div className="form-grid__group">
                  <div className="form-group form-group--unique">
                    <AuthFacebook
                      closePopup={closePopup}
                      id="facebook-sign-in-button"
                      typePopUp={typePopUp}
                      typeForm={typeForm}
                    />
                  </div>
                </div>

                <div className="form-grid__group mt-30" hidden={!hiddendiv}>
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
                      type={hidden ? 'password' : 'text'}
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
                      onClick={e => this.toggleShow(e)}
                      className={
                        hidden
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
                        onClick={() => value.changeTemplate('forgot')}
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
                      className="btn input-button"
                      value={!sending ? 'Ingresando...' : 'Iniciar Sesión'}
                      disabled={!sending}
                    />
                  </div>
                </div>

                <div className="form-grid__group" hidden={!hiddenbutton}>
                  <button
                    onClick={e => this.handleLoginClick(e)}
                    type="button"
                    name="enterDates"
                    className="btn btn-email">
                    <Icon.Mail />
                    <span className="btn-text">Ingresa con tu usuario</span>
                  </button>
                </div>
              </div>

              <div className="form-grid__group">
                <p className="form-grid__link text-center">
                  ¿Aún no tienes una cuenta?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      value.changeTemplate('register')
                    }}
                    className="link-blue link-color">
                    Regístrate
                  </button>
                </p>
                <p className="form-grid__subtitle form-grid__subtitle--fb text-center">
                  Al registrarte, nos ayudarás a mejorar tu experiencia de
                  navegación. Tus datos no se publicarán sin tu autorización.
                </p>
              </div>

              <div className="form-grid__group">
                <p className="form-grid__subtitle text-center form-group--center">
                  <button
                    type="button"
                    onClick={this.hanbleShowListBenefits}
                    className="link-blue hidden-tablet link-color">
                    Conoce aquí los beneficios de registrarte
                  </button>
                </p>
              </div>
            </form>
          </div>
        )}
      </ModalConsumer>
    )
  }
}

export default FormLogin
