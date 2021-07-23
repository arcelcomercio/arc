import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  title: PropTypes.string.tag({
    name: 'Título ',
    description: 'Título ',
  }),
  url: PropTypes.string.tag({
    name: 'Url de redireccion ',
    description: 'Url de redireccion ',
  }),
})

export default customFields
