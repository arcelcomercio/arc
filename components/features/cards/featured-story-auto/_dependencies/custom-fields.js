import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  section: PropTypes.string.tag({
    name: 'URL de la sección',
    description:
      'Si no se coloca la URL de la sección, se renderiza la última historia publicada. Ejemplo: /deporte-total',
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
  storyNumber: PropTypes.number.tag({
    name: 'Posición de la historia',
    description:
      'Si no se completa el campo, la posición de la historia será 0 (la última historia publicada)',
    group: 'Configuración',
    min: 0,
    defaultValue: 0,
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
})

export default customFields
