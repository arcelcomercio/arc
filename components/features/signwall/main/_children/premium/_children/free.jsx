import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { getAssetsPath } from '../../../../../../utilities/assets'
import { SITE_DIARIOCORREO } from '../../../../../../utilities/constants/sitenames'
import { ModalProvider } from '../../../../../subscriptions/_context/modal'

export const PremiumFree = () => {
  const {
    arcSite,
    contextPath,
    siteProperties: {
      signwall: { mainLogo, mainColorBtn },
    },
  } = useAppContext() || {}

  return (
    <div
      className="signwall-inside_body-left premium"
      style={{
        background: `${arcSite === SITE_DIARIOCORREO ? '#EFEFEF' : '#232323'}`,
        padding: '20px 0px',
      }}>
      <div
        className="signwall-inside_body-cont premium"
        style={{
          padding: arcSite === SITE_DIARIOCORREO ? '15px 10px' : '12px 20px',
        }}>
        <center>
          <h2 className="title-register">Regístrate Gratis</h2>
          <p className="subtitle-register">
            para acceder al contenido exclusivo
          </p>
          <img
            alt="Logo"
            className={`logo ${arcSite}`}
            style={{ width: '70px', marginTop: '10px', marginBottom: '10px' }}
            src={`${getAssetsPath(
              arcSite,
              contextPath
            )}/resources/dist/${arcSite}/images/${mainLogo}?d=1`}
          />
        </center>
        <div className="first__block pl-20 pr-20">
          <p className="first__block-access">
            <i style={{ color: mainColorBtn }}>&raquo;</i> Acceso al contenido
            Premium
          </p>
          <p className="first__block-categories pl-15">
            Newsletter, economía, opinión, tendencias, deportes.
          </p>
        </div>

        <div className="second__block pl-20 pr-20">
          <p className="second__block-nav">
            <i style={{ color: mainColorBtn }}>&raquo;</i> Navegación ilimitada
            a{' '}
            <a
              href="https://diariocorreo.pe/"
              className="second__block-nav-link"
              style={{ color: mainColorBtn }}>
              diariocorreo.pe
            </a>{' '}
            desde cualquier dispositivo
          </p>
        </div>
      </div>
    </div>
  )
}

const PremiumFreeInt = (props) => (
  <ModalProvider>
    <PremiumFree properties={props} />
  </ModalProvider>
)

export { PremiumFreeInt }
