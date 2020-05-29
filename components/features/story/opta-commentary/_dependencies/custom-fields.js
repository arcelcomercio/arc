import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  intervalTime: PropTypes.number.isRequired.tag({
    name: 'Intervalo de tiempo de actualizacion',
    description:
      'Intervalo de tiempo en minutos para actualizar los resultados del partido ',
  }),
})

export default customFields
