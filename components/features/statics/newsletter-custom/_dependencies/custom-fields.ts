import PropTypes from 'prop-types'

// TODO: eliminar los customFields que ya no se usan
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
  urlTos: PropTypes.string.tag({
    name: 'URL de términos y condiciones',
  }),
  urlPrivacyPolicies: PropTypes.string.tag({
    name: 'URL de políticas de privacidad',
  }),
  UrlMoreNews: PropTypes.string.tag({
    name: 'URL de más newsletter +',
    description: 'Solo esta para gestion',
  }),
  colorButton: PropTypes.string.tag({
    name: 'Color del boton',
  }),
  activateJS: PropTypes.string.tag({
    name: 'Desactivar JS "DESACTIVAR"',
  }),
})

export default customFields
