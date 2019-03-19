import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
    titleSeparator: PropTypes.string.tag({ name: 'Titulo del separador' }),
    titleLink: PropTypes.string.tag({ name: 'Enlace del separador' }),
    section: PropTypes.string.isRequired.tag({ name: 'Sección' }),
    htmlCode: PropTypes.richtext.tag({ name: 'Código HTML' }),
})

export default customFields