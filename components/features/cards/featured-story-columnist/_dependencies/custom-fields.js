import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  slug: PropTypes.string.isRequired.tag({
    slugAuthor: 'Slug del Autor',
    description: `En la URL del autor, el slug es el identificador que está luego de /autor/. Ejemplo: /autor/[slug].`,
  }),
  story: PropTypes.string.tag({
    storyNumber: 'Numero de Histria',
    description: `Dejar en blanco para traer la última historia publicada.`,
  }),
})

export default customFields
