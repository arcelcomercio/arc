import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  section: PropTypes.string.tag({
    name: 'URL de la sección',
    description:
      'Si no se coloca la URL de la sección, se renderiza la última historia publicada. Ejemplo: /deporte-total',
  }),
  customTitle: PropTypes.string.tag({
    name: 'Editar título',
    group: 'Configuración',
  }),
  maxStories: PropTypes.number.tag({
    name: 'Cantidad máxima de historias',
    group: 'Configuración',
  }),
  deleteLinks: PropTypes.boolean.tag({
    name: 'Eliminar enlaces en el título',
    group: 'Configuración',
  }),
})

export default customFields
