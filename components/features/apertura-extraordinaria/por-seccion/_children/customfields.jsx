import PropTypes from 'prop-types'
import customFieldsParent from '../../_children/customfields'

const customFieldsSection = {
  content: PropTypes.label.tag({
    name: 'Contenido',
  }),
  sectionName: PropTypes.string.tag({
    name: 'Slug de la sección',
    description: 'Agregar un slash(/) antes del nombre de la sección, ejm: /deportes .',
    hidden: false,
  }),
  positionData: PropTypes.number.tag({
    name: 'Posición de la nota de la sección',
    description: 'El primer item es cero(0).',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 0,
    hidden: false,
  }),
}

const customFields = PropTypes.shape({
  ...customFieldsSection,
  ...customFieldsParent,
})
export default customFields
