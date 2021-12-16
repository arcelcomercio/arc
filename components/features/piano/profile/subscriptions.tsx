import { useAppContext } from 'fusion:context'
import PropTypes from 'prop-types'
import * as React from 'react'
import { FC } from 'types/features'

import { isProd } from '../../../utilities/arc/env'

interface PianoProfileProps {
  customFields?: {
    containerId?: string
    minHeight?: string
    maxWidth?: string
  }
}

const PianoProfile: FC<PianoProfileProps> = ({
  customFields: {
    containerId = 'piano-container',
    minHeight = '70vh',
    maxWidth = '1440px',
  } = {},
}) => {
  const { arcSite } = useAppContext()

  React.useEffect(() => {
    window.tp.push([
      'init',
      function pianoInit() {
        window.tp.myaccount.show({
          displayMode: 'inline',
          containerSelector: `#${containerId}`,
          loginRequired: function loginRequiredCallback(data: any) {
            console.log(
              'login required, redirigir a:',
              isProd
                ? '/ingreso/?outputType=subscriptions'
                : `/ingreso/?outputType=subscriptions&_website=${arcSite}`,
              data
            )

            // window.location.href = isProd
            //   ? '/ingreso/?outputType=subscriptions'
            //   : `/ingreso/?outputType=subscriptions&_website=${arcSite}`
          },
        })
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

PianoProfile.label = 'Piano - Perfil'

PianoProfile.propTypes = {
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

export default PianoProfile
