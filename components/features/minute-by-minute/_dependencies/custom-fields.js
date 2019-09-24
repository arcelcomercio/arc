import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  storyConfig: PropTypes.contentConfig('story').isRequired.tag({
    name: 'Configuración del contenido',
  }),
  typeComponent: PropTypes.oneOf(['event', 'play']).tag({
    name: 'Tipo de Componente',
    labels: {
      event: 'Evento',
      play: 'Partido',
    },
    defaultValue: 'play',
  }),
  codeComponent: PropTypes.string.tag({
    name: 'Codigo',
    description: 'Inserte el codigo del evento o del partido.',
  }),
})

export default customFields
