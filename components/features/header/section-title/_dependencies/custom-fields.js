import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  section: PropTypes.string.tag({
    name: 'Nombre de la sección',
    description: 'Nombre de la sección. Ejemplo: Política',
  }),

  sectionUrl: PropTypes.string.tag({
    name: 'URL de la sección',
    description: 'Url de la sección. Ejemplo: /politica',
  }),

  bgColor: PropTypes.oneOf(['bg-primary', 'bg-secondary', 'transparent']).tag({
    name: 'Color de fondo',
    group: 'Configuración',
    labels: {
      'bg-primary': 'Color Primario',
      'bg-secondary': 'Color Secundario',
      transparent: 'Transparente',
    },
    defaultValue: 'bg-secondary',
  }),
  fontColor: PropTypes.oneOf([
    'text-primary-color',
    'text-white',
    'text-black',
    'transparent',
  ]).tag({
    name: 'Color de título',
    group: 'Configuración',
    labels: {
      'text-primary-color': 'Color Primario',
      'text-white': 'Color blanco',
      'text-black': 'Color negro',
      transparent: 'Transparente',
    },
    defaultValue: 'text-white',
  }),
})

export default customFields
