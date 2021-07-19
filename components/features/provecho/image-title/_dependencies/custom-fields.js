import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  urlImage: PropTypes.string.isRequired.tag({
    name: 'Url de la imagen',
    description: 'Url del imagen',
  }),
  link: PropTypes.string.isRequired.tag({
    name: 'Link de la imagen',
    description: 'Link de la imagen',
  }),
  title: PropTypes.string.tag({
    name: 'Título de la imagen',
    description: 'Título de la imagen',
  }),
  isBigImage: PropTypes.bool.tag({
    name: 'Imagen grande',
    defaultValue: false,
    description: 'Imagen que ocupa toda el ancho de la web',
  }),
})

export default customFields
