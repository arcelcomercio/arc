import PropTypes from 'prop-types'

export default PropTypes.shape({
  storyConfig: PropTypes.contentConfig('stories').isRequired.tag({
    name: 'Configuración del contenido',
  }),
  section: PropTypes.string.tag({
    name: 'Nombre de la sección',
    description: 'Dejar vacío para mostrar la sección original de la nota.',
  }),
})
