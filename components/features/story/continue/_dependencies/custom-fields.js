import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  isBlog: PropTypes.bool.tag({
    name: 'Blog',
    defaultValue: false,
  }),
  activeAnchor: PropTypes.bool.tag({
    name: 'Activar ancla al inicio',
    defaultValue: true,
    description: 'Disponible para lite, por ahora.'
  }),
})

export default customFields
