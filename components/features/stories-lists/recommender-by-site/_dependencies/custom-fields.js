import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  enabledContentManual: PropTypes.bool.tag({
    name: 'Usar configuración manual',
    defaultValue: false,
    group: 'Configuración Manual',
  }),
  storiesManualConfig: PropTypes.contentConfig('stories').isRequired.tag({
    name: 'Seleccionar contenido manual',
    group: 'Configuración Manual',
  }),
  storiesConfig: PropTypes.contentConfig('stories').isRequired.tag({
    name: 'Seleccionar contenido automático',
    group: 'Configuración automático',
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
