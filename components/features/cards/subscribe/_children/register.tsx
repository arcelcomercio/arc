/* eslint-disable jsx-a11y/label-has-associated-control */
import { useAppContext } from 'fusion:context'
import * as React from 'react'

const classes = {
  container: 'mt-25 ml-30 mr-20 text-center',
  hello: 'subscribe__hello bold',
  welcome: 'subscribe__welcome',
  info: 'subscribe__info',
  image: 'subscribe__image',
  cajainfo: 'subscribe__cajainfo ml-20'
}
const CardSubscribeResgister: React.FC = () => {
  const {
    siteProperties: {
      signwall: { mainColorLink },
    },
  } = useAppContext()

  return (
    <>
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
    </div>
     <div className={classes.cajainfo} > 
     <p className={classes.info}>
       Ahora podrás seguir artículos y noticias de interés
     </p>
     <img className={classes.image}src="https://cdn.shopify.com/s/files/1/0449/4229/5199/files/imagrn_admin_correo.png" alt="carta correo" />
     </div>
     </>
  )
}

export default CardSubscribeResgister
