import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  reverseDesktop: PropTypes.bool.tag({
    name: 'Revertir orden en Desktop',
    defaultValue: false,
  }),
})

export default customFields
