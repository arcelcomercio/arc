import * as React from 'react'
import { ArcSite } from 'types/fusion'

import { getAssetsPath } from '../../../../utilities/assets'

const classes = {
  container: 'mt-25 ml-30 mr-20 text-center',
  hello: 'subscribe__hello bold',
  welcome: 'subscribe__welcome',
  info: 'subscribe__info',
  image: 'subscribe__image position-absolute bottom-0 right-0',
}

interface CardSubscribeResgisterProps {
  arcSite: ArcSite
  contextPath: string
  mainColorLink: string
}

const CardSubscribeResgister: React.FC<CardSubscribeResgisterProps> = ({
  arcSite,
  contextPath,
  mainColorLink,
}) => (
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
      <p className={classes.info}>
        Ahora podrás seguir artículos y noticias de tu interés
      </p>
      <img
        className={classes.image}
        src={`${getAssetsPath(
          arcSite,
          contextPath
        )}/resources/dist/${arcSite}/images/boletin-anim.png`}
        loading="lazy"
        alt="carta correo"
      />
    </div>
  </>
)

export default CardSubscribeResgister
