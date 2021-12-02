import PropTypes from 'prop-types'
import * as React from 'react'
import { FC } from 'types/features'

interface PianoVerifyEmailProps {
  customFields?: {
    containerId?: string
  }
}

const PianoVerifyEmail: FC<PianoVerifyEmailProps> = ({
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

        // verificar que existe el parámetro `verification_code`
        const tokenMatch = window.location.search.match(
          /verification_code=([A-Za-z0-9]+)/
        )

        if (!tokenMatch) {
          console.log('No token found, redirecciona a otra página')
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

PianoVerifyEmail.label = 'Piano - Verificación de email'

PianoVerifyEmail.propTypes = {
  customFields: PropTypes.shape({
    containerId: PropTypes.string.tag({
      name: 'ID del contenedor',
      description: 'Contenedor donde se insertará la plantilla de piano',
    }),
  }),
}

export default PianoVerifyEmail
