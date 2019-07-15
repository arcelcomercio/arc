import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
    section: PropTypes.string.tag({
        name: 'Sección',
        description: 'Debe iniciar con un slash. Ejemplo: /deportes'
    }),
    sectionName: PropTypes.string.tag({
        name: 'Nombre de la sección',
        description: 'Si no se define el nombre personalizado, tomará automáticamente el nombre de la sección del elemento que se muestra.'
    }),
})

export default customFields