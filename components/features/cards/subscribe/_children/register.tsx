import { useAppContext } from 'fusion:context'
import * as React from 'react'

const classes = {
  container: 'mt-25 ml-20 mr-20 text-center',
  hello: 'subscribe__hello bold',
  welcome: 'subscribe__welcome',
  info: 'subscribe__info',
}
const CardSubscribeResgister: React.FC = () => {
  const {
    siteProperties: {
      signwall: { mainColorLink },
    },
  } = useAppContext()

  return (
    <div
      id="register-suscribe"
      className={classes.container}
      style={{
        display: 'none',
        minWidth: '200px',
        maxWidth: '270px',
      }}>
      <p id="suscriber-user" className={classes.hello}>
        ¡Hola!
      </p>
      <p
        style={{
          color: mainColorLink,
        }}
        className={classes.welcome}>
        Bienvenido a nuestra comunidad digital
      </p>
      <p className={classes.info}>
        Ahora podrás seguir artículos y noticias de interés
      </p>
    </div>
  )
}

export default CardSubscribeResgister
