import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import * as React from 'react'
import { FC } from 'types/features'

import { getAssetsPath } from '../../../utilities/assets'
import CardSubscribeAnonymus from './_children/anonymus'
import CardSubscribeRegister from './_children/register'
import { handleUserStatus } from './_dependencies/scripts'

const classes = {
  container: ' flex justify-center w-full row-1 col-1 position-relative',
  minicontainer: 'flex flex-col items-center position-absolute w-full h-full',
  logo: 'mt-25',
  text: 'bold',
  button: 'rounded-sm pt-15 pb-15 bold',
  imagen:
    'position-absolute top-0 right-0 bottom-0 left-0 w-full h-full object-cover',
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
  const { arcSite, contextPath, isAdmin } = useAppContext()
  const {
    siteName,
    signwall: { mainLogo, mainColorLink },
  } = getProperties(arcSite)

  return (
    <div
      className={classes.container}
      style={{
        border: `3.5px solid ${mainColorLink}`,
      }}>
      <img
        className={`${isAdmin ? '' : 'lazy'} ${classes.imagen}`}
        data-src={`${getAssetsPath(
          arcSite,
          contextPath
        )}/resources/dist/${arcSite}/images/boletin.png`}
        src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
        alt="fondo boletin"
      />
      <div className={classes.minicontainer}>
        <img
          src={`${getAssetsPath(
            arcSite,
            contextPath
          )}/resources/dist/${arcSite}/images/${mainLogo}?d=1`}
          loading="lazy"
          width={90}
          height={104}
          alt={`Logo ${siteName}`}
          className={classes.logo}
        />
        <CardSubscribeAnonymus mainColorLink={mainColorLink} />
        <CardSubscribeRegister
          arcSite={arcSite}
          contextPath={contextPath}
          mainColorLink={mainColorLink}
        />
      </div>

      <script dangerouslySetInnerHTML={{ __html: handleUserStatus() }} />
    </div>
  )
}

CardSubscribe.label = 'caja de suscripcion'
CardSubscribe.static = true

export default CardSubscribe
