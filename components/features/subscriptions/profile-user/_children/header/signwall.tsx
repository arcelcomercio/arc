import Identity from '@arc-publishing/sdk-identity'
import { useFusionContext } from 'fusion:context'
import * as React from 'react'

import { getAssetsPath } from '../../../../../utilities/assets'
import { SITE_TROME } from '../../../../../utilities/constants/sitenames'
import { Back, Close } from '../../../../signwall/_children/icons'
import { Taggeo } from '../../../_dependencies/Taggeo'

const classes = {
  wrapper: 'profile-header__wrapper',
  content: 'profile-header__content',
  back: 'profile-header__back',
  logo: 'profile-header__logo',
  close: 'profile-header__close',
}

enum Modals {
  Hard = 'hard',
  Organic = 'organico',
  Banner = 'banner',
  PromoMetro = 'promoMetro',
}

interface HeaderSignwallProps {
  buttonClose?: boolean
  onClose?: () => void
  typeDialog?: Modals
  logoLeft?: boolean
}

const HeaderSignwall = ({
  buttonClose = false,
  onClose = () => {},
  logoLeft = false,
  typeDialog,
}: HeaderSignwallProps): JSX.Element => {
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
        {buttonClose ? (
          <button className={classes.back} type="button">
            {' '}
          </button>
        ) : (
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
        )}

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

        {buttonClose && (
          <button
            className={classes.close}
            type="button"
            onClick={() => {
              Taggeo(
                `Web_Sign_Wall_${typeDialog}`,
                `web_sw${typeDialog?.[0]}_boton_cerrar`
              )

              if (typeDialog === Modals.Hard) {
                window.location.href = '/?ref=signwall'
              } else if (onClose) {
                onClose()
              }

              if (
                /newsletters/.test(window.location.pathname) &&
                Identity.userProfile &&
                (typeDialog === Modals.Organic ||
                  typeDialog === Modals.Banner ||
                  typeDialog === Modals.PromoMetro)
              ) {
                setTimeout(() => {
                  window.location.reload()
                }, 800)
              }
            }}>
            <Close color={mainColorTxt} />
          </button>
        )}
      </div>
    </div>
  )
}

export default HeaderSignwall
