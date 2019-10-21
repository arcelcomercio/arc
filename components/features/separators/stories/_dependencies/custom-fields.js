import PropTypes from 'prop-types'

export default PropTypes.shape({
  storyConfig: PropTypes.contentConfig('stories').isRequired.tag({
    name: 'Configuración del contenido',
  }),
  isAuthorVisible: PropTypes.bool.tag({
    name: 'Mostrar autor',
  }),
  isSeeMoreVisible: PropTypes.bool.tag({
    name: 'Mostrar botón "Ver más"',
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
  design: PropTypes.oneOf(['standart', 'invested', 'custom']).tag({
    name: 'Diseño',
    labels: {
      standart: 'Imagen parcial',
      invested: 'Invertido',
      custom: 'Imagen completa',
    },
    defaultValue: 'standart',
    group: 'Configuración de diseño',
  }),
  bgColor: PropTypes.oneOf(['default', 'primary', 'secondary']).tag({
    name: 'Color de fondo',
    labels: {
      default: 'Sin color',
      primary: 'Primario',
      secondary: 'Secundario',
    },
    defaultValue: 'default',
    group: 'Configuración de diseño',
  }),
  responsive: PropTypes.oneOf(['complete', 'partial', 'mobileHidden']).tag({
    name: 'Vista móvil',
    labels: {
      complete: 'Mostrar todas las noticias',
      partial: 'Mostrar solo 1 noticia',
      mobileHidden: 'Ocultar el separador',
    },
    defaultValue: 'complete',
    group: 'Configuración del responsive',
  }),
})
