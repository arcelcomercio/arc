import PropTypes from 'prop-types'
import * as React from 'react'
import { FC } from 'types/features'

interface PianoVerifyEmailProps {
  customFields?: {
    containerId?: string
    minHeight?: string
    maxWidth?: string
  }
}

const PianoVerifyEmail: FC<PianoVerifyEmailProps> = ({
  customFields: {
    containerId = 'piano-container',
    minHeight = '50vh',
    maxWidth = '480px',
  } = {},
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

        // verificar que existe el parámetro `verification_code`
        const tokenMatch = window.location.search.match(
          /verification_code=([A-Za-z0-9]+)/
        )

        if (!tokenMatch) {
          console.log('No token found, redirecciona a otra página pls')
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

PianoVerifyEmail.label = 'Piano - Verificación de email'

PianoVerifyEmail.propTypes = {
  customFields: PropTypes.shape({
    containerId: PropTypes.string.tag({
      name: 'ID del contenedor',
      description: 'Contenedor donde se insertará la plantilla de piano',
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

export default PianoVerifyEmail
