import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
    title: PropTypes.string.tag({
      name: 'Agregar título',
    }),
    subtitle: PropTypes.string.tag({
      name: 'Agregar subtitulo',
    }),
    color: PropTypes.string.tag({
      name: 'Agregar color',
    }),
})

export default customFields