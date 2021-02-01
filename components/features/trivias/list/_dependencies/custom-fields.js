import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  triviasConfig: PropTypes.contentConfig('stories').isRequired.tag({
    name: 'Configuración de contenido',
  }),
})

export default customFields
