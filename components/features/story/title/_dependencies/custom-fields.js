import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  ampAdjson: PropTypes.string.tag({
    name: 'json',
    group: 'AMP',
  }),
  ampAdName: PropTypes.string.tag({
    name: 'Nombre',
    group: 'AMP',
  }),
  ampAdDimensions: PropTypes.string.tag({
    name: 'Dimensiones',
    group: 'AMP',
  }),
})

export default customFields
