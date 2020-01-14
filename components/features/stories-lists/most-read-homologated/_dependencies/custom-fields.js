import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  titleList: PropTypes.string.tag({
    name: 'Título de la lista',
  }),
  urlTitle: PropTypes.string.tag({
    name: 'Url del título ',
  }),
  amountStories: PropTypes.number.tag({
    name: 'Nro. de Notas',
    max: 20,
    defaultValue: 1,
    min: 1,
  }),
  isPremium: PropTypes.bool.tag({
    name: '¿Premium?',
    defaultValue: true,
    description: 'Si se activa este campo, sólo se mostrarán notas premium si la marca lo tiene implementado.'
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
  freeHTML: PropTypes.richtext.tag({
    name: 'Insertar título con código HTML',
    group: 'Configuración'
  }),  
})

export default customFields


// agregado freeHTML