import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  /* titleList: PropTypes.string.tag({
    name: 'Título de la lista',
  }), */
  storiesQty: PropTypes.number.tag({
    name: 'Número de noticias',
    defaultValue: 100,
    // group: 'Configuración',
  }),
  includedFields: PropTypes.string.tag({
    name: 'Campos incluidos',
  }),
})

export default customFields
