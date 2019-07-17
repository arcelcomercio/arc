/* eslint-disable react/button-has-type */
// TODO: Modificar estilos para colocar el input dentro del label y retirar excepciones del eslint
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react'
import { sha256 } from 'js-sha256'
import Consumer from 'fusion:consumer'
import * as Icon from '../../common/iconos'

import AuthFacebook from './social-auths/auth-facebook'

import ListBenefits from './benefits'
import Cookie from '../../utils/cookie'
import { emailRegex } from '../../utils/regex'
import Services from '../../utils/services'
import GetProfile from '../../utils/get-profile'
import FormValid from '../../utils/form-valid'
import { ModalConsumer } from '../context'

const Cookies = new Cookie()
const services = new Services()

@Consumer
class FormReLogin extends Component {
  constructor(props) {
    super(props)

    const getProfileMPP = window.localStorage.getItem('profileMPP')
    const profileMPP = JSON.parse(getProfileMPP)

    this.state = {
      hiddendiv: false,
      hiddenListBenefits: true,
      hiddenbutton: true,
      hiddenSocialButtons: true,
      hiddenTitleBenefits: true,
      showSocialButtons: false,
      linkListBenefits: false,
      hidden: true,
      email: profileMPP ? profileMPP.email : null,
      password: null,
      formErrors: {
        email: '',
        password: '',
      },
      nameMPP: profileMPP ? profileMPP.firstName : 'Lector',
      messageError: false,
      sending: true,
      sendingFb: true,
    }

    const { typePopUp = '', typeForm = '' } = props
    this.tipCat = typePopUp
    this.tipAct = typePopUp ? `web_sw${typePopUp.slice(0, 1)}` : ''
    this.tipForm = typeForm
    // log(this.tipCat, this.tipAct, this.tipForm);

    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.toggleShow = this.toggleShow.bind(this)
    this.handleLoginClick = this.handleLoginClick.bind(this)
  }

