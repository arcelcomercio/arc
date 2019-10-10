import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import NavBarAmp from '../../layout/navbar/_children/amp'
import HeaderAmp from './_children/header-amp'

import Formatter from '../../layout/navbar/_dependencies/formatter'

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
    const { customFields: { selectDesing } = {} } = this.props
    const { data } = this.state
    const NavBarType = {
      standard: <NavBarAmp data={data} {...this.formater.main.initParams} />,
    }
    return NavBarType[selectDesing] || NavBarType.standard
  }

  renderHeaderAmp() {
    return <HeaderAmp {...this.props} />
  }

  render() {
    return (
      <>
        {this.renderNavBar()}
        {this.renderHeaderAmp()}
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
