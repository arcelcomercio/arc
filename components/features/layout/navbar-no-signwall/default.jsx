import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import NavBarComercio from './_children/standard'
import NavbarChildSomos from './_children/somos'

import Formatter from './_dependencies/formatter'

/**
 * TODO: Este feature que controla distintos componentes debe ser
 * separado en distintos features, un por cada diseño, de esta manera
 * se logra cargar sólo el código necesario para cada vista.
 */

@Consumer
class LayoutNoSignwall extends PureComponent {
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

  componentDidMount() {
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
  }

  formatData = (datas = {}) => {
    const LINK = 'link'
    const { children = [] } = datas || {}
    return children.map(child => {
      let name = child.node_type === LINK ? child.display_name : child.name
      const rawMatch = name.match(/\[#.*\]/g)
      const match =
        rawMatch === null
          ? []
          : rawMatch[0]
              .replace('[', '')
              .replace(']', '')
              .split(',')
      if (match) {
        name = name.replace(/\[#.*\]/g, '')
      }
      return {
        name,
        url: child.node_type === LINK ? child.url : child._id,
        styles: match,

        children: child.children,
        _id: child._id,
        display_name: child.display_name,
      }
    })
  }

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
      customFields: {
        selectDesing,
        showInDesktop = true,
        showInTablet = true,
        showInMobile = true,
        hideMenu,
      } = {},
    } = this.props
    const { data = [], navbarData = [] } = this.state || {}

    const dataFormat = {
      children: this.formatData(data),
    }

    const NavBarType = {
      standard: (
        <NavBarComercio
          deviceList={{ showInDesktop, showInTablet, showInMobile }}
          data={dataFormat}
          hideMenu={hideMenu}
          navbarData={navbarData}
          getDataNavBarData={this.getDataNavBarData}
          {...this.formatter.main.initParams}
        />
      ),
      somos: (
        <NavbarChildSomos
          deviceList={{ showInDesktop, showInTablet, showInMobile }}
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

LayoutNoSignwall.propTypes = {
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
LayoutNoSignwall.label = 'Barra de Navegación Sin Signwall'
export default LayoutNoSignwall
