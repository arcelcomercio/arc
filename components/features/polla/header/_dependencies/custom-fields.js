import PropTypes from 'prop-types'

const customFields = {
  anonymous: PropTypes.bool.tag({
    name: 'Usar anónimo',
  }), 
  logo: PropTypes.string.tag({
    name: 'Url de Logo',
  }),
  home: PropTypes.string.tag({
    name: 'Url de Inicio',
  }),
  terms: PropTypes.string.tag({
    name: 'Url de Términos y condiciones',
  }),
  howPlay: PropTypes.string.tag({
    name: 'Url de Cómo jugar',
  }),
  prizes: PropTypes.string.tag({
    name: 'Url de Premios',
  }),
}

export default customFields