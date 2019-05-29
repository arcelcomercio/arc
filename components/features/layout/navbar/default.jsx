import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { setDevice } from '../../../utilities/resizer'

import NavBarComercio from './_children/standard'
import NavbarChildSomos from './_children/somos'

import Formater from './_dependencies/formater'

@Consumer
class BarraTest extends PureComponent {
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
      customFields,
    } = this.props
    this.formater = new Formater(
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
      device: setDevice(),
    }
    if (this.formater.main.fetch !== false) {
      const { params, source } = this.formater.main.fetch.config
      this.fetchContent({
        data: {
          source,
          query: params,
          filter: this.formater.getSchema(),
        },
      })
    }
  }

  componentDidMount() {
    const { device } = this.state
    this.addEventListener('displayChange', this._handleDevice)

    // ------ Sets scroll eventListener if device is desktop
    if (device === 'desktop')
      window.addEventListener('scroll', this._handleScroll)
  }

  // ------ Sets the new device state when the listener is activated
  _handleDevice = device => {
    this.setState({
      device,
    })
    this._handleScroll()
    // ------ Add or remove Scroll eventListener on resize
    if (device === 'desktop')
      window.addEventListener('scroll', this._handleScroll)
    else window.removeEventListener('scroll', this._handleScroll)
  }

  renderNavBar() {
    const {
      customFields: {
        selectDesing,
        showInDesktop,
        showInTablet,
        showInMobile,
      } = {},
    } = this.props
    const { data, device } = this.state
    const NavBarType = {
      standard: (
        <NavBarComercio
          deviceList={{ showInDesktop, showInTablet, showInMobile }}
          device={device}
          data={data}
          {...this.formater.main.initParams}
        />
      ),
      somos: (
        <NavbarChildSomos
          deviceList={{ showInDesktop, showInTablet, showInMobile }}
          device={device}
          {...this.formater.main.initParams}
        />
      ),
    }
    return NavBarType[selectDesing] || NavBarType.standard
  }

  render() {
    return this.renderNavBar()
  }
}

BarraTest.propTypes = {
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
      group: 'Administrar visibilidad',
      defaultValue: true,
    }),
    showInTablet: PropTypes.bool.tag({
      name: 'Mostrar en tablet',
      group: 'Administrar visibilidad',
      defaultValue: true,
    }),
    showInMobile: PropTypes.bool.tag({
      name: 'Mostrar en móviles ',
      group: 'Administrar visibilidad',
      defaultValue: true,
    }),
  }),
}

BarraTest.label = 'Barra de Navegación'
export default BarraTest
