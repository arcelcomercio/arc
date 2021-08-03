import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import PropTypes from 'prop-types'
import * as React from 'react'

import { getAssetsPath } from '../../../utilities/assets'
import getFooterProperties from '../../footer/_dependencies/properties'
import StoryFooter from './_lite/_children/story'

const LayoutFooter = () => {
  const { arcSite, contextPath } = useAppContext()

  const { assets: { footer: { logo } = {} } = {} } = getProperties(arcSite)

  const logoUrl =
    `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/dist/${arcSite}/images/${logo}?d=1` || ''

  const { footer: { story } = {} } = getFooterProperties(arcSite)

  return <StoryFooter story={story} logoUrl={logoUrl} arcSite={arcSite} />
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
