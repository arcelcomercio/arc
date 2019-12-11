import PropTypes from 'prop-types'
import { customFieldsAdsList } from '../../_dependencies/custom-fields'

const customFields = PropTypes.shape({
  storyConfig: PropTypes.contentConfig('stories').isRequired.tag({
    name: 'Configuración del contenido',
  }),
  seeMoreLink: PropTypes.string.isRequired.tag({
    name: 'Link de Ver Mas',
    description: 'Cree el link a donde redirige ver mas. Ej. /archivo/seccion',
  }),
  link: PropTypes.oneOf(['author', 'seccion']).tag({
    name: 'Indicar Enlace Superior de nota',
    labels: {
      author: 'Autor',
      seccion: 'Sección',
    },
    defaultValue: 'seccion',
  }),
  ...customFieldsAdsList,
})

export default customFields
