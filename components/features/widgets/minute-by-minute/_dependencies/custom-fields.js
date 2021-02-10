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
  titleField: PropTypes.string.tag({
    name: 'Título',
    group: 'Editar campos',
    description: 'Dejar vacío para tomar el valor original de la noticia.',
  }),
  subtitleField: PropTypes.string.tag({
    name: 'Bajada',
    group: 'Editar campos',
    description: 'Dejar vacío para tomar el valor original de la noticia.',
  }),
})

export default customFields
