// TODO: Modificar estilos para colocar el input dentro del label y retirar excepciones del eslint
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import { sha256 } from 'js-sha256'
import * as Icon from '../../common/iconos'
import {
  emailRegex,
  strongRegularExp,
  mediumRegularExp,
} from '../../utils/regex'
import AuthFacebook from './social-auths/auth-facebook'
import getDevice from '../../utils/get-device'
import Cookie from '../../utils/cookie'
import FormValid from '../../utils/form-valid'
import Taggeo from '../../utils/taggeo'
import Domains from '../../utils/domains'
import { ModalConsumer } from '../context'

const Cookies = new Cookie()

@Consumer
class FormRegister extends Component {
  constructor(props) {
    super(props)
    this.state = {
      usernamereg: null,
      passwordreg: null,
      checked: false,
      checkpwdStrength: '0px',
      formErrors: {
        usernamereg: '',
        passwordreg: '',
        ischecked: '',
      },
      messageError: false,
      showMessage: false,
      showMsgConfirm: false,
      sending: true,
    }

    const { arcSite } = this.props
    this.origin_api = Domains.getOriginAPI(arcSite)
  }

  componentWillMount() {
    window.Identity.apiOrigin = this.origin_api
  }

  handleFormSubmit = e => {
    e.preventDefault()

    const { checked } = this.state
    const { typePopUp, arcSite } = this.props

    const originAction = tipmodal => {
      const isHard = document.querySelector('#arc-popup-signwallhard')
      if (isHard) {
        return '1'
      }
      if (tipmodal === 'relogemail') {
        return 'reloginemail'
      }
      if( tipmodal === 'reloghash'){
        return 'reloginhash'
      }
      return '0'
    }

    if (FormValid(this.state) && checked !== false) {
      this.setState({ sending: false })
      const EmailUserNew = this.usernamereg.value

      window.Identity.apiOrigin = this.origin_api
      window.Identity.signUp(
        {
          userName: this.usernamereg.value,
          credentials: this.passwordreg.value,
          grantType: 'password',
        },
        {
          displayName: this.usernamereg.value,
          email: this.usernamereg.value,
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
              value: '1',
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
        },
        { doLogin: true },
        { rememberMe: true }
      )
        .then(() => {
          this.setState({
            showMessage: true,
            sending: true,
          })

          Cookies.setCookie('arc_e_id', sha256(EmailUserNew), 365)
          // window.localStorage.setItem('ArcId._ID', window.Identity.userIdentity.uuid)

          this.taggeoSuccess() // -- test de tageo success

          // set token cookie
          const USER_IDENTITY = JSON.stringify(
            window.Identity.userIdentity || {}
          )
          Cookies.setCookieDomain('ArcId.USER_INFO', USER_IDENTITY, 1, arcSite)
        })
        .catch(err => {
          // console.log(err)
          let messageES = ''
          switch (err.code) {
            case '300031':
            case '300039':
            case '300023':
              messageES = 'El correo electrónico ingresado ya existe'
              break
            case '300040':
            case '300037':
              // console.log('este usuario requiere reset pass');
              window.Identity.apiOrigin = this.origin_api
              window.Identity.requestResetPassword(EmailUserNew)
                .then(() => {
                  this.setState({
                    showMessage: true,
                    sending: true,
                    showMsgConfirm: true,
                  })
                  window.localStorage.removeItem('ArcId.USER_PROFILE') // remueve profile creado por signup
                  window.Identity.userProfile = null // remueve profile creado por signup
                })
                .catch(errSend => {
                  window.console.error(errSend)
                })
              break
            default:
              messageES = 'Oops. Ocurrió un error inesperado.'
          }

          this.setState({
            messageError: messageES,
            sending: true,
          })

          this.taggeoError() // -- test de tageo error
        })
    } else {
      // console.error('FORM INVALID', this.state.formErrors);
      const { formErrors, usernamereg, passwordreg } = this.state

      if (usernamereg == null) {
        formErrors.usernamereg = 'Este campo es requerido'
        this.setState({ formErrors, usernamereg: '' })
      }

      if (passwordreg == null) {
        formErrors.passwordreg = 'Este campo es requeridoo'
        this.setState({ formErrors, passwordreg: '' })
      }

      if (checked === false) {
        formErrors.ischecked =
          'Para ser parte de nuestra comunidad es necesario aceptar los términos y condiciones'
        this.setState({ formErrors, ischecked: '' })
      }
    }
  }

  handleGetProfile = () => {
    // solo cambia a confirmacion se usa para verificar premium
    this.setState({
      showMessage: true,
      sending: true,
    })
  }

  handleForcePassword = e => {
    const valueInput = e.target.value

    if (strongRegularExp.test(valueInput)) {
      this.setState({ checkpwdStrength: '40px' })
    } else if (mediumRegularExp.test(valueInput)) {
      this.setState({ checkpwdStrength: '20px' })
    } else if (valueInput.length >= '3') {
      this.setState({ checkpwdStrength: '10px' })
    } else {
      this.setState({ checkpwdStrength: '0px' })
    }
  }

