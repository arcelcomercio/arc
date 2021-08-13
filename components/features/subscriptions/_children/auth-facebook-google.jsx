import Identity from '@arc-publishing/sdk-identity'
// import PropTypes from 'prop-types'
import * as React from 'react'

import { useNavigateContext } from '../_context/navigate'

const AuthFacebookGoogle = ({ handleLogged = () => {} }) => {
  const { changeTemplate } = useNavigateContext()
  const [showFormFacebook, setShowFormFacebook] = React.useState()
  const [emailFacebook, setEmailFacebook] = React.useState()
  const [verifyEmailFb, setVerifyEmailFb] = React.useState()

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

  React.useEffect(() => {
    Identity.initFacebookLogin('861476194483517', 'es_ES')
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
                  handleLogged()
                } else {
                  Identity.getUserProfile().then(
                    ({ email: emailArc, emailVerified }) => {
                      if (emailArc && emailVerified) {
                        handleLogged()
                      } else if (emailArc && !emailVerified) {
                        setShowFormFacebook({ name, id })
                        setVerifyEmailFb(emailArc)
                      } else {
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

    Identity.initGoogleLogin(
      '519633312892-3kpve55sqi0k1nq2n4f9suag9sji41jh.apps.googleusercontent.com',
      {
        width: 300,
        height: 40,
        theme: 'dark',
        onSuccess: () => {
          handleLogged()
        },
      }
    )

    setTimeout(() => {
      const btnGoogle = document.getElementById('google-sign-in-button')

      if (btnGoogle) {
        const textGoogle = btnGoogle.getElementsByTagName('span')[0]
        if (textGoogle) textGoogle.innerHTML = 'Iniciar sesión con Google'
      }
    }, 1000)
  }, [handleLogged])

  const handleLoginFb = () => {
    Identity.updateUserProfile({
      email: emailFacebook,
    })
      .then(({ emailVerified, email }) => {
        if (!emailVerified) {
          setVerifyEmailFb(email)
        } else {
          handleLogged()
        }
      })
      .catch((err) => {
        window.console.error(err)
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
          <h2 className={styles.title}>
            {`Hola ${showFormFacebook.name} ${
              verifyEmailFb ? '. Solo nos falta un paso más' : ''
            }`}
          </h2>

          {verifyEmailFb ? (
            <>
              <span className={styles.textblock}>{verifyEmailFb}</span>
              <h3 className={styles.textnotice}>
                Revisa tu bandeja de correo para confirmar tu registro y sigue
                navegando
              </h3>
              <div className={styles.leftBlock}>
                <button
                  type="button"
                  className={styles.btnnext}
                  onClick={() => {
                    setShowFormFacebook(false)
                    changeTemplate('login')
                  }}>
                  Continuar
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

              <form className="form-email-facebok">
                <div className={styles.leftBlock}>
                  <label htmlFor="lemail">
                    Correo electrónico
                    <input
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      name="lemail"
                      required
                      maxLength="80"
                      onChange={(e) => setEmailFacebook(e.target.value)}
                    />
                  </label>
                </div>
                <div className={styles.leftBlock}>
                  <button
                    type="button"
                    className={styles.btnnext}
                    onClick={handleLoginFb}>
                    Continuar
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
