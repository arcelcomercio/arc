import { useAppContext } from 'fusion:context'
import * as React from 'react'

// import background from '../../../../resources/assets/newsletter/diario-correo-background.png'

const classes = {
  container: 'mt-25 ml-20 mr-20 text-center',
  text: 'subscribe__text bold',
  button: 'subscribe__button rounded-sm pt-15 pb-15 bold',
}

const CardSubscribeAnonymus: React.FunctionComponent = () => {
  const {
    siteProperties: {
      signwall: { mainColorLink },
    },
  } = useAppContext()

  return (
    <div
      id="anonymus-suscribe"
      className={classes.container}
      style={{
        display: 'none',
        minWidth: '200px',
        maxWidth: '270px',
      }}>
      <p className={classes.text}>¿Aún no tienes una cuenta?</p>
      <a
        href="/signwall/?outputType=subscriptions&signwallOrganic=1"
        className={classes.button}
        style={{
          background: mainColorLink,
        }}>
        Regístrate
      </a>
    </div>
  )
}

export default CardSubscribeAnonymus
