import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  block: PropTypes.bool.tag({
    name: 'Bloque',
    defaultValue: false,
  }),
  inlineBlock: PropTypes.bool.tag({
    name: 'Bloque lineal',
    defaultValue: false,
  }),
})

export default customFields