  handleChangeValidation = e => {
    this.setState({ messageError: false })

    const { name, value } = e.target
    const { formErrors, checked } = this.state

    switch (name) {
      case 'usernamereg':
        if (value.length === 0) {
          formErrors.usernamereg = 'Este campo es requerido'
        } else if (emailRegex.test(value)) {
          formErrors.usernamereg = ''
        } else {
          formErrors.usernamereg = 'Correo Electrónico Inválido'
        }
        break
      case 'passwordreg':
        if (value.length === 0) {
          formErrors.passwordreg = 'Este campo es requerido'
        } else if (value.length < 8) {
          formErrors.passwordreg = 'Mínimo 8 caracteres'
        } else if (value.indexOf(' ') >= 0) {
          formErrors.passwordreg = 'Contraseña inválida, no se permite espacios'
        } else {
          formErrors.passwordreg = ''
        }
        break
      case 'termsConds':
        this.setState({ checked: !checked })
        formErrors.ischecked =
          checked === false
            ? ''
            : 'Para ser parte de nuestra comunidad es necesario aceptar los términos y condiciones'
        break
      default:
        return null
    }

    this.setState({ formErrors, [name]: value })
  }

  handleSuscription = e => {
    const { removeBefore, typePopUp, arcSite } = this.props
    e.preventDefault()
    window.sessionStorage.setItem(
      'paywall_last_url',
      window.document.referrer
        ? window.document.referrer.split(window.location.origin)[1]
        : ''
    )
    removeBefore() // dismount before
    window.location.href = Domains.getUrlPaywall(arcSite)
    window.sessionStorage.setItem('paywall_type_modal', typePopUp)
  }

  taggeoError() {
    const { typePopUp } = this.props

    Taggeo(
      `Web_Sign_Wall_${typePopUp}`,
      `web_sw${typePopUp[0]}_registro_error_registrarme`
    )
  }

  taggeoSuccess() {
    const { typePopUp } = this.props

    Taggeo(
      `Web_Sign_Wall_${typePopUp}`,
      `web_sw${typePopUp[0]}_registro_success_registrarme`
    )
  }

