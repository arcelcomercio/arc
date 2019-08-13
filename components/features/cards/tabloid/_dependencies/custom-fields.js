import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  feedOffset: PropTypes.number.tag({
    name: 'Mostrar impresa número:',
    min: 0,
    max: 365,
    step: 1,
    defaultValue: 0,
    description:
      'Indique el número de la versión impresa que quiere mostrar. La más reciente corresponde al número 0',
  }),
  urlImage: PropTypes.string.tag({
    name: 'Url de la imagen',
    description:
    'Al configurar la imagen, el título y la fecha automática de la nota no se mostrarán, se tiene que configurar manualmente.',
    group: 'Configuración',
  }),
  link: PropTypes.string.tag({
    name: 'Link para la imagen',
    group: 'Configuración',
  }),
  sectionName: PropTypes.string.tag({
    name: 'Título',
    description:
      'Si no se define el nombre personalizado, tomará automáticamente el nombre de la sección del elemento que se muestra: Impresa; solo si no se tiene una imagen configurada.',
    group: 'Configuración',
  }),
  date: PropTypes.string.tag({
    name: 'Fecha',
    description:
      'Dejar en blanco el campo para mostrar la fecha de la publicación de la nota, solo si no se tiene una imagen configurada.',
    group: 'Configuración',
  }),
})

export default customFields
