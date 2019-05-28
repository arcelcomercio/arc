import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Schema from './_dependencies/schema'

import NavBarComercio from './_children/standard'
import NavbarChildSomos from './_children/somos'

import NavBarDepor from './_children/navbar-depor'
import NavBarTrome from './_children/navbar-trome'

@Consumer
class BarraTest extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      services: '',
    }
  }

  componentDidMount() {
    this.fetch()
  }

  // ------ Fetchs the sections data from site-navigation API
  fetch() {
    const { arcSite } = this.props

    const source = 'navigation-by-hierarchy'
    const params = {
      website: arcSite,
      hierarchy: 'navbar-header-sections',
    }

    const { fetched } = this.getContent(source, params, Schema)
    fetched
      .then(response => {
        this.setState({
          services: response || {},
        })
      })
      .catch(e => {
        throw new Error(e)
      })
  }

  renderNavBar = (brand, data) => {
    const { deployment, contextPath, arcSite, siteProperties } = this.props
    const {
      assets: {
        nav: { logo },
      },
    } = siteProperties
    const logoUrl =
      deployment(`${contextPath}/resources/dist/${arcSite}/images/${logo}`) ||
      ''
    const NavBarType = {
      standard: <NavBarComercio data={data} logo={logoUrl} />,
      somos: <NavbarChildSomos />,
      depor: <NavBarDepor data={data} logo={logoUrl} />,
      trome: <NavBarTrome data={data} logo={logoUrl} />,
    }
    return NavBarType[brand] || NavBarType.standard
  }

  render() {
    const { customFields: { selectDesing } = {} } = this.props
    const { services } = this.state
    return services && this.renderNavBar(selectDesing, services)
  }
}

BarraTest.propTypes = {
  customFields: PropTypes.shape({
    selectDesing: PropTypes.oneOf(['standard', 'somos', 'depor', 'trome']).tag({
      name: 'Modelo de barra de navegación',
      labels: {
        standard: 'Barra de navegación estándar',
        somos: 'Barra de navegación somos',
        depor: 'depor',
        trome: 'trome',
      },
      defaultValue: 'standard',
    }),
  }),
}

BarraTest.label = 'Barra de Navegación'
export default BarraTest
