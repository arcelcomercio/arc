import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  hierarchyMenu: PropTypes.contentConfig('navigation').tag({
    name: 'Editar navegación',
    group: 'Configuración del Menu',
  }),
})

export default customFields
