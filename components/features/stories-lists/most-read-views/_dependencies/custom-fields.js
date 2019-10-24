import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  title: PropTypes.string.tag({
    name: 'Titulo',
    description: 'Titulo del componente',
  }),
  urlTitle: PropTypes.string.tag({
    name: 'URL del titulo',
  }),
  storiesQty: PropTypes.number.tag({
    name: 'Numero de Historias',
    description: 'Candiad de historias a mostrar, por defecto 3',
  }),
  showViews: PropTypes.bool.tag({
    name: 'Mostrar Views',
    defaultValue: true,
  }),
  showMore: PropTypes.bool.tag({
    name: 'Mostrar ver más',
  }),
  urlShowMore: PropTypes.string.tag({
    name: 'URL de ver más',
  }),
  freeHTML: PropTypes.richtext.tag({
    name: 'Insertar título con código HTML',
  }),
})

export default customFields
