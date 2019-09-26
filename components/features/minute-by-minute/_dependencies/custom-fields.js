import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  storyConfig: PropTypes.contentConfig('story').isRequired.tag({
    name: 'Configuración del contenido',
  }),
  typeComponent: PropTypes.oneOf(['evento', 'partido']).tag({
    name: 'Tipo de Componente',
    labels: {
      evento: 'Evento',
      partido: 'Partido',
    },
    defaultValue: 'partido',
  }),
  codeComponent: PropTypes.string.tag({
    name: 'Codigo',
    description: 'Inserte el codigo del evento o del partido.',
  }),
})

export default customFields
