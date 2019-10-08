import PropTypes from 'prop-types'

export default PropTypes.shape({
  storyConfig: PropTypes.contentConfig('stories').isRequired.tag({
    name: 'Configuración del contenido',
  }),
})
