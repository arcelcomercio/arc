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
      'Te enviaremos el mejor contenido. Escribe tu correo electrónico y dale clic a  "Recibir"',
  }),
  urlTos: PropTypes.string.isRequired.tag({
    name: 'URL de términos y condiciones',
  }),
  urlPrivacyPolicies: PropTypes.string.isRequired.tag({
    name: 'URL de políticas de privacidad',
  }),
  colorButton: PropTypes.string.tag({
    name: 'Color del boton',
  }),
})

export default customFields
