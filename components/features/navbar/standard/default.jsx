import Consumer from 'fusion:consumer'
import * as React from 'react'
import PropTypes from 'prop-types'

import NavBarComercio from './_children/standard'
import Formatter from './_dependencies/formatter'

@Consumer
class LayoutNavbar extends React.PureComponent {
  constructor(props) {
    super(props)
    const {
      contextPath,
      arcSite,
      deployment,
      siteProperties: {
        assets: { nav },
      },
    } = this.props

    this.formatter = new Formatter({
      deployment,
      contextPath,
      nav,
      arcSite,
    })
    this.fetchContent({
      navbarData: {
        source: 'navigation-by-hierarchy',
        query: { hierarchy: 'navbar-default' },
        filter: this.formatter.getSchema(),
      },
    })
  }

  getDataNavBarData = () => {
    const { params, source } = this.formatter.main().fetch().config
    /** Solicita la data a la API y setea los resultados en "state.data" */
    this.fetchContent({
      data: {
        source,
        query: params,
        filter: this.formatter.getSchema(),
      },
    })
  }

  render() {
    const {
      customFields: {
        showInDesktop = true,
        showInTablet = true,
        showInMobile = true,
        hideMenu,
      } = {},
    } = this.props
    const { data = [], navbarData = [] } = this.state || {}
    return (
      <NavBarComercio
        deviceList={{ showInDesktop, showInTablet, showInMobile }}
        data={data}
        hideMenu={hideMenu}
        navbarData={navbarData}
        getDataNavBarData={this.getDataNavBarData}
        {...this.formatter.main().initParams()}
      />
    )
  }
}

LayoutNavbar.propTypes = {
  customFields: PropTypes.shape({
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
      name: 'Mostrar en m??viles ',
      defaultValue: true,
    }),
  }),
}

LayoutNavbar.label = 'Barra de Navegaci??n - Est??ndar'

export default LayoutNavbar
