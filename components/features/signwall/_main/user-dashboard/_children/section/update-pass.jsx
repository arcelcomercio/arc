/* eslint-disable react/no-string-refs */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */

import React, { Component } from 'react'
import Modal from '../../../common/modal'
import FormValid from '../../../utils/form-valid'
import { Close } from '../../../common/iconos'
import { strongRegularExp, mediumRegularExp } from '../../../utils/regex'

class updatePassword extends Component {
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

  handleChangePassword = e => {
    const { newPassword, repeatPassword, formErrors } = this.state
    e.preventDefault()
    if (FormValid(this.state)) {
      this.setState({
        showModalConfirm: true,
      })

      const ModalProfile =
        document.querySelector('#arc-popup-profile').parentNode ||
        document.querySelector('#arc-popup-profile').parentElement
      ModalProfile.style.overflow = 'hidden'

      setTimeout(() => {
        const modalConfirmPass = document.querySelector(
          '#arc-popup-profile',
        );
        modalConfirmPass.scrollIntoView();
      }, 500);

    } else {
      // console.error('FORM INVALID', this.state.formErrors);
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

  submitConfirmPassword = e => {
    const { formErrorsConfirm, oldPassword, newPassword } = this.state
    e.preventDefault()

    formErrorsConfirm.oldPassword =
      oldPassword.length === 0 ? 'Este campo es requerido' : ''
    this.setState({ formErrorsConfirm })

    if (formErrorsConfirm.oldPassword === '') {
      this.setState({ sending: false })

      window.Identity.updatePassword(oldPassword, newPassword)
        .then(() => {
          this.setState({
            newPassword: null,
            repeatPassword: null,
            oldPassword: '',
            showModalConfirm: false,
            showMsgSuccess: true,
            sending: true,
          })
          // eslint-disable-next-line react/no-string-refs
          this.refs.newPassword.value = ''
          // eslint-disable-next-line react/no-string-refs
          this.refs.repeatPassword.value = ''
          setTimeout(() => {
            this.setState({
              showMsgSuccess: false,
            })
          }, 5000)
        })
        .catch(err => {
          this.setState({
            oldPassword: '',
            showModalConfirm: false,
            showMsgError: true,
            sending: true,
            MessageErrorPass:
              err.code === '300040'
                ? 'Ha ocurrido un error, Contraseña incorrecta'
                : 'Error inesperado',
          })
          setTimeout(() => {
            this.setState({
              showMsgError: false,
            })
          }, 5000)
        })

      const ModalProfile =
        document.querySelector('#arc-popup-profile').parentNode ||
        document.querySelector('#arc-popup-profile').parentElement
      ModalProfile.style.overflow = 'auto'
    }
  }

  changeValidationConfirm = e => {
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

  handleChangeValidation = e => {
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

    // this.setState({ formErrors, [name]: value }, () => console.log(this.state));
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

  togglePopupModalConfirm() {
    const { showModalConfirm } = this.state
    this.setState({
      showModalConfirm: !showModalConfirm,
    })

    const ModalProfile =
      document.querySelector('#arc-popup-profile').parentNode ||
      document.querySelector('#arc-popup-profile').parentElement
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
    return (
      <>
        <form
          className="form-grid"
          onSubmit={e => this.handleChangePassword(e)}
          autoComplete="off">
          <div className="form-grid__row">
            <h3 className="form-grid__title">Cambiar contraseña</h3>
            <div className="message">
              <p
                className={`message--success uppercase ${showMsgSuccess &&
                  'message--active'}`}>
                LA CONTRASEÑA HA SIDO ACTUALIZADA
              </p>
              <p
                className={`message--error uppercase ${showMsgError &&
                  'message--active'}`}>
                {MessageErrorPass}
              </p>
            </div>
          </div>
          <div className="form-grid__row form-grid__row--three">
            <div className="form-group">
              <div hidden>
                <input type="password" />
              </div>
              <input
                type="password"
                name="newPassword"
                ref="newPassword"
                className={
                  formErrors.newPassword.length > 0
                    ? 'form-group__input form-group__input--error'
                    : 'form-group__input'
                }
                placeholder="Nueva contraseña"
                noValidate
                maxLength="50"
                autoComplete="off"
                onChange={e => {
                  this.handleChangeValidation(e)
                  this.handleForcePassword(e)
                }}
              />
              <label htmlFor="pass1" className="form-group__label">
                Nueva contraseña
              </label>
              {formErrors.newPassword.length > 0 && (
                <span className="message__error">{formErrors.newPassword}</span>
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
                ref="repeatPassword"
                className={
                  formErrors.repeatPassword.length > 0
                    ? 'form-group__input form-group__input--error'
                    : 'form-group__input'
                }
                placeholder="Confirmar nueva contraseña "
                noValidate
                maxLength="50"
                autoComplete="off"
                onChange={e => {
                  this.handleChangeValidation(e)
                }}
              />
              <label htmlFor="repeatPassword" className="form-group__label">
                Confirmar nueva contraseña
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
                className="btn btn--blue btn-bg"
                value="Guardar Cambios"
              />
            </div>
          </div>
        </form>

        {showModalConfirm && (
          <Modal
            size="small"
            position="middle"
            bg="white"
            name="modal-div-confirmpass"
            id="modal-div-confirmpass">
            <div className="text-right">
              <button
                type="button"
                onClick={e => this.togglePopupModalConfirm(e)}>
                <Close />
              </button>
            </div>

            <div className="modal-body__wrapper">
              <form
                className="form-grid"
                onSubmit={e => this.submitConfirmPassword(e)}>
                <div className="row-grid">
                  <p className="form-grid__label form-grid__label--information text-center">
                    Para confirmar el cambio, por favor ingresa tu contraseña
                    actual
                  </p>
                </div>
                <div className="row-grid">
                  <div className="form-group">
                    <input
                      type="password"
                      name="oldPassword"
                      className={
                        formErrorsConfirm.oldPassword.length > 0
                          ? 'form-group__input form-group__input--error'
                          : 'form-group__input'
                      }
                      placeholder="Contraseña Actual"
                      noValidate
                      onChange={e => {
                        this.setState({ oldPassword: e.target.value })
                        this.changeValidationConfirm(e)
                      }}
                    />
                    <label htmlFor="oldPassword" className="form-group__label">
                      Contraseña actual
                    </label>
                    {formErrorsConfirm.oldPassword.length > 0 && (
                      <span className="message__error">
                        {formErrorsConfirm.oldPassword}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <input
                      type="submit"
                      className="btn btn--blue btn-bg"
                      value={!sending ? 'Confirmando...' : 'Confirmar'}
                      disabled={!sending}
                    />
                  </div>
                </div>
              </form>
            </div>
          </Modal>
        )}
      </>
    )
  }
}

export default updatePassword
