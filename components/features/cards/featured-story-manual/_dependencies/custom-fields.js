import PropTypes from 'prop-types'

// Valor por defecto en el custom field "Fecha de publicación", 6:00 del siguiente día
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
  path: PropTypes.string.isRequired.tag({
    name: 'URL',
    description: `Puedes ingresar cualquier URL externa, incluyendo el dominio (ejemplo: https://dominio.pe/url-externa), o la URL de una nota interna, sin el dominio (ejemplo: /url-interna-de-noticia).`,
  }),
  imageSize: PropTypes.oneOf(['parcialBot', 'parcialTop', 'complete']).tag({
    name: 'Posición de la imagen',
    labels: {
      parcialBot: 'Parcial inferior',
      parcialTop: 'Parcial Superior',
      complete: 'Completa',
    },
    defaultValue: 'parcialBot',
  }),
  headband: PropTypes.oneOf(['normal', 'live', 'tv']).tag({
    name: 'Cintillo',
    group: 'Configuración',
    labels: {
      normal: 'Normal',
      live: 'En vivo',
      tv: 'Tv',
    },
    defaultValue: 'normal',
  }),
  size: PropTypes.oneOf(['oneCol', 'twoCol']).tag({
    name: 'Tamaño del destaque',
    group: 'Configuración',
    labels: {
      oneCol: '1 columna',
      twoCol: '2 columnas',
    },
    defaultValue: 'oneCol',
  }),
  hightlightOnMobile: PropTypes.bool.tag({
    name: 'Destacar en móvil',
    group: 'Configuración',
    description:
      'Si esta opción es activada, la vista del elemento en móvil será igual a su vista en escritorio.',
    defaultValue: false,
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
})

export default customFields
