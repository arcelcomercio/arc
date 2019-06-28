import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  titleList: PropTypes.string.tag({
    name: 'Título de la lista',
  }),
  urlTitle: PropTypes.string.tag({
    name: 'Url del título ',
  }),
  section: PropTypes.string.tag({
    name: 'Sección',
  }),
  background: PropTypes.oneOf(['bg-info', 'bg-white']).tag({
    name: 'Color de fondo cabecera',
    labels: {
      'bg-info': 'Principal',
      'bg-white': 'Secundario',
    },
    defaultValue: 'bg-info',
    group: 'Configuración',
  }),

  storiesQty: PropTypes.number.tag({
    name: 'Número de noticas',
    defaultValue: 5,
    group: 'Configuración',
  }),
  seeMore: PropTypes.bool.tag({
    name: 'Ver más',
    group: 'Configuración',
  }),
  seeHour: PropTypes.bool.tag({
    name: 'Ver hora',
    group: 'Configuración',
  }),
  seeImageNews: PropTypes.bool.tag({
    name: 'Ver imagen',
    group: 'Configuración',
  }),
  seeMoreurl: PropTypes.string.tag({
    name: 'Ver más url',
    group: 'Configuración',
  }),
})

export default customFields
