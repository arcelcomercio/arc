import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  storyConfig: PropTypes.contentConfig('stories').isRequired.tag({
    name: 'Configuración del contenido',
  }),
})

export default customFields
