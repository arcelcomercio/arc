import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
    feedConfig: PropTypes.contentConfig('story').isRequired.tag({
        name: 'Fuente de historias',
    })
})

export default customFields
