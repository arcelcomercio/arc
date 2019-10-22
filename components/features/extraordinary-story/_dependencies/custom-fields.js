import PropTypes from 'prop-types'

const customFields = {
  showExtraordinaryStory: PropTypes.bool.tag({
    name: 'Visualizar Apertura',
    description: 'Por Defecto es Verdadero, falso para mantenerlo oculto',
    defaultValue: true,
  }),
  section: PropTypes.string.tag({
    name: 'Sección',
    description: 'Campo vació tomará el valor por defecto de la historia',
  }),
  title: PropTypes.string.tag({
    name: 'Título',
    description: 'Campo vació tomará el valor por defecto de la historia',
  }),
  subTitle: PropTypes.string.tag({
    name: 'Bajada',
    description: 'Campo vació tomará el valor por defecto de la historia',
  }),
  urlNew: PropTypes.string.tag({
    name: 'URL de nota extrerna',
    description: 'Puede usar una url externa',
  }),
  multimediaOrientation: PropTypes.oneOf([
    'top',
    'bottom',
    'left',
    'right',
  ]).tag({
    name: 'Posición elemento multimedia',
    labels: {
      top: 'Superior',
      bottom: 'Inferior',
      left: 'Izquierda',
      right: 'Derecha',
    },
    defaultValue: 'bottom',
    group: 'Orientación',
  }),
  contentOrientation: PropTypes.oneOf(['left', 'center', 'right']).tag({
    name: 'Posición texto',
    labels: {
      left: 'Izquierda',
      center: 'Centro',
      right: 'Derecha',
    },
    defaultValue: 'left',
    group: 'Orientación',
  }),
  multimediaService: PropTypes.oneOf([
    'default',
    'image',
    'goldfish',
    'youtube',
  ]).tag({
    name: 'Servicio',
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
    name: 'Identificador de recurso',
    group: 'Multimedia',
    description:
      'Automático: Obtiene imagen o video de la noticia. Imagen: Url de la imagen. GoldFish: ID del video. Youtube: ID del video.',
  }),
}

export default customFields
