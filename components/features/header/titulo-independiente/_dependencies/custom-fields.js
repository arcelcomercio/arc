import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  section: PropTypes.string.tag({
    name: 'Nombre de la sección',
    description: 'Nombre de la -seccion. Ejemplo: Politica',
  }),

  sectionUrl: PropTypes.string.tag({
    name: 'Url de la sección',
    description: 'Url de la Sección. Ejemplo: /politica',
  }),

  bgColor: PropTypes.oneOf(['bg-primary', 'bg-secondary', 'transparent']).tag({
    name: 'Color de fondo',
    group: 'Configuración',
    labels: {
      white: 'Color Primario',
      gray: 'Color Secundario',
      transparent: 'Transparente',
    },
    defaultValue: 'transparent',
  }),
  fontColor: PropTypes.oneOf(['bg-primary', 'bg-secondary', 'transparent']).tag(
    {
      name: 'Color de título',
      group: 'Configuración',
      labels: {
        white: 'Color Primario',
        gray: 'Color Secundario',
        transparent: 'Transparente',
      },
      defaultValue: 'transparent',
    }
  ),
})

export default customFields
