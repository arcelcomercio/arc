import PropTypes from 'prop-types'
import customFieldsParent from '../_children/customfields'

const customFieldsSection = {
  content: PropTypes.label.tag({
    name: 'Contenido',
  }),
  sectionName: PropTypes.string.tag({
    name: 'Slug de la sección',
    hidden: false,
  }),
  positionData: PropTypes.string.tag({
    name: 'Posición de la nota de la sección',
    hidden: false,
  }),
}

const customFields = PropTypes.shape({
  ...customFieldsSection,
  ...customFieldsParent,
})
export default customFields
