import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  storyConfig: PropTypes.contentConfig('story').isRequired.tag({
    name: 'Contenido de la Nota 1',
  }),
  storyConfig2: PropTypes.contentConfig('story').isRequired.tag({
    name: 'Contenido de la Nota 2',
  }),
})

export default customFields
