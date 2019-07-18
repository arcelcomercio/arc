import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  path: PropTypes.string.isRequired.tag({
    name: 'URL',
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
  headband: PropTypes.oneOf(['normal', 'live', 'gestionTv']).tag({
    name: 'Cintillo',
    group: 'Configuración',
    labels: {
      normal: 'Normal',
      live: 'En vivo',
      gestionTv: 'Gestión TV',
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
  }),
  date1: PropTypes.dateTime.tag({
    name: 'Fecha de publicación',
    group: 'Programar Notas',
  }),
  note2: PropTypes.string.tag({
    name: 'Nota 2',
    group: 'Programar Notas',
  }),
  date2: PropTypes.dateTime.tag({
    name: 'Fecha de publicación',
    group: 'Programar Notas',
  }),
  note3: PropTypes.string.tag({
    name: 'Nota 3',
    group: 'Programar Notas',
  }),
  date3: PropTypes.dateTime.tag({
    name: 'Fecha de publicación',
    group: 'Programar Notas',
  }),
})

export default customFields
