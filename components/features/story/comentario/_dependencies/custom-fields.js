import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  comment: PropTypes.oneOf(['spotim', 'facebook']).tag({
    name: 'Tipo de Comentario',
    labels: {
      spotim: 'spot.IM',
      facebook: 'Facebook',
    },
    defaultValue: 'facebook',
  }),
  spotId: PropTypes.string.tag({
    name: 'id spotim ',
    description: 'spotId ejemplo: sp_LX2WRR7S',
  }),

  excluir: PropTypes.richtext.tag({
    name: 'Excluir seccion ',
    description: 'Excluir secciones ejemplo: politica|economia',
  }),
})

export default customFields
