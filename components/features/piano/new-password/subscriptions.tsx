import PropTypes from 'prop-types'
import * as React from 'react'
import { FC } from 'types/features'

interface PianoNewPasswordProps {
  customFields?: {
    containerId?: string
  }
}

const PianoNewPassword: FC<PianoNewPasswordProps> = ({
  customFields: { containerId = 'piano-container' } = {},
}) => {
  React.useEffect(() => {
    window.tp.push([
      'init',
      function pianoInit() {
        window.tp.pianoId.init({
          displayMode: 'inline',
          containerSelector: `#${containerId}`,
          loggedIn: function loggedInCallback(data: any) {
            console.log('loggedIn data', data)
          },
          loginSuccess: function loginSuccessCallback(data: any) {
            console.log('loginSuccess data', data)
          },
          loginFailed: function loginFailedCallback(data: any) {
            console.log('loginFailed data', data)
          },
        })

        // Sólo se puede resetear la contraseña si el usuario es anónimo
        if (!window.tp.user.isUserValid()) {
          // verificar que existe el parámetro `reset_token`
          const tokenMatch = window.location.search.match(
            /reset_token=([A-Za-z0-9]+)/
          )
          if (tokenMatch) {
            // Obtener el valor del token
            const token = tokenMatch[1]
            // Mostrar el formulario de reseteo de contraseña si existe token
            window.tp.pianoId.show({
              resetPasswordToken: token,
              loggedIn: function loggedInCallback() {
                // Si el usuario ya está logueado, recargar la página
                console.log('loggeado por resetPasswordToken')
                // window.location.reload()
              },
            })
          }
        } else {
          // If user is logged in, redirect to the main page
          console.log('el man ya esta logueado')
          // window.location.href = '/'
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
          maxWidth: '480px',
        }}
      />
    </div>
  )
}

PianoNewPassword.label = 'Piano - Nueva contraseña'

PianoNewPassword.propTypes = {
  customFields: PropTypes.shape({
    containerId: PropTypes.string.tag({
      name: 'ID del contenedor',
      description: 'Contenedor donde se insertará la plantilla de piano',
    }),
  }),
}

export default PianoNewPassword
