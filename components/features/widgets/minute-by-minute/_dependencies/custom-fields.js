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
  backgroundImgSponsor: PropTypes.string.tag({
    name: 'Imagen de Fondoxx',
    group: 'Auspiciadores',
    description: 'Dejar vacio para no mostrar nada',
  }),
  bannerImage: PropTypes.string.tag({
    name: 'Imagen de Banner',
    group: 'Auspiciadores',
    description: 'Dejar vacio para no mostrar nada',
  }),
  bannerImageUrl: PropTypes.string.tag({
    name: 'URL de Imagen de Banner',
    group: 'Auspiciadores',
    description: 'Dejar vacio para no mostrar nada',
  }),
  colorText: PropTypes.string.tag({
    name: 'Color de las letras',
    group: 'Auspiciadores',
    description: 'El valor es Hexadecimal: #000000',
  }),
})

export default customFields
