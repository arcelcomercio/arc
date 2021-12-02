import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  newDesign: PropTypes.bool.tag({
    name: 'Nuevo diseño',
    defaultValue: false,
  }),
  isBook: PropTypes.bool.tag({
    name: 'Activar Libro de Reclamaciones',
    group: 'Extras',
  }),
  bookUrl: PropTypes.string.tag({
    name: 'URL Libro de Reclamaciones',
    group: 'Extras',
  }),
})

export default customFields