  handleFormSubmit = e => {
    e.preventDefault()

    const {
      siteProperties: {
        signwall: { ORIGIN_API },
      },
    } = this.props

    const { email, password } = this.state

    if (FormValid(this.state)) {
      this.setState({ sending: false })

      window.Identity.apiOrigin = ORIGIN_API
      window.Identity.login(email, password, {
        rememberMe: true,
        cookie: true,
      })
        .then(() => {
          this.setState({ sending: true })
          this.handleGetProfile()
        })
        .catch(errLogin => {
          let messageES = ''
          switch (errLogin.code) {
            case '300040':
            case '300037':
              // aqui va el api de Guido:
              services
                .reloginEcoID(
                  email,
                  password,
                  this.tipCat === 'relogin' ? 'relogin' : 'reloginemail'
                )
                .then(resEco => {
                  if (resEco.retry === true) {
                    setTimeout(() => {
                      window.Identity.apiOrigin = ORIGIN_API
                      window.Identity.login(email, password, {
                        rememberMe: true,
                        cookie: true,
                      })
                        .then(() => {
                          this.handleGetProfile()
                        })
                        .catch(errReLogin => {
                          this.setState({
                            messageError: errReLogin,
                            sending: true,
                          })
                        })
                    }, 500)

                    // -- test tageo success
                    window.dataLayer.push({
                      event:
                        this.tipCat === 'relogin'
                          ? 'relogin_success'
                          : 'relogin_email_success',
                    })
                    // -- test tageo success
                  } else {
                    this.setState({
                      messageError:
                        'Correo electrónico y/o  contraseña incorrecta.',
                      sending: true,
                    })

                    // -- test tageo error
                    window.dataLayer.push({
                      event:
                        this.tipCat === 'relogin'
                          ? 'relogin_error'
                          : 'relogin_email_error',
                    })
                    // -- test tageo error
                  }
                })
                .catch(() => {
                  // -- test tageo error
                  window.dataLayer.push({
                    event:
                      this.tipCat === 'relogin'
                        ? 'relogin_error'
                        : 'relogin_email_error',
                  })
                  // -- test tageo error
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

          this.setState({
            messageError:
              messageES === 'Failed to fetch'
                ? 'Oops. Ocurrió un error inesperado.'
                : messageES,
            sending: true,
          })
        })
    } else {
      // console.error('FORM INVALID', this.state.formErrors);
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
    const {
      closePopup,
      siteProperties: {
        signwall: { ORIGIN_API },
      },
    } = this.props

    window.Identity.apiOrigin = ORIGIN_API
    window.Identity.getUserProfile().then(resGetProfile => {
      closePopup()
      Cookies.setCookie('arc_e_id', sha256(resGetProfile.email), 365)
      Cookies.deleteCookie('mpp_sess')
      // window.sessUser.setState({ accessPanel: true })
      // window.nameUser.setState({ nameUser: new GetProfile().username })
      // window.initialUser.setState({
      //   initialUser: new GetProfile().initname,
      // })
    })
  }

  handleLoginClick = () => {
    this.setState({
      hiddendiv: true,
      hiddenbutton: false,
      linkListBenefits: true,
    })

    if (window.innerWidth <= 768) {
      this.setState({ showSocialButtons: true })
      this.setState({ hiddenSocialButtons: false })
      this.setState({ hiddenTitleBenefits: false })
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

  handlePasswordChange = e => {
    this.setState({ password: e.target.value })
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

    this.setState({ messageError: false })

    const { name, value } = e.target
    const { formErrors } = this.state

    switch (name) {
      case 'email':
        if (value.length === 0) {
          formErrors.email = 'Este campo es requerido'
        } else if (emailRegex.test(value)) {
          formErrors.email = ''
        } else {
          formErrors.email = 'Correo Electrónico Inválido'
        }
        break
      case 'password':
        if (value.length === 0) {
          formErrors.password = 'Este campo es requerido'
        } else if (value.length < 8) {
          formErrors.password = 'Mínimo 8 caracteres'
        } else if (value.indexOf(' ') >= 0) {
          formErrors.password = 'Contraseña inválida, no se permite espacios'
        } else {
          formErrors.password = ''
        }
        break
      default:
        break
    }

    // this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    this.setState({ formErrors, [name]: value })
  }

  hanbleShowListBenefits = () => {
    const { hiddenListBenefits, linkListBenefits } = this.state
    const modalRelogEmail = document.querySelector('#arc-popup-relogin-email')
    const modalRelog = document.querySelector('#arc-popup-relogin')
    if (modalRelogEmail) modalRelogEmail.scrollTop = '0px'
    if (modalRelog) modalRelog.scrollTop = '0px'
    this.setState({
      hiddenListBenefits: !hiddenListBenefits,
      linkListBenefits: !linkListBenefits,
    })
  }

  render = () => {
    const {
      formErrors,
      showSocialButtons,
      nameMPP,
      hiddenListBenefits,
      hiddenTitleBenefits,
      linkListBenefits,
      messageError,
      email,
      hidden,
      sending,
      hiddenSocialButtons,
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
                <div hidden={!hiddenTitleBenefits}>
                  <h1 className="form-grid__title-big text-center hidden-tablet">
                    ¡Hola {nameMPP || 'Lector'}! Para mejorar tu experiencia de
                    navegación, inicia sesión nuevamente.
                  </h1>
                </div>

                <h1 className="form-grid__title-login text-center">
                  Ingresa con
                </h1>

                <div className="form-grid__group">
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
                      // eslint-disable-next-line jsx-a11y/tabindex-no-positive
                      tabIndex="1"
                      value={email || ''}
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
                      type="button"
                      onClick={this.toggleShow}
                      className={
                        hidden
                          ? 'row-pass__btn row-pass--hide'
                          : 'row-pass__btn row-pass--show'
                      }
                    />
                    <input
                      type={hidden ? 'password' : 'text'}
                      name="password"
                      className={
                        formErrors.password.length > 0
                          ? 'form-group__input form-group__input--error'
                          : 'form-group__input'
                      }
                      placeholder="Contraseña"
                      noValidate
                      onChange={this.handleChangeValidation}
                      // eslint-disable-next-line jsx-a11y/tabindex-no-positive
                      tabIndex="2"
                    />

                    <label htmlFor="password" className="form-group__label">
                      Contraseña
                    </label>

                    {formErrors.password.length > 0 && (
                      <span className="error-message">
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

                  <div className="row-grid form-group">
                    <input
                      type="submit"
                      name="ingresar"
                      id="login_boton_ingresar"
                      className="btn btn--blue btn-bg"
                      value={!sending ? 'Ingresando...' : 'Iniciar Sesión'}
                      disabled={!sending}
                      // eslint-disable-next-line jsx-a11y/tabindex-no-positive
                      tabIndex="3"
                    />
                  </div>
                </div>

                <div className="row-grid form-group col-center">
                  <p className="text-center mt-20 mb-20">
                    ó ingresa con tu cuenta de:
                  </p>
                </div>

                <div hidden={!hiddenSocialButtons}>
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
                </div>
              </div>

              <div className="form-grid__group">
                <p className="form-grid__link text-center pt-40 ">
                  ¿Aún no tienes una cuenta?
                  <button
                    type="button"
                    onClick={() => {
                      value.changeTemplate('register')
                    }}
                    id="login_boton_registrate"
                    className="link-blue link-color">
                    Regístrate
                  </button>
                </p>
              </div>

              <div className="form-grid__group" hidden={linkListBenefits}>
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

export default FormReLogin
