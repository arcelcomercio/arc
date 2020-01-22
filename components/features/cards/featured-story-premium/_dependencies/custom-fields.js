import PropTypes from 'prop-types'

const currentDate = new Date()
const tomorrowDate = new Date(currentDate.setDate(currentDate.getDate() + 1))
const defaultProgramDate = new Date(
  tomorrowDate.getFullYear(),
  tomorrowDate.getMonth(),
  tomorrowDate.getDate(),
  11,
  0,
  0
).getTime()

const customFields = PropTypes.shape({
  storyConfig: PropTypes.contentConfig('story').isRequired.tag({
    name: 'Configuración del contenido',
  }),
  model: PropTypes.oneOf(['basic', 'twoCol', 'full']).tag({
    name: 'Modelo del Destaque',
    group: 'Configuración',
    labels: {
      basic: 'Basico',
      twoCol: '2 Columnas',
      full: 'Completo',
    },
    defaultValue: 'basic',
  }),
  imgType: PropTypes.bool.tag({
    name: 'Imagen completa',
    group: 'Configuración',
  }),
  bgColor: PropTypes.oneOf(['white', 'gray', 'transparent']).tag({
    name: 'Color de fondo',
    group: 'Configuración',
    labels: {
      white: 'Blanco',
      gray: 'Gris',
      transparent: 'Transparente',
    },
    defaultValue: 'transparent',
  }),
  note1: PropTypes.string.tag({
    name: 'Nota 1',
    group: 'Programar Notas',
    description:
      'Si la URL ingresada no está publicada o no existe, se mostrará la nota del campo "URL"',
  }),
  date1: PropTypes.dateTime.tag({
    name: 'Fecha de publicación',
    group: 'Programar Notas',
    defaultValue: defaultProgramDate,
  }),
  note2: PropTypes.string.tag({
    name: 'Nota 2',
    group: 'Programar Notas',
    description:
      'Si la URL ingresada no está publicada o no existe, se mostrará la nota del campo "URL"',
  }),
  date2: PropTypes.dateTime.tag({
    name: 'Fecha de publicación',
    group: 'Programar Notas',
    defaultValue: defaultProgramDate,
  }),
  note3: PropTypes.string.tag({
    name: 'Nota 3',
    group: 'Programar Notas',
    description:
      'Si la URL ingresada no está publicada o no existe, se mostrará la nota del campo "URL"',
  }),
  date3: PropTypes.dateTime.tag({
    name: 'Fecha de publicación',
    group: 'Programar Notas',
    defaultValue: defaultProgramDate,
  }),
  flagLive: PropTypes.bool.tag({
    name: 'Activar en vivo',
    group: 'Video en vivo',
  }),
  platformLive: PropTypes.oneOf(['facebook', 'youtube']).tag({
    name: 'Plataforma de video',
    group: 'Video en vivo',
    labels: {
      facebook: 'Facebook Live',
      youtube: 'YouTube Live',
    },
    defaultValue: 'facebook',
  }),
  urlVideo: PropTypes.string.tag({
    name: 'URL de Video en Facebook / ID de Youtube',
    group: 'Video en vivo',
    description:
      'Url del video en vivo que ofrece facebook o el id del video de youtube.',
  }),
})

export default customFields
