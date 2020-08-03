import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  size: PropTypes.number.tag({
    name: 'Cantidad de autores',
    max: 25,
    min: 1,
    step: 1,
  }),
})

export default customFields
