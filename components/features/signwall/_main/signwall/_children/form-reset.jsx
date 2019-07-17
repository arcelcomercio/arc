/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
// TODO Agregar excepcion a eslint
import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import * as Icon from '../../common/iconos'
import { strongRegularExp, mediumRegularExp } from '../../utils/regex'
import FormValid from '../../utils/form-valid'

@Consumer
class FormResetPass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newPassword: null,
      repeatPassword: null,
      checkpwdStrength: '0px',
      showMessage: false,
      formErrors: {
        newPassword: '',
        repeatPassword: '',
      },
      messageError: false,
    }
  }

  handleFormSubmit = e => {
    const {
      tokenReset,
      siteProperties: {
        signwall: { ORIGIN_API },
      },
    } = this.props

    const { newPassword, repeatPassword } = this.state

    e.preventDefault()
    if (FormValid(this.state)) {
      window.Identity.apiOrigin = ORIGIN_API
      window.Identity.resetPassword(tokenReset, newPassword)
        .then(() => {
          this.setState({
            showMessage: true,
          })
          // -- test de tageo success
          window.dataLayer.push({
            event: 'resetpass_success',
            // eventCategory: 'Web_Sign_Wall_Resetpass',
            // eventAction: 'web_resetpass_aceptar_success',
          })
          // -- test de tageo success
        })
        .catch(errReset => {
          this.setState({
            messageError:
              errReset.code === '300033'
                ? 'Enlace no encontrado o caducado'
                : errReset.message,
          })
          // -- test de tageo error
          window.dataLayer.push({
            event: 'resetpass_error',
            // eventCategory: 'Web_Sign_Wall_Resetpass',
            // eventAction: 'web_resetpass_aceptar_error',
          })
          // -- test de tageo error
        })
    } else {
      const { formErrors } = this.state
      if (newPassword === null) {
        formErrors.newPassword = 'Este campo es requerido'
        this.setState({ formErrors })
      }
      if (repeatPassword === null) {
        formErrors.repeatPassword = 'Este campo es requerido'
        this.setState({ formErrors })
      }
    }
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
    e.preventDefault()

    this.setState({ messageError: false })

    const { name, value } = e.target
    const { formErrors, newPassword } = this.state

    switch (name) {
      case 'newPassword':
        if (value.length === 0) {
          formErrors.newPassword = 'Este campo es requerido'
        } else if (value.length < 8) {
          formErrors.newPassword = 'Mínimo 8 caracteres'
        } else if (value.indexOf(' ') >= 0) {
          formErrors.newPassword = 'Contraseña inválida, no se permite espacios'
        } else {
          formErrors.newPassword = ''
        }
        break
      case 'repeatPassword':
        if (value.length === 0) {
          formErrors.repeatPassword = 'Este campo es requerido'
        } else if (newPassword === value) {
          formErrors.repeatPassword = ''
        } else {
          formErrors.repeatPassword = 'Tu contraseña no coincide'
        }
        break
      default:
        break
    }

    // this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    this.setState({ formErrors, [name]: value })
  }

  render() {
    const {
      formErrors,
      showMessage,
      messageError,
      checkpwdStrength,
    } = this.state
    const { closePopup, brandCurrent } = this.props

    return (
      <div className="modal-body__wrapper">
        {!showMessage ? (
          <form
            className="form-grid"
            noValidate
            onSubmit={e => this.handleFormSubmit(e)}>
            <div className="form-grid__reset-pass">
              <Icon.ResetPass
                className="form-grid__icon"
                bgcolor={brandCurrent === 'elcomercio' ? '#fecd26' : '#F4E0D2'}
              />
            </div>

            <h1 className="form-grid__info text-center">Cambiar contraseña</h1>
            <p className="form-grid__info-sub text-center">
              Ingresa una nueva contraseña para tu cuenta
            </p>

            <div className="form-grid__group">
              <div className={`form-grid--error ${messageError && 'active'}`}>
                {messageError === 'Error: Invalid username or password'
                  ? 'Correo Electrónico o Contraseña incorrecto'
                  : messageError}
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="newPassword"
                  className={
                    formErrors.newPassword.length > 0
                      ? 'form-group__input form-group__input--error'
                      : 'form-group__input'
                  }
                  placeholder="Nueva contraseña"
                  noValidate
                  onChange={e => {
                    this.handleChangeValidation(e)
                    this.handleForcePassword(e)
                  }}
                />
                <label htmlFor="newPassword" className="form-group__label">
                  Nueva contraseña
                </label>

                {formErrors.newPassword.length > 0 && (
                  <span className="message__error">
                    {formErrors.newPassword}
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
                <input
                  type="password"
                  name="repeatPassword"
                  className={
                    formErrors.repeatPassword.length > 0
                      ? 'form-group__input form-group__input--error'
                      : 'form-group__input'
                  }
                  placeholder="Confirmar contraseña"
                  noValidate
                  onChange={e => {
                    this.handleChangeValidation(e)
                  }}
                />
                <label htmlFor="repeatPassword" className="form-group__label">
                  Confirmar contraseña
                </label>
                {formErrors.repeatPassword.length > 0 && (
                  <span className="message__error">
                    {formErrors.repeatPassword}
                  </span>
                )}
              </div>

              <div className="form-group">
                <input
                  type="submit"
                  id="resetpass_boton_aceptar"
                  className="btn btn--blue btn-bg"
                  value="Aceptar"
                />
              </div>
            </div>
          </form>
        ) : (
          <form className="form-grid">
            <div className="form-grid__forgot-pass">
              <Icon.MsgResetPass
                className="icon-message"
                bgcolor={brandCurrent === 'elcomercio' ? '#fecd26' : '#F4E0D2'}
              />
            </div>

            <h1 className="form-grid__info text-center pt-40 pb-20">
              Tu contraseña ha sido actualizada
            </h1>

            <div className="form-grid__group">
              <div className="form-group">
                <input
                  type="button"
                  className="btn btn--blue btn-bg"
                  value="Ingresa a tu cuenta"
                  onClick={() => {
                    closePopup()
                    document.querySelector('#web_link_ingresacuenta').click()
                  }}
                />
              </div>
            </div>
          </form>
        )}
      </div>
    )
  }
}

export default FormResetPass
