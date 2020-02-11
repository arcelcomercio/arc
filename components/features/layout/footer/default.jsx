// import PropTypes from 'prop-types'
import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import PropTypes from 'prop-types'

import StandardFooter from './_children/standard'
import SecondaryFooter from './_children/secondary'
import StoryFooter from './_children/story'
import { getAssetsPath } from '../../../utilities/constants'

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

const LayoutFooter = props => {
  const {
    customFields: {
      sectionsHierarchyConfig: {
        contentConfigValues: { hierarchy: sectionsHierarchy = '' } = {},
      } = {},
      footerType,
    } = {},
  } = props

  const { deployment, contextPath, arcSite } = useFusionContext()

  const {
    gecSites,
    legalLinks,
    footer: { socialNetworks = [], contacts = [], siteLegal, story },
    assets: { footer: { logo } = {} } = {},
  } = getProperties(arcSite)

  const sections = useContent({
    source: CONTENT_SOURCE,
    query: {
      hierarchy: sectionsHierarchy || DEFAULT_HIERARCHY,
    },
    filter: SCHEMA,
  })

  const formatData = res => {
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

  const logoUrl =
    deployment(
      `${getAssetsPath(
        arcSite,
        contextPath
      )}/resources/dist/${arcSite}/images/${logo}`
    ) || ''

  const formattedSections = sections && formatData(sections)

  const params = {
    socialNetworks,
    gecSites,
    legalLinks,
    contacts,
    siteLegal,
    logoUrl,
    sections: formattedSections,
    arcSite,
    story,
  }

  const footers = {
    standard: <StandardFooter {...params} />,
    secondary: <SecondaryFooter {...params} />,
    story: <StoryFooter {...params} />,
  }
  return footers[footerType] || footers.standard
}

LayoutFooter.label = 'Pie de Página'
LayoutFooter.static = true

LayoutFooter.propTypes = {
  customFields: PropTypes.shape({
    footerType: PropTypes.oneOf(['standard', 'secondary', 'story']).tag({
      name: 'Diseño del Pie de página',
      labels: {
        standard: 'Footer estándar',
        secondary: 'Footer 2',
        story: 'Footer - Notas',
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
