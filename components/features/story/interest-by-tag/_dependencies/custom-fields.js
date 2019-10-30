import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  section: PropTypes.string.tag({
    name: 'Nombre del tag',
    description:
      'Si no se coloca la URL de la sección, se renderiza la última historia publicada. Ejemplo: /deporte-total',
  }),
  title: PropTypes.string.tag({
    name: 'Titulo',
    description: 'Colocar el Titulo ',
  }),
  titleAmp: PropTypes.string.tag({
    name: 'Titulo Amp',
    group: 'Configuración',
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
  storiesQty: PropTypes.number.tag({
    name: 'Número de Noticias Amp',
    group: 'Configuración',
    min: 4,
    max: 10,
    step: 1,
    defaultValue: 4,
  }),
})

export default customFields
