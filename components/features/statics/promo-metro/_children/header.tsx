import * as React from 'react'
import { AppContext, ArcSite } from 'types/fusion'

import { getAssetsPath } from '../../../../utilities/assets'

interface PromoMetroHeaderProps {
  arcSite: ArcSite
  contextPath: string
  deployment: AppContext['deployment']
  logoMetro: string
}

const classes = {
  header: 'items-center flex metro-header position-relative',
  headerContainer: 'metro-header-container w-full',
  headerLogoMetro: 'metro-header-logometro',
  headerSecondContainer:
    'metro-header-second-container w-full justify-center flex',
  headerLogoClubTrome: 'metro-header-logoclubt',
  headerMetroFamily: 'metro-header-family',
  headerExclusiveDescounts: 'metro-header-exclusive',
}

const PromoMetroHeader: React.FC<PromoMetroHeaderProps> = ({
  arcSite,
  contextPath,
  deployment,
  logoMetro,
}) => (
  <header className={classes.header}>
    <img
      className="w-full position-absolute"
      src={deployment('/pf/resources/dist/trome/images/productos-fondo.svg')}
      alt="fondo productos"
      loading="eager"
    />
    <img
      className="w-full position-absolute"
      src={deployment(
        '/pf/resources/dist/trome/images/header-background-cuponera.png'
      )}
      alt="fondo puntitos"
      loading="eager"
    />
    <div className={classes.headerContainer}>
      <div className="items-start flex justify-between w-full position-relative">
        <img
          className={classes.headerLogoMetro}
          src={logoMetro}
          alt="logo metro"
          loading="eager"
        />

        <img
          className={classes.headerLogoClubTrome}
          src={`${getAssetsPath(
            arcSite,
            contextPath
          )}/resources/dist/${arcSite}/images/logo-club-trome.png?d=1`}
          alt="logo club trome"
          loading="eager"
        />
      </div>

      <div className={classes.headerSecondContainer}>
        <img
          className={classes.headerMetroFamily}
          src={deployment('/pf/resources/dist/trome/images/familia-trome.png')}
          alt="familia Trome"
          loading="eager"
        />
        <img
          className={classes.headerExclusiveDescounts}
          src={deployment(
            '/pf/resources/dist/trome/images/mejores-ofertas-metro.png'
          )}
          alt="mejores ofertas"
          loading="eager"
        />
      </div>
    </div>
  </header>
)

export default PromoMetroHeader
