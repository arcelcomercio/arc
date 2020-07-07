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
  customLogoTitle: PropTypes.string.tag({
    name: 'Title y alt de la imagen del logo',
  }),
})

export default customFields
