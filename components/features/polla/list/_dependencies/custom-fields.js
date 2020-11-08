import PropTypes from 'prop-types'

const customFields = {
  anonymous: PropTypes.bool.tag({
    name: 'Usar anónimo',
  }), 
  firstWeek: PropTypes.string.tag({
    name: 'Jornada de inicio',
  }),
}

export default customFields