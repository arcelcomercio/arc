import React, { PureComponent, useState, useEffect } from 'react'
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'
import { Back, Close } from '../_children/iconos'
import {
  HeaderWrapper,
  HeaderContent,
  ButtonBack,
  ContLogo,
  ButtonClose,
} from './styled'
import Logo from './_children/logo'
import Taggeo from '../_dependencies/taggeo'
import Loading from '../_children/loading'

const Head = ({
  arcSite,
  siteProperties: {
    signwall: { mainColorBg, mainColorTxt, mainLogo },
  },
  contextPath,
  deployment,
  buttonClose,
  onClose,
  typeDialog,
  noLoading,
  customFields: { buttonBack: _buttonBack },
}) => {
  const [showLoading, setShowLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setShowLoading(false)
    }, 3000)
  }, [])

  return (
    <>
      {showLoading && !noLoading ? (
        <div className="back-loading" style={{ zIndex: "20" }}>
          <Loading arcSite={arcSite} />
        </div>
      ) : (
        <HeaderWrapper cbg={mainColorBg} ctx={mainColorTxt}>
          <HeaderContent>
            {!buttonClose && _buttonBack ? (
              <ButtonBack
                type="button"
                ctx={mainColorTxt}
                onClick={() => {
                  window.location.href = document.referrer
                    ? document.referrer
                    : '/'
                }}>
                <Back color={mainColorTxt} />
                <span className="text">Volver</span>
              </ButtonBack>
            ) : (
              <ButtonBack type="button" />
            )}

            <ContLogo>
              <Logo
                arcSite={arcSite}
                deployment={deployment}
                contextPath={contextPath}
                mainLogo={mainLogo}
              />
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
      )}
    </>
  )
}

@Consumer
class HeaderSignwall extends PureComponent {
  render() {
    return <Head {...this.props} />
  }
}

HeaderSignwall.propTypes = {
  customFields: PropTypes.shape({
    buttonBack: PropTypes.bool.tag({
      name: 'Boton Volver:',
      defaultValue: true,
      description: 'Mostrar Boton Volver atráz.',
    }),
  }),
}

export default HeaderSignwall
