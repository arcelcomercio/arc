import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  slug: PropTypes.string.isRequired.tag({
    slugAuthor: 'Slug del Autor',
    description: `Ingrese el slug del autor`,
  }),
  story: PropTypes.string.tag({
    storyNumber: 'Numero de Histria',
    description: `Dejar en blanco para traer la ultima historia publicada`,
  }),
})

export default customFields
