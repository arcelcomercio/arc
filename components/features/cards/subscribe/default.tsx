import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import * as React from 'react'
import { FC } from 'types/features'

import { handleUserStatus } from './_dependencies/scripts'

const classes = {
  container: 'col-1 row-1 flex flex-col',
  logo: '',
  text: '',
  button: 'bg-primary rounded-sm',
}

/**
 * Componente pensado, por ahora, únicamente para Diario Correo,
 * en el marco del proyecto Signwall 360.
 *
 * Revisar clases globales disponibles para outputType default en:
 * `src/general-styles/framework/classes.md`
 *
 * Si las clases globales no satisfacen las necesidades de este componente,
 * se pueden agregar estilos personalizados, únicamente para este componente,
 * en cierta marca. Por ahora se ha creado sólo esta hoja de estilos para Diario Correo:
 * `src/websites/diariocorreo/scss/components/cards/subscribe/subscribe.scss
 */
const CardSubscribe: FC = () => {
  const { arcSite } = useAppContext()
  const { siteName } = getProperties(arcSite)

  return (
    <div className={classes.container}>
      <img src="#" alt={`Logo ${siteName}`} className={classes.logo} />
      <p className={classes.text}>¿Aún no tienes una cuenta?</p>
      <a
        href="/signwall/?outputType=subscriptions&signwallOrganic=1"
        className={classes.button}>
        Regístrate
      </a>

      <script dangerouslySetInnerHTML={{ __html: handleUserStatus() }} />
    </div>
  )
}

CardSubscribe.label = 'Triplete'
CardSubscribe.static = true

export default CardSubscribe
