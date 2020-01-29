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
  showDate: PropTypes.bool.tag({
    name: 'Mostrar fecha',
    defaultValue: false,
  }),
  isSlider: PropTypes.bool.tag({
    name: 'Navegación con slider',
    defaultValue: false,
  }),
  tags: PropTypes.string.tag({
    name: 'Etiqueta',
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