  render = () => {
    const {
      formErrors,
      showMessage,
      messageError,
      checkpwdStrength,
      checked,
      sending,
      showMsgConfirm,
    } = this.state
    const {
      closePopup,
      typePopUp,
      typeForm,
      brandCurrent,
      reloadRegister,
      arcSite,
    } = this.props

    return (
      <ModalConsumer>
        {val => (
          <div className="modal-body__wrapper">
            {!showMessage ? (
              <form
                className="form-grid"
                onSubmit={e => this.handleFormSubmit(e)}>
                <div className="form-grid__back">
                  <button
                    type="button"
                    id="registrar_link_volver"
                    onClick={() => {
                      Taggeo(
                        `Web_Sign_Wall_${typePopUp}`,
                        `web_sw${typePopUp[0]}_registro_link_volver`
                      )
                      val.changeTemplate('login')
                    }}
                    className="link-back">
                    <Icon.Back />
                    <span>Volver</span>
                  </button>
                </div>
                <h1 className="form-grid__title-login text-center mt-20 mb-10">
                  Accede fácilmente con:
                </h1>
                <div className="form-grid__group">
                  <div className="form-grid__row form-grid__row--two">
                    <AuthFacebook
                      // align="middle"
                      closePopup={closePopup}
                      id="registro_boton_facebook"
                      typePopUp={typePopUp}
                      typeForm={typeForm}
                      checkPremium={() => this.handleGetProfile()}
                    />
                    {/* <AuthGoogle
                      align="middle"
                      closePopup={closePopup}
                      id="registro_boton_google"
                      typePopUp={typePopUp}
                      typeForm={typeForm}
                    /> */}
                  </div>
                  <p className="form-grid__subtitle text-center mt-20 mb-10">
                    o completa tus datos para registrarte
                  </p>
                </div>
                <div className={`form-grid--error ${messageError && 'active'}`}>
                  {messageError}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="usernamereg"
                    className={
                      formErrors.usernamereg.length > 0
                        ? 'form-group__input form-group__input--error'
                        : 'form-group__input'
                    }
                    placeholder="Correo Electrónico*"
                    // eslint-disable-next-line no-return-assign
                    ref={usernamereg => (this.usernamereg = usernamereg)}
                    onChange={this.handleChangeValidation}
                    tabIndex="0"
                  />
                  {/* <label htmlFor="email" className="form-group__label">
                    Correo Electrónico
                  </label> */}
                  {formErrors.usernamereg.length > 0 && (
                    <span className="message__error">
                      {formErrors.usernamereg}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="passwordreg"
                    className={
                      formErrors.passwordreg.length > 0
                        ? 'form-group__input form-group__input--error'
                        : 'form-group__input'
                    }
                    placeholder="Contraseña*"
                    // eslint-disable-next-line no-return-assign
                    ref={passwordreg => (this.passwordreg = passwordreg)}
                    onChange={e => {
                      this.handleChangeValidation(e)
                      this.handleForcePassword(e)
                    }}
                    tabIndex="0"
                  />
                  
                  {/* <label htmlFor="password" className="form-group__label">
                    Contraseña
                  </label> */}

                  {formErrors.passwordreg.length > 0 && (
                    <span className="message__error">
                      {formErrors.passwordreg}
                    </span>
                  )}

                  <div className="password-security">
                    <div className="password-security__back" />
                    <div
                      className="password-security__front"
                      style={{ width: checkpwdStrength }}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="check-container">
                    <input
                      className="check-container__input"
                      type="checkbox"
                      name="termsConds"
                      defaultChecked={checked}
                      onChange={this.handleChangeValidation}
                      tabIndex="0"
                    />
                    Al crear la cuenta acepto los{' '}
                    <a
                      href={Domains.getPoliticsTerms('terms', arcSite)}
                      className="link-blue link-color"
                      target="_blank"
                      rel="noopener noreferrer">
                      Términos y Condiciones
                    </a>{' '}
                    y{' '}
                    <a
                      href={Domains.getPoliticsTerms('politics', arcSite)}
                      className="link-blue link-color"
                      target="_blank"
                      rel="noopener noreferrer">
                      Políticas de Privacidad
                    </a>
                    <span
                      className={
                        formErrors.ischecked.length > 0
                          ? 'check-container__checkmark check-container__checkmark--error'
                          : 'check-container__checkmark'
                      }
                    />
                  </label>

                  {formErrors.ischecked.length > 0 && (
                    <span className="message__error">
                      {formErrors.ischecked}
                    </span>
                  )}
                </div>
                <div className="form-grid__group">
                  <p className="form-grid__required mt-20 mb-20">
                    * TODOS LOS CAMPOS SON OBLIGATORIOS
                  </p>
                  <div className="form-group--center">
                    <input
                      type="submit"
                      id="registro_boton_registrarme"
                      className={
                        arcSite !== 'peru21'
                          ? 'btn input-button'
                          : 'btn btn-bg'
                      }
                      value={!sending ? 'Registrando...' : 'Registrarme'}
                      onClick={() =>
                        Taggeo(
                          `Web_Sign_Wall_${typePopUp}`,
                          `web_sw${typePopUp[0]}_registro_boton_registrarme`
                        )
                      }
                      disabled={!sending}
                    />
                  </div>
                </div>
              </form>
            ) : (
              <form className="form-grid">
                <div className="form-grid__group form-group--center">
                  <Icon.MsgRegister
                    className="form-grid__icon text-center"
                    bgcolor={
                      {
                        elcomercio: '#fecd26',
                        elcomerciomag: '#fecd26',
                        gestion: '#F4E0D2',
                        peru21: '#d5ecff',
                        peru21g21: '#d5ecff',
                        elbocon: '#fdabab',
                        depor: '#d5d945',
                        trome:'#ffede5',
                        ojo:'#e7fced',
                        diariocorreo: '#fdabab',
                      }[brandCurrent]
                    }
                  />
                </div>
                <div className="form-grid__group">
                  <h1 className="form-grid__info text-center">
                    {showMsgConfirm
                      ? 'Tu cuenta ya existe. solo falta un paso más'
                      : 'Tu cuenta ha sido creada correctamente'}
                  </h1>
                  {typePopUp !== 'premium' ? (
                    <p className="form-grid__info-sub text-center">
                      {showMsgConfirm
                        ? 'Revisa tu bandeja de correo para vincular tu cuenta'
                        : 'Revisa tu bandeja de correo para confirmar tu solicitud'}
                    </p>
                  ) : null}
                </div>
                <div className="form-grid__group">
                  <div className="form-group form-group--center mt-20">
                    {typePopUp === 'premium' ? (
                      <input
                        type="button"
                        id="registro_continuar_navegando"
                        className="btn btn-bg"
                        value="VER PLANES"
                        onClick={e => this.handleSuscription(e)}
                      />
                    ) : (
                      <input
                        type="button"
                        id="registro_continuar_navegando"
                        className="btn btn-bg"
                        value="Continuar Navegando"
                        onClick={() => {
                          Taggeo(
                            `Web_Sign_Wall_${typePopUp}`,
                            `web_sw${typePopUp[0]}_registro_continuar_navegando`
                          )
                          if (reloadRegister) {
                            window.location.reload()
                          } else {
                            closePopup()
                          }
                        }}
                      />
                    )}
                  </div>
                </div>
              </form>
            )}
          </div>
        )}
      </ModalConsumer>
    )
  }
}

export default FormRegister
