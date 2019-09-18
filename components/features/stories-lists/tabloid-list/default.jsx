import React from 'react'
import PropTypes from 'prop-types'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import TabloidListChild from './_children/story-tabloid'
import schemaFilter from './_dependencies/filter-schema'

const TabloidList = props => {
  const { arcSite, contextPath, deployment } = useFusionContext()
  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
      seeMoreLink,
      columns = '2col',
    } = {},
  } = props
  const data =
    useContent({
      source: contentService,
      query: contentConfigValues,
      filter: schemaFilter(arcSite),
    }) || {}
  const params = {
    data: data.content_elements,
    seeMoreLink,
    arcSite,
    contextPath,
    deployment,
    columns,
  }
  return <TabloidListChild {...params} />
}

TabloidList.static = true
TabloidList.label = 'Listado Tabloide'

TabloidList.propTypes = {
  customFields: PropTypes.shape({
    storyConfig: PropTypes.contentConfig('stories').isRequired.tag({
      name: 'Configuración del contenido',
    }),
    seeMoreLink: PropTypes.string.isRequired.tag({
      name: 'Link de "Ver Más"',
      description:
        'Cree el link a donde redirige ver mas. Ej. /archivo/seccion',
    }),
    columns: PropTypes.oneOf(['col2', 'col3', 'col4', 'col5']).tag({
      name: 'Número de columnas',
      labels: {
        col2: '2 columnas',
        col3: '3 columnas',
        col4: '4 columnas',
        col5: '5 columnas',
      },
      defaultValue: 'col2',
    }),
  }),
}

export default TabloidList
