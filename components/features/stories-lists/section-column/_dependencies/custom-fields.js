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
})

export default customFields
