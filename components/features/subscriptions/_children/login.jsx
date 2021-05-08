import PropTypes from 'prop-types'
import * as React from 'react'

import { AuthContext } from '../_context/auth'
import { NavigateConsumer } from '../_context/navigate'
import getCodeError, { formatEmail } from '../_dependencies/Errors'
import { PropertiesCommon } from '../_dependencies/Properties'
import { Taggeo } from '../_dependencies/Taggeo'
import { isFbBrowser } from '../_dependencies/Utils'
import useForm from '../_hooks/useForm'
import ButtonSocial from './social'

const styles = {
  title: 'step__left-title',
  blockMiddle: 'step__left-block-middle',
  titleLine: 'step__left-title-line',
  titleForgot: 'step__left-forgot-pass',
  block: 'step__left-block',
  blockFull: 'step__left-block-full',
  btnShow: 'step__left-btn-show',
  btn: 'step__left-btn-next',
  link: 'step__btn-link',
  titleRegister: 'step__left-link-register',
  noteEnd: 'step__left-notes-footer',
}

const nameTagCategory = 'Web_Sign_Wall_Landing'

const Login = ({ contTempl, arcSite, handleCallToAction, isFia }) => {
  const { activateAuth, updateStep } = React.useContext(AuthContext)
  const [loading, setLoading] = React.useState()
  const [msgError, setMsgError] = React.useState()
  const [showVerify, setShowVerify] = React.useState()
  const [showHidePass, setShowHidePass] = React.useState('password')
  const [showSendEmail, setShowSendEmail] = React.useState(false)
  const [checkedPolits, setCheckedPolits] = React.useState(true)
  const { texts } = PropertiesCommon

  const stateSchema = {
    lemail: { value: contTempl || '', error: '' },
    lpass: { value: '', error: '' },
  }

  const stateValidatorSchema = {
    lemail: {
      required: true,
      validator: formatEmail(),
    },
    lpass: {
      required: true,
      validator: {
        func: (value) => value.length >= 8,
        error: 'Mínimo 8 caracteres',
      },
      nospaces: true,
    },
  }

  const onFormSignIn = ({ lemail, lpass }) => {
    if (typeof window !== 'undefined') {
      setLoading(true)
      Taggeo(nameTagCategory, 'web_swl_login_boton_ingresar')
      window.Identity.login(lemail, lpass, {
        rememberMe: true,
        cookie: true,
      })
        .then(() => {
          window.Identity.getUserProfile().then((resProfile) => {
            if (
              !resProfile.emailVerified &&
              resProfile.displayName === resProfile.email
            ) {
              // bloquea hasta verificar email
              setLoading(false)
              setMsgError(getCodeError('130051'))
              setShowVerify(true)
              Taggeo(nameTagCategory, 'web_swl_login_show_reenviar_correo')
              window.localStorage.removeItem('ArcId.USER_INFO')
              window.localStorage.removeItem('ArcId.USER_PROFILE')
              window.Identity.userProfile = null
              window.Identity.userIdentity = {}
            } else {
              activateAuth(resProfile)
              updateStep(2)
              if (isFia) {
                handleCallToAction(true)
              }
              Taggeo(nameTagCategory, 'web_swl_login_success_ingresar')
            }
          })
        })
        .catch((err) => {
          setMsgError(getCodeError(err.code))
          setShowVerify(err.code === '130051')
          setLoading(false)
          if (err.code === '130051') {
            Taggeo(nameTagCategory, 'web_swl_login_show_reenviar_correo')
          } else {
            Taggeo(nameTagCategory, 'web_swl_login_error_ingresar')
          }
        })
    }
  }

  const {
    values: { lemail, lpass },
    errors: { lemail: lemailError, lpass: lpassError },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onFormSignIn)

  const handleChangeInput = (e) => {
    handleOnChange(e)
    setMsgError(false)
  }

  const toogleHidePass = () => {
    if (showHidePass === 'password') setShowHidePass('text')
    else setShowHidePass('password')
  }

  const sendVerifyEmail = () => {
    setShowSendEmail(true)
    window.Identity.requestVerifyEmail(lemail)
    Taggeo(nameTagCategory, 'web_swl_login_reenviar_correo')
    let timeleft = 9
    const downloadTimer = setInterval(() => {
      if (timeleft <= 0) {
        clearInterval(downloadTimer)
        setShowSendEmail(false)
      } else {
        const divCount = document.getElementById('countdown')
        if (divCount) divCount.innerHTML = ` ${timeleft} `
      }
      timeleft -= 1
    }, 1000)
  }

  const dataTreatment = () => {
    if (typeof window !== 'undefined') {
      window.open('/tratamiento-de-datos/', '_blank')
    }
  }

  const openPoliticas = () => {
    if (typeof window !== 'undefined') {
      window.open(
        (() => {
          switch (arcSite) {
            case 'elcomercio':
            case 'depor':
              return '/politicas-privacidad/'
            case 'gestion':
            case 'trome':
              return '/politica-de-privacidad/'
            default:
              return '/politicas-de-privacidad/'
          }
        })(),
        '_blank'
      )
    }
  }

  const triggerShowVerify = () => {
    setMsgError(getCodeError('verifySocial'))
    setShowVerify(false)
  }

  return (
    <NavigateConsumer>
      {(value) => (
        <>
          <h2 className={styles.title}>{texts.login}</h2>
          <div
            className={`${styles.blockMiddle} ${
              isFbBrowser() && styles.blockFull
            }`}>
            <ButtonSocial
              arcSocial="facebook"
              arcSite={arcSite}
              arcType="login"
              showMsgVerify={() => triggerShowVerify()}
              dataTreatment={checkedPolits ? '1' : '0'}
            />
            {!isFbBrowser() && (
              <ButtonSocial
                arcSocial="google"
                arcSite={arcSite}
                arcType="login"
                showMsgVerify={() => triggerShowVerify()}
                dataTreatment={checkedPolits ? '1' : '0'}
              />
            )}
          </div>
          <div className={styles.titleLine}>
            <p>{texts.orEnterDatesLog}</p>
          </div>
          {msgError && (
            <div className={styles.block}>
              <div className={showVerify ? ' msg-warning' : 'msg-alert'}>
                {` ${msgError} `}
                {showVerify && (
                  <>
                    <br />
                    {!showSendEmail ? (
                      <button
                        className="step__btn-link"
                        type="button"
                        onClick={sendVerifyEmail}>
                        {texts.reSendEmail}
                      </button>
                    ) : (
                      <span>
                        {texts.youCanSendEmail}
                        <strong id="countdown"> 10 </strong> segundos
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
          <form onSubmit={handleOnSubmit} className="form-login">
            <div className={styles.block}>
              <label htmlFor="lemail">
                Correo electrónico
                <input
                  className={lemailError && 'input-error'}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  name="lemail"
                  value={lemail}
                  required
                  onChange={handleChangeInput}
                  onBlur={handleOnChange}
                  maxLength="80"
                  disabled={loading}
                />
                {lemailError && (
                  <span className="msn-error">{lemailError}</span>
                )}
              </label>
            </div>

            <div className={styles.block}>
              <label htmlFor="lpass">
                Contraseña
                <input
                  className={lpassError && 'input-error'}
                  type={showHidePass}
                  autoComplete="current-password"
                  name="lpass"
                  value={lpass}
                  required
                  onChange={handleChangeInput}
                  maxLength="50"
                  onBlur={handleOnChange}
                  disabled={loading}
                />
                <button
                  name="lshowpass"
                  aria-label="lshowpass"
                  className={`${styles.btnShow}-${showHidePass}`}
                  type="button"
                  tabIndex={-1}
                  onClick={toogleHidePass}
                />
                {lpassError && <span className="msn-error">{lpassError}</span>}
              </label>
            </div>

            <p className={styles.titleForgot}>
              <button
                className={styles.link}
                type="button"
                onClick={() => {
                  value.changeTemplate('forgot')
                  Taggeo(nameTagCategory, 'web_swl_contrasena_link_olvide')
                }}>
                Olvidé mi contraseña
              </button>
            </p>

            <div className={styles.block}>
              <button
                className={`${styles.btn} ${loading && 'btn-loading'}`}
                type="submit"
                disabled={disable || loading}>
                {loading ? 'Cargando...' : 'Iniciar sesión'}
              </button>
            </div>
          </form>
          <p className={styles.titleRegister}>
            {texts.notHasAccount}
            <button
              className={styles.link}
              type="button"
              onClick={() => {
                value.changeTemplate('register')
                Taggeo(nameTagCategory, 'web_swl_login_boton_registrate')
              }}>
              Registrarme
            </button>
          </p>
          <div className={styles.block}>
            <label htmlFor="rpolit" className="terms">
              <input
                id="rpolit"
                type="checkbox"
                name="rpolit"
                value={checkedPolits ? '1' : '0'}
                checked={checkedPolits}
                disabled={loading}
                onChange={() => {
                  setCheckedPolits(!checkedPolits)
                }}
              />
              Al ingresar por redes sociales autorizo el uso de mis datos para{' '}
              <button
                className={styles.link}
                type="button"
                onClick={dataTreatment}>
                fines adicionales
              </button>
              <span className="checkmark" />
            </label>
          </div>
          <p className={styles.titleRegister} style={{ textAlign: 'justify' }}>
            En caso hayas autorizado los fines de uso adicionales anteriormente,
            no es necesario que lo vuelvas a marcar. Si deseas retirar dicho
            consentimiento, revisa el procedimiento en nuestras{' '}
            <button
              className={styles.link}
              type="button"
              onClick={openPoliticas}>
              Políticas de Privacidad.
            </button>
          </p>
        </>
      )}
    </NavigateConsumer>
  )
}

Login.propTypes = {
  arcSite: PropTypes.string.isRequired,
}

export default Login
