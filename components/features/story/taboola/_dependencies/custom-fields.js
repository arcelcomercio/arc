import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  renderIfQueryParam: PropTypes.bool.tag({
    name: 'Renderizar sólo si existe Query Parameter',
    description:
      'Si activas esta opción, taboola sólo se renderizará si la URL contiene el parámetro ?widgettaboola=true',
    defaultValue: false,
  }),
})

export default customFields
