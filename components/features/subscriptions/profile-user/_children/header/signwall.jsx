import { useFusionContext } from 'fusion:context'
import * as React from 'react'

import { getAssetsPath } from '../../../../../utilities/constants'
import { Back, Close } from '../../../../signwall/_children/iconos'
import { Taggeo } from '../../../_dependencies/Taggeo'
import {
  ButtonBack,
  ButtonClose,
  ContLogo,
  HeaderContent,
  HeaderWrapper,
} from './styled'

const HeaderSignwall = ({ buttonClose, onClose, typeDialog }) => {
  const {
    arcSite,
    siteProperties: {
      signwall: { mainColorBg, mainColorTxt, mainLogo },
    },
    contextPath,
  } = useFusionContext() || {}

  return (
    <HeaderWrapper cbg={mainColorBg} ctx={mainColorTxt}>
      <HeaderContent>
        {buttonClose ? (
          <ButtonBack type="button" />
        ) : (
          <ButtonBack
            type="button"
            ctx={mainColorTxt}
            onClick={() => {
              window.location.href = document.referrer ? document.referrer : '/'
            }}>
            <Back color={mainColorTxt} />
            <span className="text">Volver</span>
          </ButtonBack>
        )}

        <ContLogo>
          <div className={`cont cont_${arcSite}`}>
            <img
              alt={`Logo ${arcSite}`}
              src={`${getAssetsPath(
                arcSite,
                contextPath
              )}/resources/dist/${arcSite}/images/${mainLogo}?d=1`}
            />
          </div>
        </ContLogo>

        {buttonClose && (
          <ButtonClose
            type="button"
            onClick={() => {
              Taggeo(
                `Web_Sign_Wall_${typeDialog}`,
                `web_sw${typeDialog[0]}_boton_cerrar`
              )

              if (typeDialog === 'hard') {
                window.location.href = '/?ref=signwall'
              } else {
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
          </ButtonClose>
        )}
      </HeaderContent>
    </HeaderWrapper>
  )
}

export default HeaderSignwall
