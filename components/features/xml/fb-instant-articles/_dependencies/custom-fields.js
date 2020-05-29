import PropTypes from 'prop-types'

// Customfiels FIA para el módulo recomendador por marca
const recommenderBySite = {
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
  titleField: PropTypes.string.tag({
    name: 'Título',
    description:
      'Dejar vacío para tomar el valor por defecto, "No te pierdas".',
  }),
}

const customFields = PropTypes.shape(recommenderBySite)

export default customFields
