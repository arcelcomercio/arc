import PropTypes from 'prop-types'

export default PropTypes.shape({
  storyConfig: PropTypes.contentConfig('story').isRequired.tag({
    name: 'Configuración del contenido',
  }),
  design: PropTypes.oneOf(['first', 'second', 'third', 'fourth']).tag({
    name: 'Diseño',
    labels: {
      first: 'Autor+Nota simple', // 1col, 1row, imagen parcial superior, sin subtítulo
      second: 'Autor+Nota doble parcial', // 2col, 1row, imagen parcial derecha, con subtítulo
      third: 'Autor+Nota doble completa', // 2col, 1row, imagen completa derecha, con subtítulo
      fourth: 'Autor+Nota full', // 2col, 2row, imagen parcial superior, con subtítulo
    },
    defaultValue: 'first',
  }),
  sectionField: PropTypes.string.tag({
    name: 'Sección',
    group: 'Editar campos',
    description: 'Dejar vacío para tomar el valor original de la historia.',
  }),
  titleField: PropTypes.string.tag({
    name: 'Título',
    group: 'Editar campos',
    description: 'Dejar vacío para tomar el valor original de la historia.',
  }),
  subTitleField: PropTypes.string.tag({
    name: 'Subtítulo',
    group: 'Editar campos',
    description: 'Dejar vacío para tomar el valor original de la historia.',
  }),
})
