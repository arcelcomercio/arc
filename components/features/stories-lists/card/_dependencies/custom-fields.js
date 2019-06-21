import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  titleList: PropTypes.string.isRequired.tag({
    name: 'Título de la lista'
  }),
  urlTitle: PropTypes.string.tag({
    name: 'Url del título '
  }),
  section: PropTypes.string.isRequired.tag({
    name: 'Sección'
  }),
  background: PropTypes.oneOf(['bg-info', 'bg-white']).tag({
    name: 'Color de fondo cabecera',
    labels: {
      'bg-info': 'celeste',
      'bg-white': 'blanco',
    },
    defaultValue: 'bg-info',
  }),

  storiesQty: PropTypes.number.tag({
    name: 'Número de noticas',
    defaultValue: 5,
  }),
  seeMore: PropTypes.bool.tag({
    name: 'Ver más'
  }),
  seeHour: PropTypes.bool.tag({
    name: 'Ver hora'
  }),
  seeImageNews: PropTypes.bool.tag({
    name: 'Ver imagen'
  }),
  seeMoreurl: PropTypes.string.tag({
    name: 'Ver más url'
  }),
})

export default customFields