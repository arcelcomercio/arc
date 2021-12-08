import PropTypes from 'prop-types'

export default PropTypes.shape({
  storyConfig: PropTypes.contentConfig('stories').isRequired.tag({
    name: 'Configuración del contenido',
  }),
  isAuthorVisible: PropTypes.bool.tag({
    name: 'Mostrar autor',
    description: 'Esta campo no se mostrará en algunos diseños',
  }),
  isSeeMoreVisible: PropTypes.bool.tag({
    name: 'Mostrar botón "Ver más"',
  }),
  isImageVisible: PropTypes.bool.tag({
    name: 'Mostrar Imagen',
    defaultValue: true,
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
  titleColor: PropTypes.string.tag({
    name: 'Color del título',
    group: 'Configuración del título',
    description: 'Ejemplo: #000000',
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
    description:
      'No aplica en algunos diseños que tienen un color de fondo único',
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
  isDeporBetsDesign: PropTypes.bool.tag({
    name: 'Activar diseño con auspiciador',
    defaultValue: false,
    group: 'Diseños Depor',
  }),
  deporBetsText: PropTypes.string.tag({
    name: 'Texto a la izquierda de la imagen',
    defaultValue: 'Auspiciado por:',
    group: 'Diseños Depor',
  }),
  deporBetsImg: PropTypes.string.tag({
    name: 'URL de la imagen',
    group: 'Diseños Depor',
  }),
  deporBetsUrl: PropTypes.string.tag({
    name: 'Enlace de destino de la imagen',
    group: 'Diseños Depor',
  }),
  deporBetsAlt: PropTypes.string.tag({
    name: 'Alt de la imagen',
    group: 'Diseños Depor',
  }),
  isSeeMoreScriptActivate: PropTypes.bool.tag({
    name: 'Activar script para el botón Ver más',
    group: 'Lite',
    defaultValue: false,
    description: 'Es necesario activarlo solo una vez por plantilla',
  }),
})
