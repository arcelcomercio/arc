import PropTypes from 'prop-types'

const customFields = {
  anonymous: PropTypes.bool.tag({
    name: 'Usar anónimo',
  }), 
  firstWeek: PropTypes.string.tag({
    name: 'Jornada de inicio',
  }),
  closeForecastMatchs: PropTypes.string.tag({
    name: 'Partidos con pronóstico cerrado',
  }),
  intervalTime: PropTypes.string.tag({
    name: 'Segundos para recarga de partidos',
  }),
}

export default customFields