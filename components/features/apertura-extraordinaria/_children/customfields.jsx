import PropTypes from 'prop-types'

const customFields = {
  section: PropTypes.string.tag({
    name: 'Sección',
    description: 'Dejar vacío para tomar el valor original de la historia.',
  }),
  title: PropTypes.string.tag({
    name: 'Título',
    description: 'Dejar vacío para tomar el valor original de la historia.',
  }),
  subTitle: PropTypes.string.tag({
    name: 'Bajada',
    description: 'Dejar vacío para tomar el valor original de la historia.',
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
  multimediaService: PropTypes.oneOf(['default', 'image', 'goldfish', 'youtube']).tag({
    name: 'Proveedor',
    group: 'Multimedia',
    labels: {
      default: 'Automático',
      image: 'Imagen',
      goldfish: 'GoldFish',
      youtube: 'Youtube',
    },
    defaultValue: 'default',
  }),
  multimediaSource: PropTypes.string.tag({
    name: 'Recurso',
    group: 'Multimedia',
    description: 'Automático: Obtiene imagen o video de la noticia. Imagen: Url de la imagen. GoldFish: ID del video. Youtube: Url del video.',
  }),
}

export default customFields
