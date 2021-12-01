import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import PropTypes from 'prop-types'
import * as React from 'react'
import { FC } from 'types/features'

import { getAssetsPath } from '../../../utilities/assets'
import { verifyUserPromotion } from './_dependencies/scripts'

const classes = {
  container: 'justify-center w-full col-1 position-relative text-center flex',
  text: 'font-bold',
  containerMovil: 'cursor-pointer flex justify-center items-center',
  respond: 'top-0 right-0 bottom-0 left-0 w-full object-cover',
  respondmessage:
    'pb-20 top-0 right-0 bottom-0 left-0 w-full object-cover font-bold',
}

/**
 * Componente pensado, por ahora para la promoción de Trome con Metro,
 * en el marco del proyecto Signwall 360.
 *
 * Revisar clases globales disponibles para outputType default en:
 * `src/general-styles/framework/classes.md`
 *
 * Si las clases globales no satisfacen las necesidades de este componente,
 * se pueden agregar estilos personalizados, únicamente para este componente,
 *
 * en cierta marca. Por ahora se ha creado sólo esta hoja de estilos para Trome:
 * `src/websites/trome/scss/components/cards/subscribe-promo/_subscribe-promo.scss`
 *
 * PARA LA VERSION 2.0 DEL NUEVO DISEÑO DE TROME DEBE ESTAR EN ESTA RUTA:
 * `src/websites/trome/scss/home-v2/features/_subscribe-promo.scss`
 */

interface SubscribePromoProps {
  customFields?: {
    pathToPromotion?: string
    disableMiniVersion?: boolean
  }
}

const CardPromotion: FC<SubscribePromoProps> = ({ customFields }) => {
  const { pathToPromotion = '', disableMiniVersion = true } = customFields || {}

  const { arcSite, contextPath, isAdmin } = useAppContext()
  const { siteName } = getProperties(arcSite)

  const titleId = 'promotion-title-id'
  const subtitleId = 'promotion-subtitle-id'
  const btnBannerId = 'btn-banner-id'

  // en caso se llame al caso mini version
  const containerMovilId = 'promotion-movil-id'
  const messageMovilId = 'message-movil-Id'

  const isMini = !disableMiniVersion ? '-mini' : ''

  return (
    <div className={classes.container}>
      <div className={`promotion${isMini}`}>
        <p id={titleId} className={`promotion${isMini}__title`}>
          FORMA PARTE DEL
        </p>
        <div className={classes.respond}>
          <img
            src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
            data-src={`${getAssetsPath(
              arcSite,
              contextPath
            )}/resources/dist/${arcSite}/images/logo-club-trome.png?d=1`}
            loading="lazy"
            alt={`Logo ${siteName}`}
            className={`${
              isAdmin ? '' : 'lazy'
            } promotion${isMini}__header-img`}
          />
        </div>
        <p id={subtitleId} className={`promotion${isMini}__title`}>
          Y ACCEDE A BENEFICIOS EXCLUSIVOS EN
        </p>
        <div className={classes.respond}>
          <img
            className={`${isAdmin ? '' : 'lazy'} promotion${isMini}__metro`}
            src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
            data-src={`${getAssetsPath(
              arcSite,
              contextPath
            )}/resources/dist/${arcSite}/images/logo-metro.png?d=1`}
            alt="metro logo"
          />
        </div>
        <button
          id={btnBannerId}
          type="button"
          className={`promotion${isMini}__btn ${classes.respondmessage}`}>
          REGÍSTRATE
        </button>
      </div>
      {!disableMiniVersion && (
        <div
          id={containerMovilId}
          className={`promotion__movil ${classes.containerMovil}`}>
          <p id={messageMovilId} className="promotion__movil-msg">
            Super descuentos en Metro si formas parte de ClubTrome
          </p>
        </div>
      )}
      <script
        dangerouslySetInnerHTML={{
          __html: verifyUserPromotion(
            titleId,
            subtitleId,
            btnBannerId,
            containerMovilId,
            messageMovilId,
            pathToPromotion
          ),
        }}
      />
    </div>
  )
}

CardPromotion.label = 'caja promo metro'
CardPromotion.static = true

export default CardPromotion

CardPromotion.propTypes = {
  customFields: PropTypes.shape({
    pathToPromotion: PropTypes.string.tag({
      name: 'URI para redireccionar a la cuponera',
      description: 'Ejemplo: /cuponera-trome',
      group: 'configuración',
    }),
    disableMiniVersion: PropTypes.bool.tag({
      name: 'Desactivar versión mini del banner',
      defaultValue: true,
      group: 'configuración',
    }),
  }),
}
