import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'
import * as React from 'react'

import NavBarComercio from '../../navbar/standard/_children/standard'
import NavbarChildSomos from './_children/somos'
import Formatter from './_dependencies/formatter'

/**
 * TODO: Este feature que controla distintos componentes debe ser
 * separado en distintos features, un por cada diseño, de esta manera
 * se logra cargar sólo el código necesario para cada vista.
 */

@Consumer
class LayoutNavbar extends React.PureComponent {
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
    this.formatter = new Formatter(
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
    const {
      customFields: { selectDesing },
    } = this.props || {}
    if (selectDesing === 'standard') {
      this.fetchContent({
        navbarData: {
          source: 'navigation-by-hierarchy',
          query: { hierarchy: 'navbar-default' },
          filter: this.formatter.getSchema(),
        },
      })
    }
    // this.getDataHierarchy = this.getDataHierarchy.bind(this)

    // Hierarchy independiente para el menú
    // const { selectDesing } = customFields || {}
    // if (selectDesing === 'standard') {
    //   this.fetchContent({
    //     navbarData: {
    //       source: 'navigation-by-hierarchy',
    //       query: { hierarchy: 'navbar-default' },
    //       filter: this.formatter.getSchema(),
    //     },
    //   })
    // }
  }

  // getDataHierarchy(){
  //   const { customFields:{selectDesing} } = this.props || {}
  //   if (selectDesing === 'standard') {
  //     this.fetchContent({
  //       navbarData: {
  //         source: 'navigation-by-hierarchy',
  //         query: { hierarchy: 'navbar-default' },
  //         filter: this.formatter.getSchema(),
  //       },
  //     })
  //   }
  // }

  getDataNavBarData = () => {
    if (this.formatter.main.fetch !== false) {
      const { params, source } = this.formatter.main.fetch.config
      /** Solicita la data a la API y setea los resultados en "state.data" */
      this.fetchContent({
        data: {
          source,
          query: params,
          filter: this.formatter.getSchema(),
        },
      })
    }
  }

  renderNavBar() {
    const {
      requestUri,
      customFields: {
        selectDesing,
        showInDesktop = true,
        showInTablet = true,
        showInMobile = true,
        hideMenu,
      } = {},
    } = this.props
    const { data = [], navbarData = [] } = this.state || {}

    const NavBarType = {
      standard: (
        <NavBarComercio
          deviceList={{ showInDesktop, showInTablet, showInMobile }}
          data={data}
          hideMenu={hideMenu}
          navbarData={navbarData}
          getDataNavBarData={this.getDataNavBarData}
          requestUri={requestUri}
          {...this.formatter.main.initParams}
        />
      ),
      somos: (
        <NavbarChildSomos
          deviceList={{
            showInDesktop,
            showInTablet,
            showInMobile,
          }}
          requestUri={requestUri}
          {...this.formatter.main.initParams}
        />
      ),
    }
    return NavBarType[selectDesing] || NavBarType.standard
  }

  render() {
    return this.renderNavBar()
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
    customLogoTitle: PropTypes.string.tag({
      name: 'Title y alt de la imagen',
    }),
    hideMenu: PropTypes.bool.tag({
      name: 'Ocultar menu',
      defaultValue: true,
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
