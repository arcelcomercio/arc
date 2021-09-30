import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import * as React from 'react'
import { FC } from 'types/features'

import { getAssetsPath } from '../../../utilities/assets'
import { handleUserStatus } from './_dependencies/scripts'
// import background from '../../../../resources/assets/newsletter/diario-correo-background.png'

const classes = {
  container: 'items-center tabloid row-1 flex flex-col',
  logo: '',
  text: 'bold',
  button: 'rounded-sm pt-15 pb-15 bold',
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
  const {
    arcSite,
    siteProperties: {
      signwall: { mainLogo, mainColorLink },
    },
    contextPath,
  } = useAppContext()
  const { siteName } = getProperties(arcSite)

  return (
    <div
      className={classes.container}
      style={{
        border: `3.5px solid ${mainColorLink}`,
        height: '374px',
        minWidth: '313px',
        backgroundImage:
          'url("https://cdn.shopify.com/s/files/1/0449/4229/5199/files/diario-correo-background.png")',
        backgroundSize: '100% 100%',
      }}>
      <img
        src={`${getAssetsPath(
          arcSite,
          contextPath
        )}/resources/dist/${arcSite}/images/${mainLogo}?d=1`}
        alt={`Logo ${siteName}`}
        style={{
          width: '90px',
          height: '110px',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '25px',
          // boxShadow:'0 15px 10px -10px rgb(0 0 0 / 50%), 0 1px 4px rgb(0 0 0 / 30%), 0 0 40px rgb(0 0 0 / 10%) inset',
        }}
        className={classes.logo}
      />
      <div
        className="mt-25 ml-20 mr-20"
        style={{
          textAlign: 'center',
        }}>
        <p
          className={classes.text}
          style={{
            fontSize: '25px',
            fontWeight: 501,
            color: 'black',
            lineHeight: '35px',
          }}>
          ¿Aún no tienes una cuenta?
        </p>
        <a
          href="/signwall/?outputType=subscriptions&signwallOrganic=1"
          className={classes.button}
          style={{
            color: 'white',
            background: mainColorLink,
            textDecoration: 'none',
            width: '100%',
            display: 'block',
            marginTop: '35px',
            borderRadius: '8px',
            fontSize: '19px',
          }}>
          Regístrate ¡Gratis!
        </a>
      </div>

      <script dangerouslySetInnerHTML={{ __html: handleUserStatus() }} />
    </div>
  )
}

CardSubscribe.label = 'Triplete'
CardSubscribe.static = true

export default CardSubscribe
