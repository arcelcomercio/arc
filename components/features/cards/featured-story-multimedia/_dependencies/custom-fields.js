import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  section: PropTypes.string.tag({
    name: 'URL de la sección',
    /**
     * CR: Validar si se puede agregar una descripción
     * similar a como se hace con los otros featured-stories.
     */
  }),
})

export default customFields
