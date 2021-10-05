import { useAppContext } from 'fusion:context'
import * as React from 'react'
import { FC } from 'types/features'

// import background from '../../../../resources/assets/newsletter/diario-correo-background.png'

const classes = {
  container: 'items-center tabloid row-1 flex flex-col position-relative icono',
  logo: 'logo',
  text: 'bold',
  button: 'rounded-sm pt-15 pb-15 bold',
  imagen: 'lazy position-absolute top-0 right-0 bottom-0 left-0 w-full h-full',
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
const CardSubscribeResgister: FC = () => {
  const {
    siteProperties: {
      signwall: { mainColorLink },
    },
  } = useAppContext()

  return (
    <div
      id="register-suscribe"
      className="mt-25 ml-20 mr-20"
      style={{
        display: 'none',
        textAlign: 'center',
      }}>
      <p  id="suscriber-user" className={classes.text}>
        {' '}
      </p>
      <p style={{color:mainColorLink}} className="welcome-register"> Bienvenido a nuestra comunidad digital</p>
      <p className="welcome-info">
        Ahora podras seguir artículos y noticias de interés
      </p>
    </div>
  )
}

CardSubscribeResgister.label = 'Triplete'
CardSubscribeResgister.static = true

export default CardSubscribeResgister
