import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Menu from './_children/menu'

import Formatter from '../navbar/_dependencies/formatter'

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
        footer: { socialNetworks },
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
        socialNetworks,
        getContent: this.getContent,
      },
      customFields
    )
    this.state = {
      data: {},
    }
    if (this.formater.main.fetch !== false) {
      const { params = {} , source = '' } = this.formater.main.fetch.config || {}
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
    const { data } = this.state
    const {
      contextPath,
      arcSite,
      deployment,
      siteProperties: {
        footer: { socialNetworks },
        siteUrl,
      },
    } = this.props

    const parameters = {
      contextPath,
      deployment,
      socialNetworks,
      arcSite,
      siteUrl,
    }

    const NavBarType = {
      standard: <Menu data={data} {...parameters} />,
    }
    return NavBarType.standard
  }

  render() {
    return this.renderNavBar()
  }
}

LayoutNavbar.propTypes = {
  customFields: PropTypes.shape({
    selectDesing: PropTypes.oneOf(['standard']).tag({
      name: 'Modelo de barra de navegación',
      labels: {
        standard: 'Barra de navegación estándar',
        somos: 'Barra de navegación somos',
      },
      defaultValue: 'standard',
    }),
  }),
}
LayoutNavbar.label = 'Barra de Navegación'
export default LayoutNavbar
