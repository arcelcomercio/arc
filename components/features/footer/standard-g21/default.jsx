import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import FooterChildStandardG21 from './_children/footer-g21'

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
class FooterStandardG21 extends PureComponent {
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

  render() {
    const {
      deployment,
      contextPath,
      arcSite,
      siteProperties: {
        gecSites,
        legalLinks,
        footer: { socialNetworks = [], siteLegal, story },
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
      siteLegal,
      logoUrl,
      sections,
      arcSite,
      story,
    }

    return <FooterChildStandardG21 {...params} />
  }
}

FooterStandardG21.label = 'Pie de Página - G21'
FooterStandardG21.static = true

FooterStandardG21.propTypes = {
  customFields: PropTypes.shape({
    sectionsHierarchyConfig: PropTypes.contentConfig('navigation').tag({
      name: 'Editar navegación de "secciones"',
      group: 'Configuración del contenido',
    }),
  }),
}

export default FooterStandardG21
