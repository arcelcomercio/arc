import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  size: PropTypes.number.tag({
    name: 'Cantidad de elementos por página',
    max: 100,
    min: 0,
    step: 1,
  }),
})

export default customFields
