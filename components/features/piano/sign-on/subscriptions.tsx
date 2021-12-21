import PropTypes from 'prop-types'
import * as React from 'react'
import { FC } from 'types/features'

enum PianoScreen {
  Login = 'login',
  Register = 'register',
  Restore = 'restore',
}

interface PianoRegisterProps {
  customFields?: {
    pianoScreen?: PianoScreen
    containerId?: string
    disableSignUp?: boolean
    minHeight?: string
    maxWidth?: string
  }
}

/**
 * @see [PianoID overview](https://docs.piano.io/piano-id-overview)
 */
const PianoRegister: FC<PianoRegisterProps> = ({
  customFields: {
    pianoScreen = PianoScreen.Register,
    containerId = 'piano-container',
    disableSignUp = false,
    minHeight = '50vh',
    maxWidth = '480px',
  } = {},
}) => {
  React.useEffect(() => {
    window.tp.push([
      'init',
      function pianoInit() {
        // Sólo se puede iniciar `pianoId` si el usuario es anónimo
        if (!window.tp.user.isUserValid()) {
          window.tp.pianoId.init({
            displayMode: 'inline',
            containerSelector: `#${containerId}`,
            loggedIn: function loggedInCallback(data: any) {
              console.log('loggedIn data', data)
            },
            loggedOut: function loggedOutCallback(data: any) {
              console.log('loggedOut data', data)
            },
            loginSuccess: function loginSuccessCallback(data: any) {
              console.log('loginSuccess data', data)
            },
            loginFailed: function loginFailedCallback(data: any) {
              console.log('loginFailed data', data)
            },
            registrationSuccess: function registrationSuccessCallback(
              data: any
            ) {
              console.log('registrationSuccess data', data)
            },
            registrationFailed: function registrationFailedCallback(data: any) {
              console.log('registrationFailed data', data)
            },
            loginDisplayed: function loginDisplayedCallback(data: any) {
              console.log('loginDisplayed data', data)
            },
            registrationDisplayed: function registrationDisplayedCallback(
              data: any
            ) {
              console.log('registrationDisplayed data', data)
            },
          })

          window.tp.pianoId.show({
            screen: pianoScreen,
            disableSignUp,
          })
        } else {
          // If user is logged in, redirect to the main page
          console.log('el man ya esta logueado')
          /**
           * TODO: se debería mostrar un mensaje al usuario
           * informando que debe estar no logueado para poder resetear la contraseña
           */
        }
      },
    ])
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
      <div
        id={containerId}
        style={{
          width: '100%',
          height: '100%',
          minHeight,
          maxWidth,
        }}
      />
    </div>
  )
}

PianoRegister.label = 'Piano - Sign-on'

PianoRegister.propTypes = {
  customFields: PropTypes.shape({
    pianoScreen: PropTypes.oneOf([
      PianoScreen.Login,
      PianoScreen.Register,
      PianoScreen.Restore,
    ]).tag({
      name: 'Seleccione plantilla de PianoID',
      defaultValue: PianoScreen.Register,
    }),
    containerId: PropTypes.string.tag({
      name: 'ID del contenedor',
      description: 'Contenedor donde se insertará la plantilla de piano',
    }),
    disableSignUp: PropTypes.bool.tag({
      name: 'Deshabilitar registro',
      description: 'Deshabilitar el registro de usuarios',
      defaultValue: false,
    }),
    minHeight: PropTypes.string.tag({
      name: 'Altura mínima',
      description: 'Altura mínima del contenedor. Ejemplo: "70vh" o "600px".',
    }),
    maxWidth: PropTypes.string.tag({
      name: 'Ancho máximo',
      description: 'Ancho máximo del contenedor. Ejemplo: "50wh" o "480px".',
    }),
  }),
}

export default PianoRegister
