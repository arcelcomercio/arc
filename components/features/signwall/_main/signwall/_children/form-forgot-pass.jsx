/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
// TODO Agregar excepcion a eslint
import React, { Component } from 'react'

import { emailRegex } from '../../utils/regex'
import FormValid from '../../utils/form-valid'
import * as Icon from '../../common/iconos'
import Services from '../../utils/services'
import { ModalConsumer } from '../context'

const Brand = 'gestion'
const services = new Services()

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
  }

  handleFormSubmit = e => {
    const { formErrors, useremail } = this.state
    e.preventDefault()
    if (FormValid(this.state)) {
      this.setState({ sending: false })
      window.Identity.requestResetPassword(useremail)
        .then(() => {
          this.setState({
            showMessage: true,
            sending: true,
          })
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
        }
      })
      .catch(errEco => {
        console.log(errEco)
      })
  }

  pushStatePass() {
    const { useremail } = this.state
    window.Identity.requestResetPassword(useremail)
      .then(() => {
        this.setState({
          showMessage: true,
          sending: true,
        })
      })
      .catch(errReForgot => {
        console.log(errReForgot)
      })
  }

  templateSendEmail(changeTemplate) {
    const { formErrors, messageError, sending } = this.state

    return (
      <form
        className="form-grid"
        noValidate
        onSubmit={e => this.handleFormSubmit(e)}>
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
          <Icon.ForgotPass
            className="form-grid__icon"
            bgcolor={Brand === 'elcomercio' ? '#fecd26' : '#F4E0D2'}
          />
          <h1 className="form-grid__info">Olvidé mi contraseña</h1>
          <p className="form-grid__info-sub text-center">
            Ingresa tu correo electrónico para cambiar tu contraseña
          </p>
          <div className="form-grid__group">
            <div className="form-grid--error" hidden={!messageError}>
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
    const { closePopup } = this.props
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
            className="form-grid__icon"
            bgcolor={Brand === 'elcomercio' ? '#fecd26' : '#F4E0D2'}
          />
          <h1 className="form-grid__info">Correo enviado</h1>
          <p className="form-grid__info-sub text-center">
            Revisa tu correo electrónico para cambiar tu contraseña
          </p>
          <div className="form-grid__group">
            <div className="form-group">
              <input
                type="button"
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
