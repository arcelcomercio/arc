import PropTypes from 'prop-types'

const customFieldsImport = PropTypes.shape({
    seccion:PropTypes.string.isRequired.tag({ name: 'Sección' }),
    secctionName:PropTypes.string.tag({ name: 'Nombre de la sección' }),
})

export default customFieldsImport