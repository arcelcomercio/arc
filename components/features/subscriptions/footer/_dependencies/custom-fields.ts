import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  type: PropTypes.oneOf([
    'login',
    'registro',
    'payment',
    'landing',
    'pages',
  ]).tag({
    name: 'Tipo de plantilla',
    defaultValue: 'landing',
  }),
})

export default customFields
