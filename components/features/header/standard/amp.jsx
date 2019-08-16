/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import ConfigParams from '../../../utilities/config-params'
// TODO: Separar Feature de Componente.

const classes = {
  header: 'amp-header w-full position-absolute mx-auto',
  wrap:
    'amp-header__wrap bg-primary mx-auto flex items-center justify-between pl-20 pr-20',
  logo: 'amp-header__logo',
  linkContainer:
    'amp-header__link-container border-1 border-solid border-white text-sm rounded-sm line-h-xs flex items-center justify-center p-10',
  link: 'amp-header__link i-survey-share secondary-font',
  ampImg:
    'amp-header__amp-img i-amphtml-element i-amphtml-layout-fixed i-amphtml-layout-size-defined i-amphtml-layout',
  img:
    'i-amphtml-element i-amphtml-layout-fixed i-amphtml-layout-size-defined i-amphtml-layout',
}

@Consumer
class HeaderAmpStandard extends PureComponent {
  render() {
    const { contextPath, arcSite, deployment } = this.props
    const imgLogo =
      deployment(
        `${contextPath}/resources/dist/${arcSite}/images/logo-amp.png`
      ) || ''
    return (
      <>
        <header className={classes.header}>
          <section className={classes.wrap}>
            <div className={classes.logo}>
              <a href="/">
                <amp-img
                  src={imgLogo}
                  alt={arcSite}
                  width={arcSite === ConfigParams.SITE_OJO ? 65 : 120}
                  height={arcSite === ConfigParams.SITE_OJO ? 40 : 26}
                  tabindex="0"
                />
              </a>
            </div>
            <div className={classes.linkContainer}>
              <a className={classes.link} href="/archivo">
                Últimas noticias
              </a>
            </div>
          </section>
        </header>
      </>
    )
  }
}

HeaderAmpStandard.label = 'Cabecera de Página'

export default HeaderAmpStandard
