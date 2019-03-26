import PropTypes from 'prop-types'
import customFieldsParent from '../../_children/customfields'

const customFieldsSection = {
  content: PropTypes.label.tag({
    name: 'Contenido',
  }),
  link: PropTypes.string.isRequired.tag({
    name: 'Link de nota interna',
  }),
}

const customFields = PropTypes.shape({
  ...customFieldsSection,
  ...customFieldsParent,
})
export default customFields
