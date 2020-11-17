import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  directors: PropTypes.kvp.tag({
    name: 'Lista de directores',
    description:
      'Presiona -new item- por cada director a agregar e ingresa su Cargo y Nombre respectivamente.',
  }),
})

export default customFields
