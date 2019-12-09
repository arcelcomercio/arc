import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  storiesConfig: PropTypes.contentConfig('stories').isRequired.tag({
    name: 'Configuración del contenido',
  }),
  isTargetBlank: PropTypes.bool.tag({
    name: 'Abrir URL en otra pestaña',
  }),
})

export default customFields
