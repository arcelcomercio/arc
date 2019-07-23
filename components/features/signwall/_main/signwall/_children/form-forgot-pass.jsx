/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
// TODO Agregar excepcion a eslint
import React, { Component } from 'react'
import ENV from 'fusion:environment'
import Consumer from 'fusion:consumer'
import { emailRegex } from '../../utils/regex'
import FormValid from '../../utils/form-valid'
import * as Icon from '../../common/iconos'
import Services from '../../utils/services'
import { ModalConsumer } from '../context'

const services = new Services()

@Consumer
class FormForgotPass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      useremail: null,
      formErrors: {
        email: '',
      },
      messageError: false,
      showMessage: false,
      sending: true,
    }

    const { arcSite } = this.props
    this.origin_api =
      ENV.ENVIRONMENT === 'elcomercio'
        ? `https://api.${arcSite}.pe`
        : `https://api-sandbox.${arcSite}.pe`

    const { typePopUp, typeForm } = this.props
    this.tipCat = typePopUp
    this.tipAct = typePopUp ? `web_sw${typePopUp.slice(0, 1)}` : ''
    this.tipForm = typeForm
    // console.log(this.tipCat, this.tipAct, this.tipForm)
  }

  componentWillMount() {
    window.Identity.apiOrigin = this.origin_api
  }

  handleFormSubmit = e => {
    e.preventDefault()
    const { formErrors, useremail } = this.state

    if (FormValid(this.state)) {
      this.setState({ sending: false })
      window.Identity.apiOrigin = this.origin_api
      window.Identity.requestResetPassword(useremail)
        .then(() => {
          this.setState({
            showMessage: true,
            sending: true,
          })
          // -- test de tageo success
          if (this.tipCat === 'relogemail') {
            window.dataLayer.push({
              event: 'olvidepass_sucess',
              eventCategory: 'Web_Sign_Wall_Relog_Email',
              eventAction: 'web_relog_email_contrasena_success_boton',
            })
          } else {
            window.dataLayer.push({
              event: 'olvidepass_sucess',
              eventCategory: `Web_Sign_Wall_${
                this.tipCat === 'relogin' ? 'Relogueo' : this.tipCat
              }`,
              eventAction: `${
                this.tipAct === 'web_swr' ? 'web_relog' : this.tipAct
              }_contrasena_success_boton`,
            })
          }
          // -- test de tageo success
        })
        .catch(errForgot => {
          let messageES = ''
          if (errForgot.code === '300030') this.sendEmail(useremail)
          else messageES = errForgot.message
          this.setState({ messageError: messageES, sending: true })
        })
    } else if (useremail === null) {
      formErrors.email = 'Este campo es requerido'
      this.setState({ formErrors, email: '' })
    }
  }

  handleChangeValidation = e => {
    const { name, value } = e.target
    const { formErrors } = this.state
    const isValidEmail = emailRegex.test(value)
      ? ''
      : 'Correo Electrónico Inválido'
    if (name === 'useremail') {
      formErrors.email =
        value.length === 0 ? 'Este campo es requerido' : isValidEmail
    }
    this.setState({
      formErrors,
      [name]: value,
      messageError: false,
    })
  }

  sendEmail(email) {
    services
      .reloginEcoID(email, '', 'forgotpass', window)
      .then(resEco => {
        if (resEco.retry) {
          this.pushStatePass()
        } else {
          this.setState({
            messageError: 'Tu correo electrónico no está registrado.',
            sending: true,
          })
          // -- test de tageo error
          if (this.tipCat === 'relogemail') {
            window.dataLayer.push({
              event: 'olvidepass_error',
              eventCategory: 'Web_Sign_Wall_Relog_Email',
              eventAction: 'web_relog_email_contrasena_error_boton',
            })
          } else {
            window.dataLayer.push({
              event: 'olvidepass_error',
              eventCategory: `Web_Sign_Wall_${
                this.tipCat === 'relogin' ? 'Relogueo' : this.tipCat
              }`,
              eventAction: `${
                this.tipAct === 'web_swr' ? 'web_relog' : this.tipAct
              }_contrasena_error_boton`,
            })
          }
          // -- test de tageo error
        }
      })
      .catch(errEco => {
        console.error(errEco)
        this.setState({
          messageError: `Tu correo electrónico no está registrado.`,
          sending: true,
        });
      })
  }

  pushStatePass() {
    const { useremail } = this.state
    window.Identity.apiOrigin = this.origin_api
    window.Identity.requestResetPassword(useremail)
      .then(() => {
        this.setState({
          showMessage: true,
          sending: true,
        })
        // -- test de tageo success
        if (this.tipCat === 'relogemail') {
          window.dataLayer.push({
            event: 'olvidepass_sucess',
            eventCategory: 'Web_Sign_Wall_Relog_Email',
            eventAction: 'web_relog_email_contrasena_success_boton',
          })
        } else {
          window.dataLayer.push({
            event: 'olvidepass_sucess', // organico_olvidepass_success, hard_olvidepass_success, relogin_olvidepass_success
            eventCategory: `Web_Sign_Wall_${
              this.tipCat === 'relogin' ? 'Relogueo' : this.tipCat
            }`,
            eventAction: `${
              this.tipAct === 'web_swr' ? 'web_relog' : this.tipAct
            }_contrasena_success_boton`,
          })
        }
        // -- test de tageo success
      })
      .catch(errReForgot => {
        console.error(errReForgot)
        // -- test de tageo error
        if (this.tipCat === 'relogemail') {
          window.dataLayer.push({
            event: 'olvidepass_error',
            eventCategory: 'Web_Sign_Wall_Relog_Email',
            eventAction: 'web_relog_email_contrasena_error_boton',
          })
        } else {
          window.dataLayer.push({
            event: 'olvidepass_error', // organico_olvidepass_error, hard_olvidepass_error, relogin_olvidepass_error
            eventCategory: `Web_Sign_Wall_${
              this.tipCat === 'relogin' ? 'Relogueo' : this.tipCat
            }`, // Web_Sign_Wall_organico, Web_Sign_Wall_hard, Web_Sign_Wall_relogin
            eventAction: `${
              this.tipAct === 'web_swr' ? 'web_relog' : this.tipAct
            }_contrasena_error_boton`, // web_swo_login_error_olvidepass, web_swh_login_error_olvidepass, web_swr_login_error_olvidepass
          })
        }
        // -- test de tageo error
      })
  }

  templateSendEmail(changeTemplate) {
    const { formErrors, messageError, sending } = this.state
    const { brandCurrent } = this.props

    return (
      <form
        className="form-grid"
        noValidate
        onSubmit={e => this.handleFormSubmit(e)}>
        <div className="form-grid__back">
          <button
            type="button"
            id="olvidepass_link_volver"
            onClick={() => changeTemplate('login')}
            className="link-back">
            <Icon.Back />
            <span>Volver</span>
          </button>
        </div>
        <div className="form-grid__forgot-pass">
          <Icon.ForgotPass
            className="form-grid__icon"
            bgcolor={brandCurrent === 'elcomercio' ? '#fecd26' : '#F4E0D2'}
          />

          <h1 className="form-grid__info">Olvidé mi contraseña</h1>
          <p className="form-grid__info-sub text-center">
            Ingresa tu correo electrónico para cambiar tu contraseña
          </p>

          <div className="form-grid__group">
            <div className={`form-grid--error ${messageError && 'active'}`}>
              {messageError}
            </div>
            <div className="form-group">
              <input
                type="email"
                name="useremail"
                className={
                  formErrors.email.length > 0
                    ? 'form-group__input form-group__input--error'
                    : 'form-group__input'
                }
                placeholder="Correo Electrónico"
                noValidate
                onChange={e => {
                  this.handleChangeValidation(e)
                }}
              />
              <label htmlFor="email" className="form-group__label">
                Correo Electrónico
              </label>
              {formErrors.email.length > 0 && (
                <span className="message__error">{formErrors.email}</span>
              )}
            </div>
            <div className="form-group">
              <input
                type="submit"
                id="olvidepass_boton_enviar"
                className="btn btn--blue btn-bg"
                value={!sending ? 'Enviando...' : 'Enviar'}
                disabled={!sending}
              />
            </div>
          </div>
        </div>
      </form>
    )
  }

  templateSendedEmail(changeTemplate) {
    const { closePopup, brandCurrent } = this.props
    return (
      <form className="form-grid">
        <div className="form-grid__back">
          <button
            type="button"
            onClick={() => changeTemplate('login')}
            className="link-back">
            <Icon.Back />
            <span>Volver</span>
          </button>
        </div>
        <div className="form-grid__forgot-pass">
          <Icon.MsgForgotPass
            className="icon-message"
            bgcolor={brandCurrent === 'elcomercio' ? '#fecd26' : '#F4E0D2'}
          />
          <h1 className="form-grid__info">Correo enviado</h1>
          <p className="form-grid__info-sub text-center">
            Revisa tu correo electrónico para cambiar tu contraseña
          </p>
          <div className="form-grid__group">
            <div className="form-group">
              <input
                type="button"
                id="olvidepass_boton_aceptar"
                className="btn btn--blue btn-bg"
                value="Aceptar"
                onClick={closePopup}
              />
            </div>
          </div>
        </div>
      </form>
    )
  }

  render = () => {
    const { showMessage } = this.state
    return (
      <ModalConsumer>
        {value => (
          <div className="modal-body__wrapper">
            {showMessage
              ? this.templateSendedEmail(value.changeTemplate)
              : this.templateSendEmail(value.changeTemplate)}
          </div>
        )}
      </ModalConsumer>
    )
  }
}

export default FormForgotPass
