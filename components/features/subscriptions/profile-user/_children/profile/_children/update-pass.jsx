/* eslint-disable react/no-string-refs */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import Identity from '@arc-publishing/sdk-identity'
import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

import { Close } from '../../../../../signwall/_children/icons'
import { Modal } from '../../../../../signwall/_children/modal/index'
import FormValid from '../../../../../signwall/_dependencies/form-valid'
import {
  mediumRegularExp,
  strongRegularExp,
} from '../../../../_dependencies/Regex'

@Consumer
class UpdatePassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkpwdStrength: '0px',
      newPassword: null,
      repeatPassword: null,
      oldPassword: '',
      showModalConfirm: false,
      showMsgSuccess: false,
      showMsgError: false,
      MessageErrorPass: '',
      formErrors: {
        newPassword: '',
        repeatPassword: '',
      },
      formErrorsConfirm: {
        oldPassword: '',
      },
      sending: true,
    }
  }

  handleChangePassword = (e) => {
    const { newPassword, repeatPassword, formErrors } = this.state
    e.preventDefault()
    if (FormValid(this.state)) {
      this.setState({
        showModalConfirm: true,
      })

      const ModalProfile =
        document.getElementById('profile-signwall').parentNode ||
        document.getElementById('profile-signwall').parentElement
      ModalProfile.style.overflow = 'hidden'
    } else {
      if (newPassword == null) {
        formErrors.newPassword = 'Este campo es requerido'
        this.setState({ formErrors })
      }
      if (repeatPassword == null) {
        formErrors.repeatPassword = 'Este campo es requerido'
        this.setState({ formErrors })
      }
    }
  }

  handleChangeValidation = (e) => {
    e.preventDefault()
    this.setState({ messageError: false })
    const { name, value } = e.target
    const { formErrors, newPassword } = this.state
    if (name === 'newPassword') {
      const space =
        value.indexOf(' ') >= 0
          ? 'Contraseña inválida, no se permite espacios'
          : ''
      const min = value.length < 8 ? 'Mínimo 8 caracteres' : space
      formErrors.newPassword =
        value.length === 0 ? 'Este campo es requerido' : min
    } else if (name === 'repeatPassword') {
      const same = newPassword === value ? '' : 'Tu contraseña no coincide'
      formErrors.repeatPassword =
        value.length === 0 ? 'Este campo es requerido' : same
    }

    this.setState({ formErrors, [name]: value })
  }

  handleForcePassword(e) {
    const { value } = e.target

    if (strongRegularExp.test(value)) {
      this.setState({ checkpwdStrength: '40px' })
    } else if (mediumRegularExp.test(value)) {
      this.setState({ checkpwdStrength: '20px' })
    } else if (value.length >= '3') {
      this.setState({ checkpwdStrength: '10px' })
    } else {
      this.setState({ checkpwdStrength: '0px' })
    }
  }

  changeValidationConfirm = (e) => {
    const { name, value } = e.target
    const { formErrorsConfirm } = this.state
    const space =
      value.indexOf(' ') >= 0
        ? 'Contraseña inválida, no se permite espacios'
        : ''
    const min = value.length < 8 ? 'Mínimo 8 caracteres' : space
    formErrorsConfirm.oldPassword =
      value.length === 0 ? 'Este campo es requerido' : min
    this.setState({ formErrorsConfirm, [name]: value })
  }

  submitConfirmPassword = (e) => {
    const { formErrorsConfirm, oldPassword, newPassword } = this.state
    e.preventDefault()

    formErrorsConfirm.oldPassword =
      oldPassword.length === 0 ? 'Este campo es requerido' : ''
    this.setState({ formErrorsConfirm })

    if (typeof window !== 'undefined' && formErrorsConfirm.oldPassword === '') {
      this.setState({ sending: false })

      Identity.updatePassword(oldPassword, newPassword)
        .then(() => {
          this.setState({
            newPassword: null,
            repeatPassword: null,
            oldPassword: '',
            showModalConfirm: false,
            showMsgSuccess: true,
            sending: true,
          })
          this.refs.newPassword.value = ''
          this.refs.repeatPassword.value = ''
          setTimeout(() => {
            this.setState({
              showMsgSuccess: false,
            })
          }, 5000)
        })
        .catch((err) => {
          this.setState({
            oldPassword: '',
            showModalConfirm: false,
            showMsgError: true,
            sending: true,
            MessageErrorPass:
              err.code === '300040'
                ? 'Ha ocurrido un error. Contraseña incorrecta'
                : 'Error inesperado',
          })
          setTimeout(() => {
            this.setState({
              showMsgError: false,
            })
          }, 5000)
        })

      const ModalProfile =
        document.getElementById('profile-signwall').parentNode ||
        document.getElementById('profile-signwall').parentElement
      ModalProfile.style.overflow = 'auto'
    }
  }

  togglePopupModalConfirm() {
    const { showModalConfirm } = this.state
    this.setState({
      showModalConfirm: !showModalConfirm,
    })

    const ModalProfile =
      document.getElementById('profile-signwall').parentNode ||
      document.getElementById('profile-signwall').parentElement
    if (showModalConfirm) {
      ModalProfile.style.overflow = 'auto'
    } else {
      ModalProfile.style.overflow = 'hidden'
    }
  }

  render() {
    const { formErrors } = this.state
    const {
      formErrorsConfirm,
      showMsgSuccess,
      showMsgError,
      MessageErrorPass,
      checkpwdStrength,
      showModalConfirm,
      sending,
    } = this.state
    const {
      siteProperties: {
        signwall: { mainColorBtn, mainColorLink },
      },
    } = this.props
    return (
      <>
        <form
          className="sign-profile_update-form-grid"
          onSubmit={(e) => this.handleChangePassword(e)}
          autoComplete="off">
          <div className="row">
            <h3 className="title">Cambiar contraseña</h3>
          </div>

          {showMsgSuccess && (
            <div className="sign-profile_update-message sign-profile_update-message-success">
              Tu contraseña ha sido actualizada correctamente.
            </div>
          )}
          {showMsgError && (
            <div className="sign-profile_update-message sign-profile_update-message-failed">
              {MessageErrorPass}
            </div>
          )}

          <div className="row three">
            <div className="sign-profile_update-form-group">
              <div hidden>
                <input type="password" />
              </div>
              <input
                type="password"
                autoComplete="new-password"
                name="newPassword"
                ref="newPassword"
                className={
                  formErrors.newPassword.length > 0 ? 'input error' : 'input'
                }
                placeholder="Nueva contraseña"
                noValidate
                maxLength="50"
                onChange={(e) => {
                  this.handleChangeValidation(e)
                  this.handleForcePassword(e)
                }}
              />
              <label htmlFor="pass1" className="label">
                Nueva contraseña
              </label>
              {formErrors.newPassword.length > 0 && (
                <span className="error">{formErrors.newPassword}</span>
              )}
              <div className="password-security">
                <div className="password-security__back" />
                <div
                  className="password-security__front"
                  style={{ width: checkpwdStrength }}
                />
              </div>
            </div>
            <div className="sign-profile_update-form-group">
              <input
                type="password"
                name="repeatPassword"
                ref="repeatPassword"
                className={
                  formErrors.repeatPassword.length > 0 ? 'input error' : 'input'
                }
                placeholder="Confirmar nueva contraseña "
                noValidate
                maxLength="50"
                autoComplete="off"
                onChange={(e) => {
                  this.handleChangeValidation(e)
                }}
              />
              <label htmlFor="repeatPassword" className="label">
                Confirmar nueva contraseña
              </label>
              {formErrors.repeatPassword.length > 0 && (
                <span className="error">{formErrors.repeatPassword}</span>
              )}
            </div>
            <div className="sign-profile_update-form-group">
              <button
                className="signwall-inside_forms-btn"
                style={{ color: mainColorBtn, backgroundColor: mainColorLink }}
                type="submit">
                GUARDAR CAMBIOS
              </button>
            </div>
          </div>
        </form>

        {showModalConfirm && (
          <Modal size="mini" position="middle" bgColor="white">
            <button
              className="close-modal"
              type="button"
              onClick={(e) => this.togglePopupModalConfirm(e)}>
              <Close />
            </button>

            <form
              className="sign-profile_update-form-grid"
              onSubmit={(e) => this.submitConfirmPassword(e)}>
              <p
                style={{
                  lineHeight: '28px',
                  marginTop: '20px',
                }}
                className="signwall-inside_forms-text mt-10 mb-10 center">
                Para confirmar el cambio, por favor ingresa tu contraseña actual
              </p>

              <div
                className="sign-profile_update-form-group"
                style={{
                  width: '100%',
                  margin: '10px 0px',
                }}>
                <input
                  type="password"
                  name="oldPassword"
                  className={
                    formErrorsConfirm.oldPassword.length > 0
                      ? 'input error'
                      : 'input'
                  }
                  placeholder="Contraseña Actual"
                  noValidate
                  maxLength="50"
                  autoComplete="off"
                  onChange={(e) => {
                    this.setState({ oldPassword: e.target.value })
                    this.changeValidationConfirm(e)
                  }}
                />
                <label htmlFor="oldPassword" className="label">
                  Contraseña actual
                </label>
                {formErrorsConfirm.oldPassword.length > 0 && (
                  <span className="error">{formErrorsConfirm.oldPassword}</span>
                )}
              </div>

              <button
                className="signwall-inside_forms-btn"
                type="submit"
                disabled={!sending}
                style={{ color: mainColorBtn, backgroundColor: mainColorLink }}>
                {!sending ? 'CONFIRMANDO...' : 'CONFIRMAR'}
              </button>
            </form>
          </Modal>
        )}
      </>
    )
  }
}

export default UpdatePassword
