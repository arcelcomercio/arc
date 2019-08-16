// TODO: Modificar estilos para colocar el input dentro del label y retirar excepciones del eslint
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react'
import { sha256 } from 'js-sha256'
import ENV from 'fusion:environment'
import Consumer from 'fusion:consumer'

import AuthFacebook from './social-auths/auth-facebook'

import Cookie from '../../utils/cookie'
import { emailRegex } from '../../utils/regex'
import FormValid from '../../utils/form-valid'
import { ModalConsumer } from '../context'

const Cookies = new Cookie()

@Consumer
class FormLoginPaywall extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hiddenListBenefits: true,
      hiddenTitleBenefits: true,
      linkListBenefits: false,
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
    this.origin_api =
      ENV.ENVIRONMENT === 'elcomercio'
        ? `https://api.${arcSite}.pe`
        : `https://api-sandbox.${arcSite}.pe`
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
          // -- test de tageo sucess
        })
        .catch(errLogin => {
          let messageES = ''
          switch (errLogin.code) {
            case '300040':
            case '300037':
              messageES = 'Correo electrónico y/o  contraseña incorrecta.'
              break

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
    const { closePopup, reloadLogin } = this.props

    window.Identity.apiOrigin = this.origin_api
    window.Identity.getUserProfile().then(resGetProfile => {
      Cookies.setCookie('arc_e_id', sha256(resGetProfile.email), 365)
      Cookies.deleteCookie('mpp_sess')
      if (reloadLogin) {
        window.location.reload()
      } else {
        closePopup()
      }
    })
  }

  toggleShow = () => {
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

    this.setState({ formErrors, [name]: value })
  }

  render = () => {
    const {
      formErrors,
      hiddenListBenefits,
      messageError,
      email,
      hiddenPass,
      sending,
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
              <div className="form-grid__group" hidden={!hiddenListBenefits}>
                <div className="row-grid form-group col-center">
                  <p className="text-center mt-20 mb-20">
                    Ingresa con tus redes sociales
                  </p>
                </div>

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

                <div className="row-grid form-group col-center">
                  <p className="text-center mt-20 mb-20">
                    Ingresa con tu usuario
                  </p>
                </div>

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
                      onClick={() => this.toggleShow()}
                      className={
                        hiddenPass
                          ? 'row-pass__btn row-pass--hide'
                          : 'row-pass__btn row-pass--show'
                      }
                    />
                    <input
                      type={hiddenPass ? 'password' : 'text'}
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
                      <span className="message__error">
                        {formErrors.password}
                      </span>
                    )}

                    <p className="form-grid__pass">
                      <button
                        id="link-recuperar-pass"
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
              </div>

              <div className="form-grid__group">
                <p className="form-grid__link text-center text-sm pt-40 pb-20">
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
                <p className="form-grid__subtitle form-grid__subtitle--fb text-center mt-10 mb-20">
                  CON TUS DATOS, MEJORAREMOS TU EXPERIENCIA DE NAVEGACIÓN Y
                  NUNCA PUBLICAREMOS SIN TU PERMISO
                </p>
              </div>
            </form>
          </div>
        )}
      </ModalConsumer>
    )
  }
}

export default FormLoginPaywall
