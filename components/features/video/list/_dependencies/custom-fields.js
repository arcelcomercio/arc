import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  offSetNote: PropTypes.number.tag({
    name: 'Numero de nota',
    description: 'Indique el numero desde donde quiere que comienze el listado',
  }),
  quantyStory: PropTypes.number.tag({
    name: 'Cantidad de notas',
    description: 'Indique el numero de notas que tendra el listado',
  }),
  showTitle: PropTypes.bool.tag({
    name: 'Mostrar título e íconos de nuevo diseño',
    defaultValue: false,
  }),
})

export default customFields
