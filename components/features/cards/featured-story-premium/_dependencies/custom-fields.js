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
  lastMinute: PropTypes.bool.tag({
    name: 'Ultimo minuto',
    group: 'Configuración',
    defaultValue: false,
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
  categoryField: PropTypes.string.tag({
    name: 'Sección',
    group: 'Editar campos',
    description: 'Dejar vacío para tomar el valor original de la historia.',
  }),
  titleField: PropTypes.string.tag({
    name: 'Título',
    group: 'Editar campos',
    description: 'Dejar vacío para tomar el valor original de la historia.',
  }),
  imgField: PropTypes.string.tag({
    name: 'Imagen',
    group: 'Editar campos',
    description: 'Dejar vacío para tomar el valor original de la historia.',
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
  adsSpace: PropTypes.oneOf([
    'none',
    'publirreportaje',
    'auspiciotop1',
    'auspiciotop2',
    'auspiciotop3',
    'daily1',
    'daily2',
    'daily3',
    'catalogo1',
    'catalogo2',
    'zonaauspiciada0',
    'zonaauspiciada1',
    'zonaauspiciada2',
    'zonaauspiciada3',
    'zonaauspiciada4',
    'zonaauspiciada5',
    'zonaauspiciada6',
    'zonaauspiciada7',
    'zonaauspiciada8',
    'zonaauspiciada9',
    'zonaauspiciada10',
    'suplementos',
    'middle1',
    'middle2',
    'caja1',
    'caja2',
    'caja3',
  ]).tag({
    name: 'Espacio',
    group: 'Publicidad',
    labels: {
      none: 'Ninguno',
      publirreportaje: 'publirreportaje',
      auspiciotop1: 'auspiciotop1',
      auspiciotop2: 'auspiciotop2',
      auspiciotop3: 'auspiciotop3',
      daily1: 'daily1',
      daily2: 'daily2',
      daily3: 'daily3',
      catalogo1: 'catalogo1',
      catalogo2: 'catalogo2',
      zonaauspiciada0: 'zonaauspiciada0',
      zonaauspiciada1: 'zonaauspiciada1',
      zonaauspiciada2: 'zonaauspiciada2',
      zonaauspiciada3: 'zonaauspiciada3',
      zonaauspiciada4: 'zonaauspiciada4',
      zonaauspiciada5: 'zonaauspiciada5',
      zonaauspiciada6: 'zonaauspiciada6',
      zonaauspiciada7: 'zonaauspiciada7',
      zonaauspiciada8: 'zonaauspiciada8',
      zonaauspiciada9: 'zonaauspiciada9',
      zonaauspiciada10: 'zonaauspiciada10',
      suplementos: 'suplementos',
      middle1: 'middle1',
      middle2: 'middle2',
      middle3: 'middle3',
      caja1: 'caja1',
      caja2: 'caja2',
      caja3: 'caja3',
    },
    defaultValue: 'none',
  }),
})

export default customFields
