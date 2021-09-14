import * as React from 'react'

import properties from '../../_dependencies/properties'

/**
 * @see estilos src/websites/elcomercio/scss/components/header/_simple.scss
 */
const classes = {
  header: 'h-simple',
  container: 'h-simple__container',
  containerLeft: 'h-simple__container-left',
  logoBrand: 'h-simple__container-left__logo-brand',
  logoTrivia: 'h-simple__container-left__logo-trivia',
  containerRight: 'h-simple__container-rigth',
  rounded: 'h-simple__rounded',
}

/**
 *
 * @param {object} props
 * @param {string} props.siteUrl
 * @param {string} props.arcSite
 * @param {string} props.customLogo
 */
const HeaderSimpleChildAmp = ({
  siteUrl,
  arcSite,
  customLogo,
  width = 114,
  height = 18,
}) => {
  const logo = customLogo || properties(arcSite)?.logo
  const hasCustomLogoStyle =
    arcSite === 'diariocorreo' || arcSite === 'peru21g21' || arcSite === 'ojo'

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <div className={classes.containerLeft}>
          <a
            className={classes.logoBrand}
            href={siteUrl}
            style={hasCustomLogoStyle ? { height: '80%' } : {}}>
            <amp-img
              src={logo}
              width={width}
              height={height}
              alt={arcSite}
              tabIndex="0"
            />
          </a>
          <a className={classes.logoTrivia} href="/trivias/">
            <svg width="55" height="16" viewBox="0 0 60 16">
              <text
                style={{
                  fill: '#ffc900',
                  fontSize: '15px',
                  fontWeight: '700',
                }}>
                <tspan y="14" aria-hidden="true">
                  +
                </tspan>
                <tspan style={{ fill: '#fff' }} y="15">
                  TRIVIAS
                </tspan>
              </text>
            </svg>
          </a>
        </div>
        {/* <div className={classes.containerRight}>
          <ul>
            <li>
              <amp-social-share
                class={classes.rounded}
                width="32"
                height="32"
                type="facebook"
                aria-label="Compartir en facebook"
                data-param-app_id={fbAppId}></amp-social-share>
            </li>
            <li>
              <amp-social-share
                width="32"
                height="32"
                class={classes.rounded}
                type="twitter"
                aria-label="Compartir en twitter"></amp-social-share>
            </li>
          </ul>
        </div>
              */}
      </div>
    </header>
  )
}

export default React.memo(HeaderSimpleChildAmp)
