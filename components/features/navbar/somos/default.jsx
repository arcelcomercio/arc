import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import NavbarChildSomos from './_children/somos'
import Formatter from './_dependencies/formatter'

@Consumer
class LayoutNavbar extends PureComponent {
  constructor(props) {
    super(props)
    const {
      contextPath,
      arcSite,
      deployment,
      siteProperties: {
        siteDomain,
        assets: { nav },
      },
    } = this.props
    this.formatter = new Formatter({
      deployment,
      contextPath,
      siteDomain,
      nav,
      arcSite,
    })
  }

  render() {
    const {
      customFields: {
        showInDesktop = true,
        showInTablet = true,
        showInMobile = true,
      } = {},
    } = this.props

    return (
      <NavbarChildSomos
        {...{ showInDesktop, showInTablet, showInMobile }}
        {...this.formatter.initParams()}
      />
    )
  }
}

LayoutNavbar.propTypes = {
  customFields: PropTypes.shape({
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

LayoutNavbar.label = 'Barra de Navegación - Somos'

export default LayoutNavbar
