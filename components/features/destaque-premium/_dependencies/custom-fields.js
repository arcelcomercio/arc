import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  path: PropTypes.string.isRequired.tag({
    name: 'URL',
    description: `Puedes ingresar cualquier URL externa, incluyendo el dominio (ejemplo: https://dominio.pe/url-externa), o la URL de una nota interna, sin el dominio (ejemplo: /url-interna-de-noticia).`,
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
