import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  sectionsHierarchyConfig: PropTypes.contentConfig('navigation').tag({
    name: 'Editar navegación de "secciones"',
    group: 'Configuración del contenido',
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
  isBook: PropTypes.bool.tag({
    name: 'Activar Libro de Reclamaciones',
    group: 'Extras',
  }),
  bookUrl: PropTypes.string.tag({
    name: 'URL Libro de Reclamaciones',
    group: 'Extras',
  }),
})

export default customFields
