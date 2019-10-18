import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  titleEditorial: PropTypes.string.tag({
    name: 'Titulo de bloque editorial',
  }),
  imageEditorial: PropTypes.string.tag({ name: 'Url de Imagen' }),
})

export default customFields
