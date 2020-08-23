import React, { useState, useContext } from 'react'
import getCodeError, { formatEmail } from '../../../../_dependencies/Errors'
import useForm from '../../../../_hooks/useForm'
import { NavigateConsumer } from '../../../../_context/navigate'
import { AuthContext } from '../../../../_context/auth'
import PropertiesSite from '../../../../_dependencies/Properties'
import ButtonSocial from './social'
import { Taggeo } from '../../../../_dependencies/Taggeo'

const styles = {
  title: 'step__left-title',
  blockMiddle: 'step__left-block-middle',
  titleLine: 'step__left-title-line',
  titleForgot: 'step__left-forgot-pass',
  block: 'step__left-block',
  btnShow: 'step__left-btn-show',
  btn: 'step__left-btn-next',
  link: 'step__btn-link',
  titleRegister: 'step__left-link-register',
  noteEnd: 'step__left-notes-footer',
}

const nameTagCategory = 'Web_Sign_Wall_Landing'

const Login = ({ arcSite, arcEnv }) => {
  const { activateAuth, updateStep } = useContext(AuthContext)
  const [loading, setLoading] = useState()
  const [msgError, setMsgError] = useState()
  const [showHidePass, setShowHidePass] = useState('password')
  const { texts } = PropertiesSite.common

  const stateSchema = {
    lemail: { value: '', error: '' },
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
            Taggeo(nameTagCategory, 'web_swl_login_success_ingresar')
          })
        })
        .catch(err => {
          setMsgError(getCodeError(err.code))
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

  return (
    <NavigateConsumer>
      {value => (
        <>
          <h2 className={styles.title}>{texts.login}</h2>
          <div className={styles.blockMiddle}>
            <ButtonSocial
              arcSocial="facebook"
              arcSite={arcSite}
              arcEnv={arcEnv}
              arcType="login"
            />

            <ButtonSocial
              arcSocial="google"
              arcSite={arcSite}
              arcEnv={arcEnv}
              arcType="login"
            />
          </div>

          <div className={styles.titleLine}>
            <p>{texts.orEnterDatesLog}</p>
          </div>

          {msgError && (
            <div className={styles.block}>
              <div className="msg-alert">{msgError}</div>
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

export default Login
