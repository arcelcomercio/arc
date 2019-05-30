import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { setDevice } from '../../../utilities/resizer'

import NavBarComercio from './_children/standard'
import NavbarChildSomos from './_children/somos'

import Formatter from './_dependencies/formatter'

@Consumer
class BarraTest extends PureComponent {
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
      device: setDevice(),
    }
    if (this.formater.main.fetch !== false) {
      const { params, source } = this.formater.main.fetch.config
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

  componentDidMount() {
    this.addEventListener('displayChange', this._handleDevice)
  }

  /** Actualiza el "state.device" cuando el listener acciona  */

  _handleDevice = device => {
    this.setState({
      device,
    })
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
