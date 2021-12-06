import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  nameSection: PropTypes.string.tag({
    name: 'Nombre de sección a mostrar',
    defaultValue: 'Videos',
  }),
  urlSection: PropTypes.string.tag({
    name: 'URL de sección a mostrar',
    defaultValue: '/videos',
  }),
})

export default customFields
