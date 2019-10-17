// import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import StandardFooter from './_children/standard'
import SecondaryFooter from './_children/secondary'
import StoryFooter from './_children/story'
import SectionsFooter from './_children/sections'

/**
 * TODO: Este feature que controla distintos componentes debe ser
 * separado en distintos features, un por cada diseño, de esta manera
 * se logra cargar sólo el código necesario para cada vista.
 */

const DEFAULT_HIERARCHY = 'footer-default'

const CONTENT_SOURCE = 'navigation-by-hierarchy'

const SCHEMA = `{ 
  children {
    name
    _id
    display_name
    url
    node_type
  }
}`

@Consumer
class LayoutFooter extends PureComponent {
  constructor(props) {
    super(props)
    const {
      customFields: {
        sectionsHierarchyConfig: {
          contentConfigValues: { hierarchy: sectionsHierarchy = '' } = {},
        } = {},
      } = {},
    } = this.props

    this.fetchContent({
      sections: {
        source: CONTENT_SOURCE,
        query: {
          hierarchy: sectionsHierarchy || DEFAULT_HIERARCHY,
        },
        filter: SCHEMA,
      },
    })
  }

  formatData = res => {
    const { children = [] } = res || {}
    const auxList = children.map(el => {
      if (el.node_type === 'link') {
        return {
          name: el.display_name,
          url: el.url,
          node_type: el.node_type,
        }
      }
      return {
        name: el.name,
        url: el._id,
        node_type: el.node_type,
      }
    })
    return auxList
  }

  getFooterDesign = () => {
    const {
      deployment,
      contextPath,
      arcSite,
      customFields: { footerType } = {},
      siteProperties: {
        gecSites,
        legalLinks,
        footer: { socialNetworks = [], contacts = [], siteLegal, story },
        assets: { footer: { logo } = {} } = {},
      },
    } = this.props

    const logoUrl =
      deployment(`${contextPath}/resources/dist/${arcSite}/images/${logo}`) ||
      ''

    const { sections: rawSections = [] } = this.state || {}
    const sections = rawSections && this.formatData(rawSections)

    const params = {
      socialNetworks,
      gecSites,
      legalLinks,
      contacts,
      siteLegal,
      logoUrl,
      sections,
      arcSite,
      story,
    }

    const footers = {
      standard: <StandardFooter {...params} />,
      secondary: <SecondaryFooter {...params} />,
      story: <StoryFooter {...params} />,
      sectionsFooter:<SectionsFooter {...params} />,
    }
    return footers[footerType] || footers.standard
  }

  render() {
    return this.getFooterDesign()
  }
}

LayoutFooter.label = 'Pie de Página'
LayoutFooter.static = true

LayoutFooter.propTypes = {
  customFields: PropTypes.shape({
    footerType: PropTypes.oneOf(['standard', 'secondary', 'story','sectionsFooter']).tag({
      name: 'Diseño del Pie de página',
      labels: {
        standard: 'Footer estándar',
        secondary: 'Footer 2',
        story: 'Footer - Notas',
        sectionsFooter:'Footer por secciones'
      },
      defaultValue: 'standard',
    }),
    sectionsHierarchyConfig: PropTypes.contentConfig('navigation').tag({
      name: 'Editar navegación de "secciones"',
      group: 'Configuración del contenido',
    }),
  }),
}

export default LayoutFooter
