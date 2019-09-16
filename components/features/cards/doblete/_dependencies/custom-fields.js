import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  storyConfig: PropTypes.contentConfig('story').isRequired.tag({
    name: 'Configuración de Nota 1',
  }),
  storyConfig2: PropTypes.contentConfig('story').isRequired.tag({
    name: 'Configuración de Nota 2',
  }),
})

export default customFields
