import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  shareButtonsColor: PropTypes.string.tag({
    name: 'Numero de nota',
    description:
      'Indique el color HEX que quiere para los botones de redes sociales. Ejemplo: #333333',
  }),
  nextStoryButtonColor: PropTypes.number.tag({
    name: 'Cantidad de notas',
    description:
      'Indique el color HEX que quiere para el botón de - Siguiente artículo -. Ejemplo: #333333',
  }),
})

export default customFields
