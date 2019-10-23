import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import NavBarAmp from '../../layout/navbar/_children/amp'
import Formatter from '../../layout/navbar/_dependencies/formatter'

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
class LayoutNavbar extends PureComponent {
  constructor(props) {
    super(props)
    const {
      contextPath,
      arcSite,
      deployment,
      customFields,
      siteProperties: {
        siteDomain,
        assets: { nav },
      },
    } = this.props
    this.formater = new Formatter(
      {
        deployment,
        contextPath,
        siteDomain,
        nav,
        arcSite,
        getContent: this.getContent,
      },
      customFields
    )
    this.state = {
      data: {},
    }
    if (this.formater.main.fetch !== false) {
      const { params = {}, source = '' } = this.formater.main.fetch.config || {}
      /** Solicita la data a la API y setea los resultados en "state.data" */
      this.fetchContent({
        data: {
          source,
          query: params,
          filter: this.formater.getSchema(),
        },
      })
    }
  }

  renderNavBar() {
    const { customFields: { selectDesing } = {} } = this.props
    const { data } = this.state
    const NavBarType = {
      standard: <NavBarAmp data={data} {...this.formater.main.initParams} />,
    }
    return NavBarType[selectDesing] || NavBarType.standard
  }

  renderNavBarHeader() {
    const {
      contextPath,
      arcSite,
      deployment,
      siteProperties: { siteUrl },
    } = this.props
    const imgLogo =
      deployment(
        `${siteUrl}${contextPath}/resources/dist/${arcSite}/images/logo-amp.png`
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
                  width="73"
                  height="51"
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

  render() {
    return (
      <>
        {this.renderNavBar()}
        {this.renderNavBarHeader()}
      </>
    )
  }
}

LayoutNavbar.propTypes = {
  customFields: PropTypes.shape({
    selectDesing: PropTypes.oneOf(['standard', 'somos']).tag({
      name: 'Modelo de barra de navegación',
      labels: {
        standard: 'Barra de navegación estándar',
        somos: 'Barra de navegación somos',
      },
      defaultValue: 'standard',
    }),
    showInDesktop: PropTypes.bool.tag({
      name: 'Mostrar en desktop',
      defaultValue: true,
    }),
    showInTablet: PropTypes.bool.tag({
      name: 'Mostrar en tablet',
      defaultValue: true,
    }),
    showInMobile: PropTypes.bool.tag({
      name: 'Mostrar en móviles ',
      defaultValue: true,
    }),
  }),
}
LayoutNavbar.label = 'Barra de Navegación'
export default LayoutNavbar
