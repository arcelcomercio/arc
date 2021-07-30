import { useFusionContext } from 'fusion:context'
import * as React from 'react'

import { getAssetsPath } from '../../../../../utilities/constants'
import { Back, Close } from '../../../../signwall/_children/icons'
import { Taggeo } from '../../../_dependencies/Taggeo'

interface HeaderSignwallProps {
  buttonClose?: boolean
  onClose?: () => void
  typeDialog?: 'hard' | 'organico'
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
      className={`sign-profile_header-wrapper ${
        arcSite === 'trome' ? 'border-trome' : ''
      }`}
      style={{
        background: arcSite === 'trome' ? '#FF650F' : mainColorBg,
        color: mainColorTxt,
      }}>
      <div className="sign-profile_header-content">
        {buttonClose ? (
          <button className="sign-profile_header-back" type="button">
            {' '}
          </button>
        ) : (
          <button
            className="sign-profile_header-back"
            style={{ color: mainColorTxt }}
            type="button"
            onClick={() => {
              window.location.href = document.referrer ? document.referrer : '/'
            }}>
            <Back color={mainColorTxt} />
            <span className="text">Volver</span>
          </button>
        )}

        <div className="sign-profile_header-logo">
          <div
            className={`cont cont_${arcSite} ${
              arcSite === 'trome' && logoLeft ? 'cont_left' : ''
            }`}>
            <img
              alt={`Logo ${arcSite}`}
              src={
                arcSite === 'trome'
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
            className="sign-profile_header-close"
            type="button"
            onClick={() => {
              Taggeo(
                `Web_Sign_Wall_${typeDialog}`,
                `web_sw${typeDialog?.[0]}_boton_cerrar`
              )

              if (typeDialog === 'hard') {
                window.location.href = '/?ref=signwall'
              } else if (onClose) {
                onClose()
              }

              if (
                window.location.pathname.match(/newsletters/) &&
                window.Identity.userProfile &&
                typeDialog === 'organico'
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
