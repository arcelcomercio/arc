import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  activeAnchor: PropTypes.bool.tag({
    name: 'Activar ancla al inicio',
    defaultValue: true,
    description: 'Disponible para lite, por ahora.',
  }),
})

export default customFields
