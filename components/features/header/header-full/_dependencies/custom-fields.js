import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  hierarchyHeader: PropTypes.contentConfig('navigation').tag({
    name: 'Editar navegación',
    group: 'Configuración del Header',
  }),
  hierarchyMenu: PropTypes.contentConfig('navigation').tag({
    name: 'Editar navegación',
    group: 'Configuración del Menu',
  }),
  hideMenu: PropTypes.bool.tag({
    name: 'Ocultar menu',
    defaultValue: true,
  }),
})

export default customFields
