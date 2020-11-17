import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  hideAnchor: PropTypes.bool.tag({
    name: 'Ocultar boton para subir',
    defaultValue: false,
  }),
})

export default customFields
