/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
// TODO Agregar excepcion a eslint
import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import { emailRegex } from '../../utils/regex'
import FormValid from '../../utils/form-valid'
import * as Icon from '../../common/iconos'
import Services from '../../utils/services'
import Taggeo from '../../utils/taggeo'
import Domains from '../../utils/domains'
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
    this.origin_api = Domains.getOriginAPI(arcSite)
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
          this.taggeoSuccess() // -- test de tageo success
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
    const { arcSite } = this.props
    services
      .reloginEcoID(email, '', 'forgotpass', arcSite, window)
      .then(resEco => {
        if (resEco.retry) {
          setTimeout(() => {
            this.pushStatePass()
          }, 1000)
        } else {
          this.setState({
            messageError: 'Tu correo electrónico no está registrado.',
            sending: true,
          })
          this.taggeoError() // -- test de tageo error
        }
      })
      .catch(errEco => {
        window.console.error(errEco)
        this.setState({
          messageError: `Tu correo electrónico no está registrado.`,
          sending: true,
        })
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
        this.taggeoSuccess() // -- test de tageo success
      })
      .catch(errReForgot => {
        window.console.error(errReForgot)
        this.taggeoError() // -- test de tageo error
      })
  }

  taggeoSuccess() {
    const { typePopUp } = this.props

    Taggeo(
      `Web_Sign_Wall_${typePopUp}`,
      `web_sw${typePopUp[0]}_contrasena_success_boton`
    )
  }

  taggeoError() {
    const { typePopUp } = this.props

    Taggeo(
      `Web_Sign_Wall_${typePopUp}`,
      `web_sw${typePopUp[0]}_contrasena_error_boton`
    )
  }

  templateSendEmail(changeTemplate) {
    const { formErrors, messageError, sending } = this.state
    const { brandCurrent, typePopUp } = this.props

    return (
      <form
        className="form-grid"
        noValidate
        onSubmit={e => this.handleFormSubmit(e)}>
        <div className="form-grid__back">
          <button
            type="button"
            id="olvidepass_link_volver"
            onClick={() => {
              Taggeo(
                `Web_Sign_Wall_${typePopUp}`,
                `web_sw${typePopUp[0]}_contrasena_link_volver`
              )
              changeTemplate('login')
            }}
            className="link-back">
            <Icon.Back />
            <span>Volver</span>
          </button>
        </div>
        <div className="form-grid__forgot-pass">
          <Icon.ForgotPass
            className="form-grid__icon"
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

          <h1 className="form-grid__info">Olvidé mi contraseña</h1>
          <p className="form-grid__info-sub text-center mb-20">
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
              
              {/* <label htmlFor="email" className="form-group__label">
                Correo Electrónico
              </label> */}

              {formErrors.email.length > 0 && (
                <span className="message__error">{formErrors.email}</span>
              )}
            </div>
            <div className="form-group">
              <input
                type="submit"
                id="olvidepass_boton_enviar"
                className="btn btn-bg"
                value={!sending ? 'Enviando...' : 'Enviar'}
                onClick={() =>
                  Taggeo(
                    `Web_Sign_Wall_${typePopUp}`,
                    `web_sw${typePopUp[0]}_contrasena_boton_recuperar`
                  )
                }
                disabled={!sending}
              />
            </div>
          </div>
        </div>
      </form>
    )
  }

  templateSendedEmail(changeTemplate) {
    const { closePopup, brandCurrent, typePopUp, reloadForgot } = this.props
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
          <h1 className="form-grid__info">Correo enviado</h1>
          <p className="form-grid__info-sub text-center">
            Revisa tu correo electrónico para cambiar tu contraseña
          </p>
          <div className="form-grid__group">
            <div className="form-group">
              <input
                type="button"
                id="olvidepass_boton_aceptar"
                className="btn btn-bg"
                value="Aceptar"
                onClick={() => {
                  Taggeo(
                    `Web_Sign_Wall_${typePopUp}`,
                    `web_sw${typePopUp[0]}_contrasena_boton_aceptar`
                  )
                  if (reloadForgot) {
                    window.location.reload()
                  } else if(typePopUp ==='reloghash'){
                    changeTemplate('login')
                  }else{
                    closePopup()
                  }
                }}
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
