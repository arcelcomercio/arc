import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
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
  crossY: PropTypes.oneOf(['top', 'middle', 'bottom']).tag({
    name: 'Orientación',
    group: 'Configuración',
    labels: {
      top: 'Arriba',
      middle: 'Medio',
      bottom: 'Abajo',
    },
    defaultValue: 'bottom',
  }),
  crossX: PropTypes.oneOf(['start', 'end']).tag({
    name: 'Posición',
    group: 'Configuración',
    labels: {
      start: 'Inicio',
      end: 'Fin',
    },
    defaultValue: 'start',
  }),
})

export default customFields
