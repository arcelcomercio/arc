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

const colorWelcome: any = {
  default: '',
  trome: '',
  diariocorreo: '#c00000',
}

const welcome: any = {
  default: '',
  trome:
    'Bienvenido(a) al club.\n Ahora recibirás todas las noticias y beneficios exclusivos que tenemos para ti',
  diariocorreo: 'Bienvenido a nuestra comunidad digital',
}

const urlImage: any = {
  default: '',
  trome: '',
  diariocorreo: '/images/boletin-anim.png',
}

const message: any = {
  default: '',
  trome: '',
  diariocorreo: 'Ahora podrás seguir artículos y noticias de tu interés',
}

interface CardSubscribeResgisterProps {
  id: string
  welcomeMsg: string
  arcSite: ArcSite
  contextPath: string
  mainColorLink: string
}

const CardSubscribeResgister: React.FC<CardSubscribeResgisterProps> = ({
  id,
  welcomeMsg,
  arcSite,
  contextPath,
}) => (
  <div
    id={id}
    className={`${classes.container} hidden`}
    style={{
      minWidth: '200px',
      maxWidth: '250px',
    }}>
    <p id={welcomeMsg} className={classes.hello}>
      ¡Hola!
    </p>
    <p
      style={{
        color: colorWelcome[arcSite],
      }}
      className={classes.welcome}>
      {welcome[arcSite]}
    </p>
    <p className={classes.info}>{message[arcSite]}</p>
    <img
      className={classes.image}
      src={`${getAssetsPath(arcSite, contextPath)}/resources/dist/${arcSite}${
        urlImage[arcSite]
      }`}
      loading="lazy"
      alt={`Logo ${arcSite}`}
    />
  </div>
)

export default CardSubscribeResgister
