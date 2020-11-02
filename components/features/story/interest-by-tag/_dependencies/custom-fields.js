import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  tag: PropTypes.string.tag({
    name: 'Nombre del tag',
    description:
      'Si no se coloca el tag, se renderiza la última historia publicada. Ejemplo (sin /): peru',
  }),
  title: PropTypes.string.tag({
    name: 'Titulo',
    description: 'Colocar el Titulo ',
  }),

  isWeb: PropTypes.bool.tag({
    name: 'Mostrar en "desktop" , "tablet" y "movile"',
    defaultValue: true,
  }),
  isWebAmp: PropTypes.bool.tag({
    name: 'Mostrar en "Amp"',
    defaultValue: true,
  }),

  titleAmp: PropTypes.string.tag({
    name: 'Titulo Amp',
    group: 'Configuración',
    description: 'Colocar el Nombre ',
  }),
  storyAmp: PropTypes.oneOf(['normal', 'slider', 'amp_full_imagen']).tag({
    name: 'Diseño',
    group: 'Configuración',
    labels: {
      normal: 'Normal',
      live: 'Slider AMP',
      amp_full_imagen: 'Imagen ancho completo',
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
