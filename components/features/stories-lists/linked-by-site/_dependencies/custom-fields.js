import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  storiesConfig: PropTypes.contentConfig('stories').isRequired.tag({
    name: 'Configuración del contenido',
  }),
  isTargetBlank: PropTypes.bool.tag({
    name: 'Abrir URL en otra pestaña',
  }),
  titleField: PropTypes.string.tag({
    name: 'Título',
    description:
      'Dejar vacío para tomar el valor por defecto, "No te pierdas".',
  }),
  subtitleField: PropTypes.richtext.tag({
    name: 'Subtítulo',
    description:
      'Acepta contenido HTML. Dejar vacío para tomar el valor por defecto, "Contenido de <Marca>".',
  }),
})

export default customFields
