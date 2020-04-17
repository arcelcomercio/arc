import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import NavBarAmp from '../standard/_children/amp'

import Formatter from './_dependencies/formatter'

@Consumer
class LayoutNavbarAmp extends PureComponent {
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
    this.state = {
      data: {},
    }

    const { params = {}, source = '' } =
      this.formatter.main().fetch().config || {}
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
    const { data } = this.state
    return <NavBarAmp data={data} {...this.formatter.main().initParams()} />
  }
}

LayoutNavbarAmp.propTypes = {
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
LayoutNavbarAmp.label = 'Barra de Navegación - Estándar'

export default LayoutNavbarAmp
