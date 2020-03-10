import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  imgUrlDesktop: PropTypes.string.tag({
    name: 'Url imagen desktop',
  }),
  imgLink: PropTypes.string.tag({
    name: 'Link imagen',
  }),
  cols: PropTypes.oneOf(['col-1', 'col-2', 'col-3']).tag({
    name: 'Columnas',
    labels: {
      'col-1': '1 columna',
      'col-2': '2 columnas',
      'col-3': '3 columnas',
    },
    defaultValue: 'col-1',
  }),
  rows: PropTypes.oneOf(['row-1', 'row-2', 'w-full']).tag({
    name: 'Filas',
    labels: {
      'row-1': '1 fila',
      'row-2': '2 filas',
      'w-full': 'Manual',
    },
    defaultValue: 'row-1',
  }),
  imgHeight: PropTypes.number.tag({
    name: 'Alto (Pixeles)',
    description:
      'El valor tomará efecto cuando el campo "Filas" tenga el valor "Manual"',
  }),
  imgTitle: PropTypes.string.tag({
    name: 'Title imagen',
    group: 'SEO',
  }),
  imgAlt: PropTypes.string.tag({
    name: 'Alt imagen',
    group: 'SEO',
  }),
})

export default customFields
