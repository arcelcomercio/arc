import { useFusionContext } from 'fusion:context'
import PropTypes from 'prop-types'
import React from 'react'

import { getAssetsPath } from '../../../utilities/assets'
import Portal from '../../subscriptions/_children/modal/portal'
import { LoadingEco, LoadingGes, LoadingP21 } from './icons'

const Inside = ({ arcSite, mainColorBg, urlLogo, typeBg }) => (
  <div className={`sign-loading ${typeBg}`}>
    {(() => {
      switch (arcSite) {
        case 'gestion':
          return (
            <div className={`cont-loader-logo ${typeBg}`}>
              <LoadingGes />
              <LoadingGes />
              <LoadingGes />
            </div>
          )
        case 'elcomercio':
          return (
            <div className={`cont-loader-logo ${typeBg}`}>
              <LoadingEco />
              <LoadingEco />
              <LoadingEco />
            </div>
          )
        case 'peru21':
          return (
            <div className={`cont-loader-logo ${typeBg}`}>
              <LoadingP21 />
              <LoadingP21 />
              <LoadingP21 />
            </div>
          )
        default:
          return (
            <div
              className="cont-loader-default"
              style={{
                background: mainColorBg,
              }}>
              <img src={urlLogo} alt="Logo Marca" />
            </div>
          )
      }
    })()}
  </div>
)
const FIXLOAD = 'fix-loading'
const Loading = ({ typeBg, open = true }) => {
  const {
    siteProperties: {
      signwall: { mainColorBg = 'gray' },
      assets: { header: { logo } = {} } = {},
    },
    contextPath,
    arcSite,
  } = useFusionContext() || {}

  React.useEffect(() => {
    if (open) {
      window.document.body.classList.add(FIXLOAD)
    } else {
      window.document.body.classList.remove(FIXLOAD)
    }
    return () => {
      window.document.body.classList.remove(FIXLOAD)
    }
  }, [open])

  const urlLogo = `${getAssetsPath(
    arcSite,
    contextPath
  )}/resources/dist/${arcSite}/images/${logo}?d=1`

  return (
    <>
      {typeBg === 'full' || typeBg === 'full-transparent' ? (
        <Portal id="sign-loading">
          <Inside
            mainColorBg={mainColorBg}
            arcSite={arcSite}
            urlLogo={urlLogo}
            typeBg={typeBg}
          />
        </Portal>
      ) : (
        <Inside
          mainColorBg={mainColorBg}
          arcSite={arcSite}
          urlLogo={urlLogo}
          typeBg={typeBg}
        />
      )}
    </>
  )
}

Loading.propTypes = {
  typeBg: PropTypes.string.isRequired,
}

export default Loading
