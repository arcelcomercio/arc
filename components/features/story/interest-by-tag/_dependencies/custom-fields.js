import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  // Config general
  tagToFetch: PropTypes.string.tag({
    name: 'Nombre del tag',
    description:
      'Ejemplo (sin /): peru - Si no se coloca el tag, se renderiza la última historia publicada. ',
  }),
  // Config por defecto
  renderDefault: PropTypes.bool.tag({
    name: 'Mostrar en output por defecto',
    defaultValue: true,
    group: 'Por defecto',
  }),
  titleDefault: PropTypes.string.tag({
    name: 'Título por defecto',
    group: 'Por defecto',
  }),
  // Config AMP
  renderAMP: PropTypes.bool.tag({
    name: 'Mostrar en output AMP',
    defaultValue: true,
    group: 'AMP',
  }),
  titleAMP: PropTypes.string.tag({
    name: 'Título en AMP',
    group: 'AMP',
  }),
  storyAMP: PropTypes.oneOf(['normal', 'slider', 'amp_full_imagen']).tag({
    name: 'Diseño',
    group: 'AMP',
    labels: {
      normal: 'Normal',
      live: 'Slider AMP',
      amp_full_imagen: 'Imagen ancho completo',
    },
    defaultValue: 'normal',
  }),
  storiesQtyAMP: PropTypes.number.tag({
    name: 'Número de Noticias en AMP',
    group: 'AMP',
    min: 4,
    max: 10,
    step: 1,
    defaultValue: 4,
  }),
  // Config Lite
  renderLite: PropTypes.bool.tag({
    name: 'Mostrar en output Lite',
    defaultValue: true,
    group: 'Lite',
  }),
  titleLite: PropTypes.string.tag({
    name: 'Título en Lite',
    group: 'Lite',
  }),
  storiesQtyLite: PropTypes.number.tag({
    name: 'Número de Noticias Lite',
    group: 'Lite',
    min: 3,
    max: 9,
    step: 1,
    defaultValue: 6,
  }),
  showSubtitleLite: PropTypes.bool.tag({
    name: 'Mostrar subtítulo de noticias',
    defaultValue: true,
    group: 'Lite',
  }),
})

export default customFields
