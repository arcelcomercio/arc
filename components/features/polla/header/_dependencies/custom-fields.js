import PropTypes from 'prop-types'

const customFields = {
  anonymous: PropTypes.bool.tag({
    name: 'Usar anónimo',
    defaultValue: false,
  }),
  showUserStats: PropTypes.bool.tag({
    name: 'Mostrar datos de usuario',
    defaultValue: true,
  }), 
  logo: PropTypes.string.tag({
    name: 'Url de Logo',
  }),
  linkLogo: PropTypes.string.tag({
    name: 'Enlace de Logo',
  }),
  textHome: PropTypes.string.tag({
    name: 'Texto de Inicio',
  }),
  home: PropTypes.string.tag({
    name: 'Url de Inicio',
  }),
  textTerms: PropTypes.string.tag({
    name: 'Texto de Términos y condiciones',
  }),
  terms: PropTypes.string.tag({
    name: 'Url de Términos y condiciones',
  }),
  textHowPlay: PropTypes.string.tag({
    name: 'Texto de Cómo jugar',
  }),
  howPlay: PropTypes.string.tag({
    name: 'Url de Cómo jugar',
  }),
  textPrizes: PropTypes.string.tag({
    name: 'Texto de Premios',
  }),
  prizes: PropTypes.string.tag({
    name: 'Url de Premios',
  }),
}

export default customFields