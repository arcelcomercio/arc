// import PropTypes from 'prop-types'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import PropTypes from 'prop-types'
import React from 'react'

import { getAssetsPath } from '../../../utilities/assets'
import getFooterProperties from '../../footer/_dependencies/properties'
import SecondaryFooter from './_children/secondary'
import StandardFooter from './_children/standard'
import StoryFooter from './_children/story'

/**
 * TODO: Este feature que controla distintos componentes debe ser
 * separado en distintos features, un por cada diseño, de esta manera
 * se logra cargar sólo el código necesario para cada vista.
 *
 * Este trabajo ya se inicio y hay varios disenos en features/footer/...
 * el trabajo debe completarse.
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

const LayoutFooter = (props) => {
  const {
    customFields: {
      sectionsHierarchyConfig: {
        contentConfigValues: { hierarchy: sectionsHierarchy = '' } = {},
      } = {},
      footerType,
      isBook,
      bookUrl,
    } = {},
  } = props

  const { contextPath, arcSite, isAdmin } = useFusionContext()

  const {
    gecSites,
    legalLinks,
    socialNetworks = [],
    assets: { footer: { logo } = {} } = {},
  } = getProperties(arcSite)

  const {
    footer: { contacts = [], siteLegal, story } = {},
  } = getFooterProperties(arcSite)

  const sections = useContent({
    source: CONTENT_SOURCE,
    query: {
      hierarchy: sectionsHierarchy || DEFAULT_HIERARCHY,
    },
    filter: SCHEMA,
  })

  const formatData = (res) => {
    const { children = [] } = res || {}
    const auxList = children.map((el) => {
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
    `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/dist/${arcSite}/images/${logo}?d=1` || ''

  const bookLogo =
    `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/assets/footer/libro-reclamacion.jpg?d=1` || ''

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
    isBook,
    bookUrl,
    bookLogo,
    isAdmin,
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
    isBook: PropTypes.bool.tag({
      name: 'Activar Libro de Reclamaciones',
      group: 'Extras',
    }),
    bookUrl: PropTypes.string.tag({
      name: 'URL Libro de Reclamaciones',
      group: 'Extras',
    }),
  }),
}

export default LayoutFooter
