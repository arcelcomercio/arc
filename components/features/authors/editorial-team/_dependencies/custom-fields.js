import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  title: PropTypes.string.tag({
    name: 'Título',
  }),
  editorialTeam: PropTypes.kvp.tag({
    name: 'Equipo editorial',
    description:
      'Presiona -new item- por cada miembro del equipo editorial e ingresa su Cargo y Nombre respectivamente.',
  }),
})

export default customFields
