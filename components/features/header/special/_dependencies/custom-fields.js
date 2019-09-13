import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  customLogo: PropTypes.string.tag({
    name: 'Url de la imagen',
    group: 'Editar logo',
  }),
  customLogoLink: PropTypes.string.tag({
    name: 'Path de redireccionamiento',
    description:
      'Por defecto la url del logo es "/". Ejemplo de path: "/somos"',
    group: 'Editar logo',
  }),
  section: PropTypes.string.tag({
    name: 'Nombre de la sección',
    group: 'Configuración de título de sección',
    description: 'Nombre de la sección. Ejemplo: Política',
  }),

  sectionUrl: PropTypes.string.tag({
    name: 'URL de la sección',
    group: 'Configuración de título de sección',
    description: 'Url de la sección. Ejemplo: /politica',
  }),

  bgColor: PropTypes.oneOf(['bg-primary', 'bg-secondary', 'transparent']).tag({
    name: 'Color de fondo',
    group: 'Configuración de título de sección',
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
    group: 'Configuración de título de sección',
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
