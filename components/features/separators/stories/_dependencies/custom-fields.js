import PropTypes from 'prop-types'

export default PropTypes.shape({
  storyConfig: PropTypes.contentConfig('stories').isRequired.tag({
    name: 'Configuración del contenido',
  }),
  isThreeCol: PropTypes.bool.tag({
    name: 'Ancho de 3 columnas',
  }),
  isAuthorVisible: PropTypes.bool.tag({
    name: 'Mostrar autor',
  }),
  isSeeMoreVisible: PropTypes.bool.tag({
    name: 'Mostrar botón "Ver más"',
  }),
  seeMoreButtonLink: PropTypes.string.tag({
    name: 'Url del botón "Ver más"',
  }),
  titleSeparator: PropTypes.string.tag({
    name: 'Titulo del separador',
    group: 'Configuración del título',
  }),
  titleLink: PropTypes.string.tag({
    name: 'URL del título',
    group: 'Configuración del título',
  }),
  htmlCode: PropTypes.richtext.tag({
    name: 'Insertar título con código HTML',
    group: 'Configuración del título',
  }),
  design: PropTypes.oneOf(['standart', 'custom']).tag({
    name: 'Diseño',
    labels: {
      standart: 'estándar',
      custom: 'customizado',
    },
    defaultValue: 'standart',
    group: 'Configuración de diseño',
  }),
})
