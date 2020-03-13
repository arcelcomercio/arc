import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  imageBanner: PropTypes.string.tag({
    name: 'Imagen de cabecera',
    description: 'Dejar vacío para no mostrar imagen',
  }),
  image: PropTypes.string.tag({
    name: 'Imagen',
    description: 'Dejar vacío para mostrar imagen por defecto',
  }),
  description: PropTypes.string.tag({
    name: 'Descripción',
    defaultValue:
      'Para mantenerte informado de las noticias más relevantes del día.',
  }),
  urlTos: PropTypes.string.isRequired.tag({
    name: 'URL de términos y condiciones',
  }),
  urlPrivacyPolicies: PropTypes.string.isRequired.tag({
    name: 'URL de políticas de privacidad',
  }),
  isActiveApiCovid19: PropTypes.bool.tag({
    name: 'Cambiar newsletter Covid-19',
    defaultValue: false,
  }),
})

export default customFields
