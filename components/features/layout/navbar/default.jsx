import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Schema from './_dependencies/schema'
import NavBarComercio from './_children/navbar-comercio'
import NavBarDepor from './_children/navbar-depor'
import NavBarTrome from './_children/navbar-trome'

@Consumer
class BarraTest extends Component {
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
      .catch(e => console.log(e))
  }

  renderNavBar = (brand, data) => {
    const NavBarType = {
      comercio: <NavBarComercio data={data} />,
      depor: <NavBarDepor data={data} />,
      trome: <NavBarTrome data={data} />,
    }
    return NavBarType[brand] || NavBarType.comercio
  }

  render() {
    const { customFields: { selectDesing } = {} } = this.props
    const { services } = this.state
    return services && this.renderNavBar(selectDesing, services)
  }
}

BarraTest.propTypes = {
  customFields: PropTypes.shape({
    selectDesing: PropTypes.oneOf(['comercio', 'depor', 'trome']).tag({
      name: 'Modelo de NavBar',
      labels: {
        comercio: 'comercio',
        depor: 'depor',
        trome: 'trome',
      },
      defaultValue: 'comercio',
    }),
  }),
}

BarraTest.label = 'Barra de Navegacion'
export default BarraTest
