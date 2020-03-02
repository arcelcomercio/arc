import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  idLeague: PropTypes.string.isRequired.tag({
    name: 'Id de la liga',
    description: 'Identificador de la liga',
  }),
})

export default customFields
