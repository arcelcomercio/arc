import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  customText: PropTypes.string.tag({
    name: 'Título personalizado',
  }),
  isUppercase: PropTypes.bool.tag({
    name: 'Texto en mayúsculas',
  }),
})

export default customFields
