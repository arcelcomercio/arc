import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  newDesign: PropTypes.bool.tag({
    name: 'Nuevo diseño',
    defaultValue: false,
  }),
})

export default customFields
