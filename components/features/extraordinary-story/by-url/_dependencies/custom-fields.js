import PropTypes from 'prop-types'
import customFieldsParent from '../../_dependencies/custom-fields'

const customFieldsSection = {
  link: PropTypes.string.isRequired.tag({
    name: 'SLUG',
    description: 'URL sin dominio',
  }),
}

const customFields = PropTypes.shape({
  ...customFieldsSection,
  ...customFieldsParent,
})
export default customFields
