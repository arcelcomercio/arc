import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  titleList: PropTypes.string.tag({
    name: 'Título de la lista',
  }),
  urlTitle: PropTypes.string.tag({
    name: 'Url del título ',
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

  seeMore: PropTypes.bool.tag({
    name: 'Ver más',
    group: 'Configuración',
  }),
  storyNumber: PropTypes.bool.tag({
    name: 'Enumerar',
    group: 'Configuración',
  }),
  seeImageNews: PropTypes.bool.tag({
    name: 'Ver imagen',
    group: 'Configuración',
  }),
  seeMoreurl: PropTypes.string.tag({
    name: 'URL de Ver más',
    group: 'Configuración',
  }),
})

export default customFields
