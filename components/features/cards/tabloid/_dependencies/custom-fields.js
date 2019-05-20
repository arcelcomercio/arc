import PropTypes from 'prop-types'

const customFieldsImport = PropTypes.shape({
    section: PropTypes.string.isRequired.tag({
        name: 'Sección'
    }),
    sectionName: PropTypes.string.tag({
        name: 'Nombre de la sección'
    }),
})

export default customFieldsImport