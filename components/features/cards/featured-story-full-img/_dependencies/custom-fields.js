import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  storyConfig: PropTypes.contentConfig('story').isRequired.tag({
    name: 'Configuración del contenido',
  }),
  model: PropTypes.oneOf(['basic', 'twoCol', 'full']).tag({
    name: 'Modelo del Destaque',
    labels: {
      basic: 'Basico',
      twoCol: '2 Columnas',
      full: 'Completo',
    },
    defaultValue: 'basic',
  }),
  crossY: PropTypes.oneOf(['top', 'middle', 'bottom']).tag({
    name: 'Orientación vertical del texto',
    labels: {
      top: 'Arriba',
      middle: 'Medio',
      bottom: 'Abajo',
    },
    defaultValue: 'bottom',
  }),
  crossX: PropTypes.oneOf(['start', 'end']).tag({
    name: 'Orientación horizontal del texto',
    labels: {
      start: 'Inicio',
      end: 'Fin',
    },
    defaultValue: 'start',
  }),
  categoryField: PropTypes.string.tag({
    name: 'Sección',
    group: 'Editar campos',
    description: 'Dejar vacío para tomar el valor original de la historia.',
  }),
  titleField: PropTypes.string.tag({
    name: 'Título',
    group: 'Editar campos',
    description: 'Dejar vacío para tomar el valor original de la historia.',
  }),
  imgField: PropTypes.string.tag({
    name: 'Imagen',
    group: 'Editar campos',
    description: 'Dejar vacío para tomar el valor original de la historia.',
  }),
})

export default customFields
