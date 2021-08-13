import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  redirectUrl: PropTypes.string.tag({
    name: 'Redireccionar a URL',
    description:
      'Sólo puedes seleccionar una de las dos opciones de redirección. Si seleccionas ambas, la URL tiene mayor prioridad.',
  }),
  redirectOutputType: PropTypes.string.tag({
    name: 'Redireccionar a outputType',
    description:
      'Sólo puedes seleccionar una de las dos opciones de redirección. Si seleccionas ambas, la URL tiene mayor prioridad.',
  }),
})

export default customFields
