import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  storyConfig: PropTypes.contentConfig('story').isRequired.tag({
    name: 'Configuración del 1er contenido',
  }),
  storyTwoConfig: PropTypes.contentConfig('story').isRequired.tag({
    name: 'Configuración del 2do contenido',
  }),
  seeMoreLink: PropTypes.string.tag({ name: 'Link de Ver Mas' }),
})

export default customFields
