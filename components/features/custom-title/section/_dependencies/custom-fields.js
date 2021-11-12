import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  textAlign: PropTypes.oneOf(['left', 'center', 'right']).tag({
    name: 'Alineación del texto',
    labels: {
      left: 'Izquierda',
      center: 'Centro',
      right: 'Derecha',
    },
    defaultValue: 'center',
  }),
  customText: PropTypes.string.tag({
    name: 'Título personalizado',
  }),
  isUppercase: PropTypes.bool.tag({
    name: 'Texto en mayúsculas',
  }),
})

export default customFields
