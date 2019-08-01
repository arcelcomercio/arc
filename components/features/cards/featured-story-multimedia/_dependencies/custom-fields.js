import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  section: PropTypes.string.tag({
    name: 'URL de la sección',
    description:
      'Si no se coloca la URL de la sección, se renderiza la última historia publicada. Ejemplo: /deporte-total',
  }),
  freeHtml: PropTypes.richtext.tag({
    name: 'Código HTML',
    group: 'Editar sección',
  }),
})

export default customFields
