import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  tags: PropTypes.string.tag({
    name: 'Etiqueta menú',
    defaultValue: 'Hoy',
  }),
  tagsTema: PropTypes.string.tag({
    name: 'Etiqueta tema del día',
    defaultValue: 'Hoy',
  }),
  invertedTema: PropTypes.bool.tag({
    name: 'Invertir tema del día',
    defaultValue: false,
  }),
  hideTema: PropTypes.bool.tag({
    name: 'Ocultar tema del día',
    defaultValue: true,
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
  hierarchyTemaConfig: PropTypes.contentConfig('navigation').tag({
    name: 'Editar navegación',
    group: 'Configuración tema del día',
  }),
})

export default customFields
