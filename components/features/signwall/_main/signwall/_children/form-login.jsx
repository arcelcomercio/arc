/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import { sha256 } from 'js-sha256'
import FormValid from '../../utils/form-valid'
import * as Icon from '../../common/iconos'
import ListBenefits from './benefits'
import AuthFacebook from './social-auths/auth-facebook'
import Cookie from '../../utils/cookie'
import { emailRegex } from '../../utils/regex'
import Services from '../../utils/services'
import Taggeo from '../../utils/taggeo'
import Domains from '../../utils/domains'
import { ModalConsumer } from '../context'

const Cookies = new Cookie()
const services = new Services()

const signwallSimple = [
  'peru21g21',
  'peru21',
  'elbocon',
  'depor',
  'trome',
  'ojo',
  'diariocorreo',
]
@Consumer
class FormLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hiddenEnterUser: false,
      hiddenListBenefits: true,
      hiddenbutton: true,
      showSocialButtons: false,
      hiddenPass: true,
      email: null,
      password: null,
      formErrors: {
        email: '',
        password: '',
      },
      messageError: false,
      sending: true,
      showCheckPremium: false,
      userWithSubs: false,
    }

    const { arcSite } = this.props
    this.origin_api = Domains.getOriginAPI(arcSite)
  }

  componentWillMount() {
    window.Identity.apiOrigin = this.origin_api
  }

  getListSubs() {
    const { arcSite } = this.props
    const W = window
    return W.Identity.extendSession().then(resExt => {
      const checkEntitlement = services
        .getEntitlement(resExt.accessToken, arcSite)
        .then(res => {
          if (res.skus) {
            const result = Object.keys(res.skus).map(key => {
              return res.skus[key].sku
            })
            this.listSubs = result
            return result
          }
          return []
        })
        .catch(err => W.console.error(err))

      return checkEntitlement
    })
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
          Cookies.deleteCookie('mpp_sess')

          this.taggeoSuccess() // -- test de tageo success
        })
        .catch(errLogin => {
          let messageES = ''
          const { typePopUp, arcSite } = this.props

          switch (errLogin.code) {
            case '300037':
            case '300040':
              // aqui va el api de Guido:
              services
                .reloginEcoID(
                  email,
                  password,
                  typePopUp === 'organico' ? 'organico' : '1',
                  arcSite,
                  window
                )
                .then(resEco => {
                  if (resEco.retry) {
                    setTimeout(() => {
                      window.Identity.apiOrigin = this.origin_api
                      window.Identity.login(email, password, {
                        rememberMe: true,
                        cookie: true,
                      })
                        .then(() => {
                          this.setState({ sending: true })
                          this.handleGetProfile()
                          // delete cookie mpp_sess
                          Cookies.deleteCookie('mpp_sess')

                          this.taggeoSuccess() // -- test de tageo success
                        })
                        .catch(errReLogin => {
                          messageES = errReLogin

                          this.taggeoError() // -- test de tageo error
                        })
                    }, 1000)
                  } else {
                    this.setState({
                      messageError:
                        'Correo electrónico y/o  contraseña incorrecta.',
                      sending: true,
                    })

                    this.taggeoError() // -- test de tageo error
                  }
                })
                .catch(errEco => {
                  window.console.error(errEco)
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

          if (messageES !== '') {
            this.setState({
              messageError:
                messageES === 'Failed to fetch'
                  ? 'Oops. Ocurrió un error inesperado.'
                  : messageES,
              sending: true,
            })

            this.taggeoError() // -- test de tageo error
          }
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
    const { typePopUp, closePopup, arcSite } = this.props
    window.Identity.apiOrigin = this.origin_api
    window.Identity.getUserProfile().then(resProfile => {
      Cookies.setCookie('arc_e_id', sha256(resProfile.email), 365)
      Cookies.deleteCookie('mpp_sess')
      // window.localStorage.setItem('ArcId._ID', resProfile.uuid)

      // set token cookie
      const USER_IDENTITY = JSON.stringify(window.Identity.userIdentity || {})
      Cookies.setCookieDomain('ArcId.USER_INFO', USER_IDENTITY, 1, arcSite)

      if (typePopUp === 'premium') {
        this.setState({
          showCheckPremium: true, // no tengo subs
        })
        this.getListSubs().then(p => {
          if (p && p.length === 0) {
            this.setState({
              userWithSubs: false, // no tengo subs
            })
          } else {
            this.setState({
              userWithSubs: true, // tengo subs
            })
          }
        })
      } else {
        closePopup()
      }
    })
  }

  handleLoginClick = () => {
    this.setState({
      hiddenEnterUser: true,
      hiddenbutton: false,
    })

    if (window.innerWidth < 1024) {
      this.setState({
        showSocialButtons: true,
      })
    }
  }

  toggleShowHidePass = () => {
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
    const { name, value } = e.target
    const { formErrors } = this.state

    if (name === 'email') {
      const isValidEmail = emailRegex.test(value)
        ? ''
        : 'Correo Electrónico Inválido'
      formErrors.email =
        value.length === 0 ? 'Este campo es requerido' : isValidEmail
    } else if (name === 'password') {
      const trimSpace = value.includes(' ')
        ? 'Contraseña inválida, no se permite espacios'
        : ''
      const isValidPass = value.length < 8 ? 'Mínimo 8 caracteres' : trimSpace
      formErrors.password =
        value.length === 0 ? 'Este campo es requerido' : isValidPass
    }
    this.setState({
      messageError: false,
      formErrors,
      [name]: value,
    })
  }

  handleLoginBackSocial = () => {
    this.setState({
      hiddenEnterUser: false,
      hiddenbutton: true,
      showSocialButtons: false,
    })
  }

  hanbleShowListBenefits = () => {
    const { hiddenListBenefits } = this.state
    this.setState({
      hiddenListBenefits: !hiddenListBenefits,
    })
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

  taggeoSuccess() {
    const { typePopUp } = this.props

    Taggeo(
      `Web_Sign_Wall_${typePopUp}`,
      `web_sw${typePopUp[0]}_login_success_ingresar`
    )
  }

  taggeoError() {
    const { typePopUp } = this.props

    Taggeo(
      `Web_Sign_Wall_${typePopUp}`,
      `web_sw${typePopUp[0]}_login_error_ingresar`
    )
  }

  render = () => {
    const {
      formErrors,
      showSocialButtons,
      hiddenListBenefits,
      hiddenEnterUser,
      messageError,
      hiddenPass,
      sending,
      hiddenbutton,
      showCheckPremium,
      userWithSubs,
    } = this.state
    const { closePopup, typePopUp, typeForm, arcSite } = this.props
    return (
      <ModalConsumer>
        {value => (
          <div className="modal-body__wrapper">
            {!showCheckPremium ? (
              <form
                className="form-grid"
                noValidate
                onSubmit={e => this.handleFormSubmit(e)}>
                <div
                  className="form-grid__group"
                  hidden={!showSocialButtons || !hiddenListBenefits}>
                  <div className="form-grid__back">
                    <button
                      type="button"
                      onClick={e => this.handleLoginBackSocial(e)}
                      className="link-back">
                      <Icon.Back />
                      <span>Volver</span>
                    </button>
                  </div>
                </div>

                <div className="form-grid__group" hidden={hiddenListBenefits}>
                  <div className="form-grid__back">
                    <button
                      type="button"
                      onClick={e => this.hanbleShowListBenefits(e)}
                      className="link-back">
                      <Icon.Back />
                      <span>Volver</span>
                    </button>
                  </div>
                  <ListBenefits brandCurrent={arcSite} />
                </div>

                <div className="form-grid__group" hidden={!hiddenListBenefits}>
                  {signwallSimple.includes(arcSite) ? null : (
                    <h1
                      className="form-grid__title-big text-center lg:hidden"
                      hidden={hiddenEnterUser}>
                      Regístrate y mantente siempre informado con las noticias
                      más relevantes del Perú y el mundo
                    </h1>
                  )}

                  {!showSocialButtons && (
                    <>
                      <div className="row-grid form-group col-center">
                        <p className="form-grid__link text-center mt-20 mb-20">
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
                            checkPremium={() => this.handleGetProfile()}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {hiddenEnterUser && (
                    <div className="form-grid__group mt-30">
                      <p className="form-grid__link text-center mb-20 col-center">
                        O ingresa con tu usuario
                      </p>

                      <div
                        className={`form-grid--error ${messageError &&
                          'active'}`}>
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
                        />
                        {/* <label htmlFor="email" className="form-group__label">
                          Correo Electrónico
                        </label> */}

                        {formErrors.email.length > 0 && (
                          <span className="message__error">
                            {formErrors.email}
                          </span>
                        )}
                      </div>

                      <div className="form-group row-pass">
                        <input
                          type={hiddenPass ? 'password' : 'text'}
                          name="password"
                          id="password"
                          className={
                            formErrors.password.length > 0
                              ? 'form-group__input form-group__input--error'
                              : 'form-group__input'
                          }
                          placeholder="Contraseña"
                          noValidate
                          onChange={this.handleChangeValidation}
                        />
                        <input
                          type="button"
                          onClick={e => this.toggleShowHidePass(e)}
                          className={
                            hiddenPass
                              ? 'row-pass__btn row-pass--hide'
                              : 'row-pass__btn row-pass--show'
                          }
                        />

                        {/* <label htmlFor="password" className="form-group__label">
                          Contraseña
                        </label> */}

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
                            className={
                              arcSite !== 'peru21'
                                ? 'link-gray'
                                : 'link-blue link-color text-sm'
                            }>
                            Olvidé mi contraseña
                          </button>
                        </p>
                      </div>

                      <div className="form-group">
                        <input
                          type="submit"
                          name="ingresar"
                          id="login_boton_ingresar"
                          className={
                            arcSite !== 'peru21'
                              ? 'btn input-button'
                              : 'btn btn-bg'
                          }
                          value={!sending ? 'Ingresando...' : 'Iniciar Sesión'}
                          onClick={() =>
                            Taggeo(
                              `Web_Sign_Wall_${typePopUp}`,
                              `web_sw${typePopUp[0]}_login_boton_ingresar`
                            )
                          }
                          disabled={!sending}
                        />
                      </div>
                    </div>
                  )}

                  {hiddenbutton && (
                    <div className="form-grid__group">
                      <button
                        onClick={e => {
                          this.handleLoginClick(e)
                          Taggeo(
                            `Web_Sign_Wall_${typePopUp}`,
                            `web_sw${typePopUp[0]}_open_login_boton_ingresar`
                          )
                        }}
                        type="button"
                        name="enterUserName"
                        id="open_login_boton_ingresar"
                        className="btn btn-email">
                        <Icon.Mail />
                        <span>Ingresa con tu usuario</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="form-grid__group">
                  <p className="form-grid__link text-center text-sm pt-20 pb-20">
                    ¿Aún no tienes una cuenta?
                    <button
                      type="button"
                      id="login_boton_registrate"
                      onClick={() => {
                        Taggeo(
                          `Web_Sign_Wall_${typePopUp}`,
                          `web_sw${typePopUp[0]}_login_boton_registrate`
                        )
                        value.changeTemplate('register')
                      }}
                      className="link-blue link-color text-sm">
                      Regístrate
                    </button>
                  </p>
                  <p className="form-grid__subtitle form-grid__subtitle--fb text-center mt-10">
                    Con tus datos, mejoraremos tu experiencia de <br />{' '}
                    navegación y nunca publicaremos sin tu permiso
                  </p>
                </div>
                {signwallSimple.includes(arcSite) ? null : (
                  <div
                    className="form-grid__group lg:hidden mt-20"
                    hidden={!hiddenListBenefits}>
                    {typePopUp !== 'paywall' && (
                      <p className="form-grid__subtitle text-center form-group--center">
                        <button
                          type="button"
                          onClick={e => this.hanbleShowListBenefits(e)}
                          className="link-blue link-color">
                          Conoce aquí los beneficios de registrarte
                        </button>
                      </p>
                    )}
                  </div>
                )}
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
                      }[arcSite]
                    }
                  />
                </div>

                <div className="form-grid__group">
                  <h1 className="form-grid__info text-center">
                    Bienvenido{' '}
                    {window.Identity.userProfile.firstName || 'Usuario'}
                  </h1>
                  <p className="form-grid__info-sub text-center">
                    {userWithSubs
                      ? 'Sigue disfrutando del contenido exclusivo que tenemos para ti'
                      : 'Ahora puedes continuar con tu compra'}
                  </p>
                </div>

                <div className="form-grid__group">
                  <div className="form-group form-group--center mt-20">
                    {userWithSubs ? (
                      <input
                        type="button"
                        className="btn btn-bg"
                        value="SIGUE NAVEGANDO"
                        onClick={() => {
                          Taggeo(
                            `Web_${typePopUp}_Hard`,
                            `web_${typePopUp}_boton_sigue_navegando`
                          )
                          if (
                            window.sessionStorage.hasOwnProperty(
                              'paywall_last_url'
                            ) &&
                            window.sessionStorage.getItem(
                              'paywall_last_url'
                            ) !== ''
                          ) {
                            window.location.href = window.sessionStorage.getItem(
                              'paywall_last_url'
                            )
                          } else {
                            closePopup()
                          }
                        }}
                      />
                    ) : (
                      <input
                        type="button"
                        className="btn btn-bg"
                        value="VER PLANES"
                        onClick={e => this.handleSuscription(e)}
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

export default FormLogin
