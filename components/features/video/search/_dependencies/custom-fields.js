import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  label: PropTypes.string.tag({
    name: 'Etiqueta',
    defaultValue: 'Videos',
  }),
  inputLabel: PropTypes.string.tag({
    name: 'Etiqueta de textfield',
    defaultValue: 'Buscar video',
  }),
})

export default customFields
