import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  messageNull: PropTypes.string.tag({
    name: 'Mensaje por 0 puntos',
  }),
  messagePoor: PropTypes.string.tag({
    name: 'Mensaje por llegar a 50% de puntos',
  }),
  messageGood: PropTypes.string.tag({
    name: 'Mensaje por puntos entre 50% y 99%',
  }),
  messagePerfect: PropTypes.string.tag({
    name: 'Mensaje por puntaje perfecto',
  }),
})

export default customFields
