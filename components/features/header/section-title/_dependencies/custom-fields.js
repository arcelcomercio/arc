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
  TextType: PropTypes.oneOf(['h1', 'h2', 'h3']).tag({
    name: 'Tipo de texto',
    group: 'Configuración',
    labels: {
      h1: 'Título',
      h2: 'Subtítulo',
      h3: 'Encabezado H3',
    },
    defaultValue: 'h1',
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
