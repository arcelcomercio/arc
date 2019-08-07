import PropTypes from 'prop-types'

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
  bgColor: PropTypes.oneOf(['white', 'gray', 'transparent']).tag({
    name: 'Color de fondo',
    group: 'Configuración',
    labels: {
      white: 'white',
      gray: 'gray',
      transparent: 'transparent',
    },
    defaultValue: 'transparent',
  }),
})

export default customFields
