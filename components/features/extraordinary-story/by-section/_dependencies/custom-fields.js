import PropTypes from 'prop-types'
import customFieldsParent from '../../_dependencies/custom-fields'

const customFieldsSection = {
  sectionName: PropTypes.string.tag({
    name: 'SLUG',
    description: 'seccion o content path',
    hidden: false,
  }),
  positionData: PropTypes.number.tag({
    name: 'Posición inicial ',
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
