import PropTypes from 'prop-types'
import { customFieldsAdsList } from '../../_dependencies/custom-fields'

const customFields = PropTypes.shape({
  storyConfig: PropTypes.contentConfig('story').isRequired.tag({
    name: 'Configuración del contenido',
  }),
  ...customFieldsAdsList,
})

export default customFields
