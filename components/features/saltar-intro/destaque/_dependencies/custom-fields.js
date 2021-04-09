import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  storyConfig: PropTypes.contentConfig('story').isRequired.tag({
    name: 'Configuración del contenido',
  }),
  starField: PropTypes.string.tag({
    name: 'Estrellas',
    description:
      'Cantidad de estrellas solo de 1 al 5, para borrar dejar vacio',
  }),
})

export default customFields
