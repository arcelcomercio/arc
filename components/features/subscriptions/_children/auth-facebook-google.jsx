import Identity from '@arc-publishing/sdk-identity'
// import PropTypes from 'prop-types'
import * as React from 'react'

const AuthFacebookGoogle = ({ handleLogged = () => {} }) => {
  const [showFormFacebook, setShowFormFacebook] = React.useState()
  const [emailFacebook, setEmailFacebook] = React.useState()
  const [verifyEmailFb, setVerifyEmailFb] = React.useState()

  React.useEffect(() => {
    Identity.initFacebookLogin('861476194483517', 'es_ES', true)
    if (!window.onFacebookSignOn) {
      window.onFacebookSignOn = async () => {
        try {
          Identity.facebookSignOn().then((res) => {
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

  const handleContinueFacebook = () => {
    Identity.getUserProfile().then(({ email, emailVerified }) => {
      if (email && emailVerified) {
        handleLogged()
      }
    })
  }

  return (
    <>
      {showFormFacebook ? (
        <form>
          Hola {showFormFacebook.name} <br />
          <img
            src={`https://graph.facebook.com/${showFormFacebook.id}/picture?type=normal`}
            alt="img-facebook"
            className="img-facebook"
          />
          <br />
          {verifyEmailFb ? (
            <>
              <h3>Solo falta un paso más!</h3>
              <p>
                <strong> {verifyEmailFb}</strong>
                <br />
                <br />
                Revisa tu bandeja de correo para confirmar tu registro y sigue
                navegando
              </p>
              <button type="button" onClick={handleContinueFacebook}>
                Continuar
              </button>
              <p>
                ¿No recibiste el correo?
                <br />
                <a href="https://google.com">Reenviar correo de activación</a>
              </p>
            </>
          ) : (
            <>
              <p>Se requiere ingresar un correo Electrónico para continuar</p>

              <input
                type="email"
                placeholder="Ingresar Correo Electrónico"
                onChange={(e) => setEmailFacebook(e.target.value)}
              />
              <button type="button" onClick={handleLoginFb}>
                Continuar
              </button>
            </>
          )}
        </form>
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
          <br />

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
