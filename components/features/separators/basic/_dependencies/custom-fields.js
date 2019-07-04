import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  section: PropTypes.string.isRequired.tag({ name: 'Sección' }),
  titleSeparator: PropTypes.string.tag({ name: 'Titulo del separador' }),
  titleLink: PropTypes.string.tag({ name: 'URL del separador' }),
  htmlCode: PropTypes.richtext.tag({ name: 'Insertar título con código HTML' }),
})

export default customFields
