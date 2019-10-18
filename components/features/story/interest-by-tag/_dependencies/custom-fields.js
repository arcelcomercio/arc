import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  section: PropTypes.string.tag({
    name: 'Nombre del tag',
    description:
      'Si no se coloca la URL de la sección, se renderiza la última historia publicada. Ejemplo: /deporte-total',
  }),
  title: PropTypes.string.tag({
    name: 'Titulo',
    description: 'Colocar el Nombre ',
  }),
  storyAmp: PropTypes.oneOf(['normal', 'slider']).tag({
    name: 'Slider Amp',
    group: 'Configuración',
    labels: {
      normal: 'Normal',
      live: 'Slider Amp',
    },
    defaultValue: 'normal',
  }),
})

export default customFields
