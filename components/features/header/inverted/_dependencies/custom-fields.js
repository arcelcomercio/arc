import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  hideMenu: PropTypes.bool.tag({
    name: 'Ocultar menu',
    defaultValue: false,
  }),
  showDate: PropTypes.bool.tag({
    name: 'Mostrar fecha',
    defaultValue: false,
  }),
  isSlider: PropTypes.bool.tag({
    name: 'Navegación con slider',
    defaultValue: false,
  }),
  activeSticky: PropTypes.bool.tag({
    name: 'Activar sticky a Ads laterales',
    defaultValue: false,
  }),
  isTopNavVisible: PropTypes.bool.tag({
    name: 'Mostrar barra de navegación superior',
    defaultValue: false,
  }),
  tags: PropTypes.string.tag({
    name: 'Etiqueta',
    defaultValue: 'Hoy interesa',
  }),
  customLogoTitle: PropTypes.string.tag({
    name: 'Title y alt de la imagen',
    group: 'Editar logo',
  }),
  customLogo: PropTypes.string.tag({
    name: 'Url de la imagen',
    group: 'Editar logo',
  }),
  customLogoLink: PropTypes.string.tag({
    name: 'Path de redireccionamiento',
    description:
      'Por defecto la url del logo es "/". Ejemplo de path: "/somos"',
    group: 'Editar logo',
  }),
  hierarchyConfig: PropTypes.contentConfig('navigation').tag({
    name: 'Editar navegación',
    group: 'Configuración del contenido',
  }),
})

export default customFields
