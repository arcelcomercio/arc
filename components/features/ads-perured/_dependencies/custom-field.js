import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  isDesktop: PropTypes.bool.tag({
    name: 'Mostrar en "Desktop"',
  }),
  isMobile: PropTypes.bool.tag({
    name: 'Mostrar en "Mobile"',
  }),
})

export default customFields
