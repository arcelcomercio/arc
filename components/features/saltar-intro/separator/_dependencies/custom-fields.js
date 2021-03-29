import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  // section: PropTypes.string.isRequired.tag({ name: 'Sección' }),
  storyConfig: PropTypes.contentConfig('stories').isRequired.tag({
    name: 'Configuración del contenido',
  }),
  titleSeparator: PropTypes.string.tag({ name: 'Titulo del separador' }),
  titleLink: PropTypes.string.tag({ name: 'URL del separador' }),
  seeMoreLink: PropTypes.string.tag({ name: 'Link de Ver Mas' }),
  modeStreaming: PropTypes.bool.tag({
    name: 'Modo streaming',
    defaultValue: false,
  }),
})

export default customFields
