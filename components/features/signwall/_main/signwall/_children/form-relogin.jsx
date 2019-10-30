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
import FormValid from '../../utils/form-valid'
import Taggeo from '../../utils/taggeo'
import Domains from '../../utils/domains'
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
      hiddenListBenefits: true,
      hiddenTitleBenefits: true,
      linkListBenefits: false,
      hiddenPass: true,
      email: profileMPP ? profileMPP.email : null,
      password: null,
      formErrors: {
        email: '',
        password: '',
      },
      nameMPP: profileMPP ? profileMPP.firstName : 'Lector',
      messageError: false,
      sending: true,
    }

    const { arcSite, typePopUp } = this.props
    this.origin_api = Domains.getOriginAPI(arcSite)
    this.tipCat = typePopUp
  }

  componentWillMount() {
    window.Identity.apiOrigin = this.origin_api
  }

  handleFormSubmit = e => {
    e.preventDefault()

    const { email, password } = this.state
    const { typePopUp, arcSite } = this.props

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

          Taggeo(
            `Web_Sign_Wall_${typePopUp}`,
            `web_sw${typePopUp[0]}_email_login_success_ingresar`
          )
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
                  typePopUp === 'relogin' ? 'relogin' : 'reloginemail',
                  arcSite,
                  window
                )
                .then(resEco => {
                  if (resEco.retry === true) {
                    setTimeout(() => {
                      window.Identity.apiOrigin = this.origin_api
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

                    this.taggeoSuccess() // -- test tageo success
                  } else {
                    this.setState({
                      messageError:
                        'Correo electrónico y/o  contraseña incorrecta.',
                      sending: true,
                    })

                    this.taggeoError() // -- test tageo error
                  }
                })
                .catch(() => {
                  this.setState({
                    messageError:
                      'Correo electrónico y/o  contraseña incorrecta.',
                    sending: true,
                  })

                  this.taggeoError() // -- test tageo error
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
    const { closePopup } = this.props

    window.Identity.apiOrigin = this.origin_api
    window.Identity.getUserProfile().then(resGetProfile => {
      closePopup()
      Cookies.setCookie('arc_e_id', sha256(resGetProfile.email), 365)
      Cookies.deleteCookie('mpp_sess')
      // window.localStorage.setItem('ArcId._ID', resGetProfile.uuid)
    })
  }

  handleLoginBackSocial = () => {
    this.setState({
      hiddenTitleBenefits: true,
      linkListBenefits: false,
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

  taggeoSuccess = () => {
    const { typePopUp } = this.props

    Taggeo(
      `Web_Sign_Wall_${typePopUp}`,
      `web_sw${typePopUp[0]}_email_login_success`
    )
  }

  taggeoError = () => {
    const { typePopUp } = this.props

    Taggeo(
      `Web_Sign_Wall_${typePopUp}`,
      `web_sw${typePopUp[0]}_email_login_error`
    )
  }

  render = () => {
    const {
      formErrors,
      nameMPP,
      hiddenListBenefits,
      hiddenTitleBenefits,
      linkListBenefits,
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
                  <h1 className="form-grid__title-big text-center">
                    ¡Hola {nameMPP || 'Lector'}! Para mejorar tu experiencia de
                    navegación, inicia sesión nuevamente.
                  </h1>
                </div>

                <h1 className="form-grid__title-login text-center mt-20 mb-10">
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

                  <div className="row-grid form-group">
                    <input
                      type="submit"
                      name="ingresar"
                      id="login_boton_ingresar"
                      className="btn btn-bg"
                      value={!sending ? 'Ingresando...' : 'Iniciar Sesión'}
                      disabled={!sending}
                      // eslint-disable-next-line jsx-a11y/tabindex-no-positive
                      tabIndex="3"
                      onClick={() =>
                        Taggeo(
                          `Web_Sign_Wall_${typePopUp}`,
                          `web_sw${typePopUp[0]}_email_login_boton`
                        )
                      }
                    />
                  </div>
                </div>

                <div className="row-grid form-group col-center">
                  <p className="text-center mt-20 mb-20">
                    ó ingresa con tu cuenta de:
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
              </div>

              <div className="form-grid__group">
                <p className="form-grid__link text-center text-sm pt-40 pb-20">
                  ¿Aún no tienes una cuenta?
                  <button
                    type="button"
                    onClick={() => {
                      Taggeo(
                        `Web_Sign_Wall_${typePopUp}`,
                        `web_sw${typePopUp[0]}_login_boton_registrate`
                      )
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
                    className="link-blue link-color">
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
