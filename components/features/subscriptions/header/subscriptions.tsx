import { useFusionContext } from 'fusion:context'
import PropTypes from 'prop-types'
import * as React from 'react'

import { getAssetsPath } from '../../../utilities/assets'
import { SITE_TROME } from '../../../utilities/constants/sitenames'
import { Back } from '../../signwall/_children/icons'

const classes = {
  wrapper: 'profile-header__wrapper',
  content: 'profile-header__content',
  back: 'profile-header__back',
  logo: 'profile-header__logo',
  close: 'profile-header__close',
}

interface SubscriptionsHeaderProps {
  customFields?: {
    logoLeft?: boolean
  }
}

const SubscriptionsHeader = ({
  customFields: { logoLeft = false } = {},
}: SubscriptionsHeaderProps): JSX.Element => {
  const {
    arcSite,
    siteProperties: {
      signwall: { mainColorBg, mainColorTxt, mainLogo },
    },
    contextPath,
  } = useFusionContext() || {}

  return (
    <div
      className={`${classes.wrapper} ${
        arcSite === SITE_TROME ? 'border-trome' : ''
      }`}
      style={{
        background: arcSite === SITE_TROME ? '#FF650F' : mainColorBg,
        color: mainColorTxt,
      }}>
      <div className={classes.content}>
        <button
          className={classes.back}
          style={{ color: mainColorTxt }}
          type="button"
          onClick={() => {
            window.location.href = document.referrer ? document.referrer : '/'
          }}>
          <Back color={mainColorTxt} />
          <span className="text">Volver</span>
        </button>
        <div className={classes.logo}>
          <div
            className={`cont cont_${arcSite} ${
              arcSite === SITE_TROME && logoLeft ? 'cont_left' : ''
            }`}>
            <img
              alt={`Logo ${arcSite}`}
              src={
                arcSite === SITE_TROME
                  ? 'https://signwall.e3.pe/images/trome/logo-orange.png'
                  : `${getAssetsPath(
                      arcSite,
                      contextPath
                    )}/resources/dist/${arcSite}/images/${mainLogo}?d=1`
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

SubscriptionsHeader.label = 'Subscriptions - Cabecera'

SubscriptionsHeader.propTypes = {
  customFields: PropTypes.shape({
    logo: PropTypes.string.tag({
      name: 'URL del Logo',
      description:
        'Ya existe un logo por defecto, esto existe en caso de que se necesite aplicar un nuevo logo por temporada',
    }),
  }),
}

export default SubscriptionsHeader
