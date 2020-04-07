import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  tag: PropTypes.string.tag({
    name: 'Etiqueta',
    defaultValue: 'Hoy interesa',
  }),
  hierarchyConfig: PropTypes.contentConfig('navigation').tag({
    name: 'Editar navegación',
    group: 'Configuración del contenido',
  }),
})

export default customFields
