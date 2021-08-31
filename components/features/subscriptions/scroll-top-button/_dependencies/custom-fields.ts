import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  gap: PropTypes.number.tag({
    name: 'Alto en pixeles para que sea visible el botón',
    defaultValue: 150,
    max: 1000,
    min: 150,
    step: 1,
  }),
})

export default customFields
