import PropTypes from 'prop-types'

const customFieldsImport = PropTypes.shape({
    seccion:PropTypes.string.isRequired.tag({ name: 'Sección' }),
})

export default customFieldsImport