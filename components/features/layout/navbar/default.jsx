import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Schema from './_dependencies/schema'

import NavBarComercio from './_children/standard'
import NavbarChildSomos from './_children/somos'

import Formater from './_dependencies/formater'

@Consumer
class BarraTest extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      sections: '',
    }
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
  }

  componentDidMount() {
    console.log(this.formater.main.fetchSections())

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
    fetched.then(response => {
      this.setState({
        sections: response || {},
      })
    })
  }

  renderNavBar = (brand, data) => {
    const { deployment, contextPath, arcSite, siteProperties } = this.props
    const { sections } = this.state

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
    }
    return NavBarType[brand] || NavBarType.standard
  }

  render() {
    const { customFields: { selectDesing } = {} } = this.props
    const { sections } = this.state
    return sections && this.renderNavBar(selectDesing, sections)
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
