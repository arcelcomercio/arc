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
  showNewsletter: PropTypes.bool.tag({
    name: 'Mostrar Newsletter',
    group: 'Configuración Depor Play',
    defaultValue: false,
  }),
  showArrowLeft: PropTypes.bool.tag({
    name: 'Mostrar flecha - logo',
    group: 'Configuración Depor Play',
    defaultValue: false,
  }),
  urlLogoPlay: PropTypes.string.tag({
    name: 'Logo Depor Play',
    group: 'Configuración Depor Play',
    default: '',
  }),
  customLogoTitle: PropTypes.string.tag({
    name: 'Title y alt de la imagen del logo',
  }),
})

export default customFields
