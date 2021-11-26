import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import * as React from 'react'
import { FC } from 'types/features'

// import { getAssetsPath } from '../../../utilities/assets'
import { verifyUserPromotionTrome } from './_dependencies/scripts'

const classes = {
  container:
    'justify-center w-full col-1 position-relative text-center flex cursor-pointer',
  text: 'font-bold',
  respond: 'pt-20 top-0 right-0 bottom-0 left-0 w-full object-cover',
  respondT: 'pt-40 top-0 right-0 bottom-0 left-0 w-full object-cover',
  respondmessage: 'pb-20 top-0 right-0 bottom-0 left-0 w-full object-cover',
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
const CardPromotion: FC = () => {
  const { arcSite, /* contextPath, */ isAdmin } = useAppContext()
  const { siteName } = getProperties(arcSite)

  const containerId = 'promotion'
  const subContainerId = 'promotion-subcontainer'
  const messageBannerId = 'message-banner'
  const metroImageId = 'logo-metro'
  const metroBenefitsId = 'logo-metro-bf'
  const messageMovilId = 'message-movil-banner'

  return (
    <div id={containerId} className={classes.container}>
      <div
        id={subContainerId}
        className="promotion"
        style={{ backgroundColor: '#f29b1a' }}>
        <div className={classes.respond}>
          <img
            id={metroImageId}
            className={`${isAdmin ? '' : 'lazy'} promotion__img-first`}
            src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
            data-src="https://cdn.shopify.com/s/files/1/0449/4229/5199/files/metrologo.png?v=1637254479"
            alt="metro logo"
          />
          <img
            id={metroBenefitsId}
            className={`${isAdmin ? '' : 'lazy'} promotion__img-first`}
            src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
            data-src="https://cdn.shopify.com/s/files/1/0449/4229/5199/files/metro-beneficios.png?v=1637254479"
            alt="metro logo"
            style={{
              display: 'none',
            }}
          />
        </div>

        <div className={classes.respondT}>
          <img
            src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
            data-src="https://cdn.shopify.com/s/files/1/0449/4229/5199/files/tromecard.png?v=1637254479"
            loading="lazy"
            alt={`Logo ${siteName}`}
            className={`${isAdmin ? '' : 'lazy'} promotion__img-second`}
            style={{
              padding: '5px',
              background: '#8d8d8d',
              border: '1px solid',
              borderColor: '#CCCCCC #666666 #666666 #CCCCCC',
            }}
          />
        </div>

        <div className={`promotion__msg ${classes.respondmessage}`}>
          <p
            id={messageBannerId}
            className={`promotion__msg-banner ${classes.text}`}>
            Registrate y accede a tus descuentoss
          </p>
        </div>
      </div>
      <div className="promotion__movil flex justify-center items-center">
        <p id={messageMovilId} className="promotion__movil-msg">
          Super descuentos en Metro si formas parte de ClubTrome
        </p>
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: verifyUserPromotionTrome(
            containerId,
            subContainerId,
            messageBannerId,
            metroImageId,
            metroBenefitsId,
            messageMovilId
          ),
        }}
      />
    </div>
  )
}

CardPromotion.label = 'caja promo metro'
CardPromotion.static = true

export default CardPromotion
