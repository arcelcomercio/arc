import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  storyConfig: PropTypes.contentConfig('story').isRequired.tag({
    name: 'Configuración del contenido',
  }),
  isCard: PropTypes.bool.tag({
    name: 'Modo Card',
    defaultValue: false,
  }),
})

export default customFields
