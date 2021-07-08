import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  tags: PropTypes.string.tag({
    name: 'Etiqueta',
    defaultValue: 'Hoy',
  }),
  hideMenu: PropTypes.bool.tag({
    name: 'Ocultar destacados',
    defaultValue: false,
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
