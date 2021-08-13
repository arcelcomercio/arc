import Identity from '@arc-publishing/sdk-identity'
// import PropTypes from 'prop-types'
import * as React from 'react'

import getCodeError, { formatEmail } from '../_dependencies/Errors'
import useForm from '../_hooks/useForm'

// key's ambiente PRE mover a enviroments
const KEY_FACEBOOK = '861476194483517'
const KEY_GOOGLE = '519633312892-3kpve55sqi0k1nq2n4f9suag9sji41jh'

const styles = {
  center: 'step__left-align-center',
  imgfb: 'step__left-img-facebok',
  title: 'step__left-title',
  textblock: 'step__left-textblock',
  textnotice: 'step__left-text-notice',
  leftBlock: 'step__left-block',
  btnnext: 'step__left-btn-next',
  link: 'step__btn-link',
  linkregister: 'step__left-link-register',
}

const AuthFacebookGoogle = ({ loginSuccess, hideFormLogin }) => {
  const [showFormFacebook, setShowFormFacebook] = React.useState()
  const [loading, setLoading] = React.useState()
  const [msgError, setMsgError] = React.useState()
  const [verifyEmailFb, setVerifyEmailFb] = React.useState()

  const stateSchema = {
    femail: { value: '' || '', error: '' },
  }

  const stateValidatorSchema = {
    femail: {
      required: true,
      validator: formatEmail(),
    },
  }

  React.useEffect(() => {
    Identity.initFacebookLogin(KEY_FACEBOOK, 'es_ES')
    if (!window.onFacebookSignOn) {
      window.onFacebookSignOn = async () => {
        try {
          await Identity.facebookSignOn().then((res) => {
            const { accessToken } = res || {}
            if (!accessToken) return
            window.FB.api(
              '/me',
              { locale: 'es_ES', fields: 'id, name, email' },
              ({ email, name, id }) => {
                if (email) {
                  loginSuccess()
                } else {
                  Identity.getUserProfile().then(
                    ({ email: emailArc, emailVerified }) => {
                      if (emailArc && emailVerified) {
                        loginSuccess()
                      } else if (emailArc && !emailVerified) {
                        hideFormLogin(true)
                        setShowFormFacebook({ name, id })
                        setVerifyEmailFb(emailArc)
                      } else {
                        hideFormLogin(true)
                        setShowFormFacebook({ name, id })
                      }
                    }
                  )
                }
              }
            )
          })
        } catch (e) {
          window.console.error(e.message)
        }
      }
    }

    const btnGoogle = document.getElementById('google-sign-in-button')
    if (btnGoogle) {
      Identity.initGoogleLogin(`${KEY_GOOGLE}.apps.googleusercontent.com`, {
        width: 300,
        height: 40,
        theme: 'dark',
        onSuccess: () => {
          loginSuccess()
        },
      }).then(() => {
        setTimeout(() => {
          const textGoogle = btnGoogle.getElementsByTagName('span')
          if (textGoogle) textGoogle[0].innerHTML = 'Iniciar sesión con Google'
        }, 200)
      })
    }
  }, [])

  const onFormEmailFacebook = ({ femail }) => {
    setLoading(true)
    setMsgError(false)
    Identity.updateUserProfile({
      email: femail,
    })
      .then(({ emailVerified, email }) => {
        if (!emailVerified) {
          setVerifyEmailFb(email)
        } else {
          loginSuccess()
        }
      })
      .catch((err) => {
        setMsgError(getCodeError(err.code))
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const {
    values: { femail },
    errors: { femail: femailError },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onFormEmailFacebook)

  const handleChangeInput = (e) => {
    handleOnChange(e)
    setMsgError(false)
  }

  const handleCheckProfile = () => {
    setLoading(true)
    setMsgError(false)
    Identity.getUserProfile().then(({ email, emailVerified }) => {
      if (email && emailVerified) {
        loginSuccess()
      } else {
        setLoading(false)
        setMsgError(getCodeError('130051'))
      }
    })
  }

  return (
    <>
      {showFormFacebook ? (
        <div className={styles.center}>
          <img
            src={`https://graph.facebook.com/${showFormFacebook.id}/picture?type=normal`}
            alt="img-facebook"
            className={styles.imgfb}
          />
          <h2 className={styles.title}>Hola, {showFormFacebook.name}</h2>

          {verifyEmailFb ? (
            <>
              <span className={styles.textblock}>{verifyEmailFb}</span>

              {msgError && (
                <div className={styles.leftBlock}>
                  <div className="msg-alert">{` ${msgError} `}</div>
                </div>
              )}

              <h3 className={styles.textnotice}>
                Revisa tu bandeja de correo para confirmar tu registro y sigue
                navegando
              </h3>

              <div className={styles.leftBlock}>
                <button
                  type="button"
                  className={styles.btnnext}
                  disabled={loading}
                  onClick={handleCheckProfile}>
                  {loading ? 'Verificando..' : 'Continuar'}
                </button>
              </div>

              <p className={styles.linkregister}>
                ¿No recibiste el correo?
                <br />
                <buton type="button" className={styles.link}>
                  Reenviar correo de activación
                </buton>
              </p>
            </>
          ) : (
            <>
              <h3 className={styles.textnotice}>
                Para continuar se requiere completar
              </h3>

              {msgError && (
                <div className={styles.leftBlock}>
                  <div className="msg-alert">{` ${msgError} `}</div>
                </div>
              )}

              <form className="form-email-facebok" onSubmit={handleOnSubmit}>
                <div className={styles.leftBlock}>
                  <label htmlFor="femail">
                    Correo electrónico
                    <input
                      className={femailError && 'input-error'}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      name="femail"
                      value={femail}
                      required
                      maxLength="80"
                      onChange={handleChangeInput}
                      onBlur={handleOnChange}
                      disabled={loading}
                    />
                    {femailError && (
                      <span className="msn-error">{femailError}</span>
                    )}
                  </label>
                </div>
                <div className={styles.leftBlock}>
                  <button
                    type="submit"
                    className={styles.btnnext}
                    disabled={disable || loading}>
                    {loading ? 'Verificando...' : 'Continuar'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      ) : (
        <>
          <div
            className="fb-login-button"
            data-width="300"
            data-size="large"
            data-button-type="login_with"
            data-scope="public_profile,email"
            data-auto-logout-link="false"
            data-use-continue-as="true"
            data-onlogin="window.onFacebookSignOn()"
          />

          <div id="google-sign-in-button" />
        </>
      )}
    </>
  )
}

// AuthFacebook.propTypes = {
//   handleLogged: PropTypes.string.isRequired,
// }

export default AuthFacebookGoogle
