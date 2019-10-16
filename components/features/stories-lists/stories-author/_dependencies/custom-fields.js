import PropTypes from 'prop-types'

export default PropTypes.shape({
  storyConfig: PropTypes.contentConfig('stories').isRequired.tag({
    name: 'Configuración del contenido',
  }),
  section: PropTypes.string.tag({
    name: 'Nombre de la sección',
    description: 'Dejar vacío para mostrar la sección original de la 1ra nota.',
  }),
  sectionLink: PropTypes.string.tag({
    name: 'Link de la sección',
    description: 'Dejar vacío para mostrar el link de la sección original de la 1ra nota.',
  }),
})
