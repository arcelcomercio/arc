import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  textAlign: PropTypes.oneOf(['start', 'center', 'end']).tag({
    name: 'Alineación del texto',
    labels: {
      start: 'Izquierda',
      center: 'Centro',
      end: 'Derecha',
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
