import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import getCodeError, { formatEmail } from '../_dependencies/Errors'
import useForm from '../_hooks/useForm'
import { NavigateConsumer } from '../_context/navigate'
import { AuthContext } from '../_context/auth'
import { PropertiesCommon } from '../_dependencies/Properties'
import ButtonSocial from './social'
import { Taggeo } from '../_dependencies/Taggeo'
import { isFbBrowser } from '../_dependencies/Utils'

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
  const { activateAuth, updateStep } = useContext(AuthContext)
  const [loading, setLoading] = useState()
  const [msgError, setMsgError] = useState()
  const [showVerify, setShowVerify] = useState()
  const [showHidePass, setShowHidePass] = useState('password')
  const [showSendEmail, setShowSendEmail] = useState(false)
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
        func: value => value.length >= 8,
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
          window.Identity.getUserProfile().then(resProfile => {
            activateAuth(resProfile)
            updateStep(2)
            if (isFia) {
              handleCallToAction(true)
            }
            Taggeo(nameTagCategory, 'web_swl_login_success_ingresar')
          })
        })
        .catch(err => {
          setMsgError(getCodeError(err.code))
          setShowVerify(err.code === '130051')
          setLoading(false)
          Taggeo(nameTagCategory, 'web_swl_login_error_ingresar')
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

  const handleChangeInput = e => {
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

  return (
    <NavigateConsumer>
      {value => (
        <>
          <h2 className={styles.title}>{texts.login}</h2>
          <div
            className={`${styles.blockMiddle} ${isFbBrowser() &&
              styles.blockFull}`}>
            <ButtonSocial
              arcSocial="facebook"
              arcSite={arcSite}
              arcType="login"
            />
            {!isFbBrowser() && (
              <ButtonSocial
                arcSocial="google"
                arcSite={arcSite}
                arcType="login"
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
                  onClick={toogleHidePass}></button>
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

          <p className={styles.noteEnd}>{texts.noticeUser}</p>
        </>
      )}
    </NavigateConsumer>
  )
}

Login.propTypes = {
  arcSite: PropTypes.string.isRequired,
}

export default Login
