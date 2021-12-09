import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  freeHtml: PropTypes.richtext.tag({
    name: 'Código HTML Adicional',
    group: 'Agregar bloque de HTML',
    description:
      'HTML a renderizar en el espacio disponible junto al módulo de publicidad. El HTML siempre se mostrará en "desktop", "tablet" y "mobile".',
  }),
})

export default customFields
