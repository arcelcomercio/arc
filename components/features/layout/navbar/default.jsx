import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

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
      customFields: { selectDesing },
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
      selectDesing
    )
    if (this.formater.main.fetch !== false) {
      const { params, source } = this.formater.main.fetch.config
      this.fetchContent({
        data: {
          source,
          query: params,
          filter: this.formater.getSchema(),
        },
      })
    } else this.state = { data: {} }
  }

  renderNavBar() {
    const { customFields: { selectDesing } = {} } = this.props
    const { data } = this.state
    const NavBarType = {
      standard: (
        <NavBarComercio data={data} {...this.formater.main.initParams} />
      ),
      somos: <NavbarChildSomos {...this.formater.main.initParams} />,
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
  }),
}

BarraTest.label = 'Barra de Navegación'
export default BarraTest
