import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  showInDesktop: PropTypes.bool.tag({
    name: 'Mostrar en desktop',
    defaultValue: true,
  }),
  showInTablet: PropTypes.bool.tag({
    name: 'Mostrar en tablet',
    defaultValue: true,
  }),
  showInMobile: PropTypes.bool.tag({
    name: 'Mostrar en móviles ',
    defaultValue: true,
  }),
  // showDate: PropTypes.bool.tag({
  //   name: 'Mostrar fecha',
  //   defaultValue: false,
  // }),
  // tags: PropTypes.string.tag({
  //   name: 'Etiqueta',
  // }),
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
  linkIconHome: PropTypes.string.tag({
    name: 'Path de redireccionamiento del Icono',
    description:
      'Por defecto la url del logo es "/". Ejemplo de path: "/somos"',
    group: 'Editar logo',
  }),
  showIconHome: PropTypes.bool.tag({
    name: 'Mostrar Icono Home',
    defaultValue: true,
    group: 'Diseño',
  }),
  showVinetas: PropTypes.bool.tag({
    name: 'Mostrar Viñetas',
    defaultValue: true,
    group: 'Diseño',
  }),
  hierarchyConfig: PropTypes.contentConfig('navigation').tag({
    name: 'Editar navegación',
    group: 'Configuración del contenido',
  }),
})

export default customFields
