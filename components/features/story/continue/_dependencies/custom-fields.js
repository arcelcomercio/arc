import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  isBlog: PropTypes.bool.tag({
    name: 'Blog',
    defaultValue: false,
  }),
})

export default customFields
