import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  seeMoreLink: PropTypes.string.tag({ name: 'Link de Ver Mas' }),
})

export default customFields
