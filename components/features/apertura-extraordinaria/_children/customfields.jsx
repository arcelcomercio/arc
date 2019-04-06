import PropTypes from 'prop-types'

const customFields = {
  section: PropTypes.string.tag({
    name: 'Sección',
    description: 'Dejar vacío para tomar el valor original de la noticia.',
  }),
  title: PropTypes.string.tag({
    name: 'Título',
    description: 'Dejar vacío para tomar el valor original de la noticia.',
  }),
  subTitle: PropTypes.string.tag({
    name: 'Bajada',
    description: 'Dejar vacío para tomar el valor original de la noticia.',
  }),
  image: PropTypes.string.tag({
    name: 'Url de imagen',
    description: 'Dejar vacío para tomar el valor original de la noticia.',
  }),
  orientation: PropTypes.label.tag({
    name: 'Orientación del contenido',
  }),
  multimediaOrientation: PropTypes.oneOf([
    'top',
    'bottom',
    'left',
    'right',
  ]).tag({
    name: 'Posición de la imagen o video',
    labels: {
      top: 'Superior',
      bottom: 'Inferior',
      left: 'Izquierda',
      right: 'Derecha',
    },
    defaultValue: 'bottom',
  }),
  contentOrientation: PropTypes.oneOf(['center', 'left', 'right']).tag({
    name: 'Posición de los textos',
    labels: {
      center: 'Centro',
      left: 'Izquierda',
      right: 'Derecha',
    },
    defaultValue: 'left',
  }),
  hasVideo: PropTypes.bool.tag({
    name: '¿Colocar un video?',
    group: 'Video',
  }),
  multimediaService: PropTypes.oneOf(['automatic', 'goldfish', 'youtube']).tag({
    name: 'Proveedor',
    group: 'Video',
    labels: {
      automatic: 'automatic',
      goldfish: 'GoldFish',
      youtube: 'Youtube',
    },
    defaultValue: 'automatic',
  }),
  videoCode: PropTypes.string.tag({
    name: 'Código de video',
    group: 'Video',
  }),
}

export default customFields
