import PropTypes from 'prop-types'

// Maybe work without PropTypes.shape
const customFields = PropTypes.shape({
  data1: PropTypes.string.tag({
    name: 'Enlace nota 1',
  }),
  title1: PropTypes.string.tag({
    name: 'Título nota 1',
    description: 'Dejar vacío para tomar el título original de la nota.',
  }),
  data2: PropTypes.string.tag({
    name: 'Enlace nota 2',
  }),
  title2: PropTypes.string.tag({
    name: 'Título nota 2',
    description: 'Dejar vacío para tomar el título original de la nota.',
  }),
  data3: PropTypes.string.tag({
    name: 'Enlace nota 3',
  }),
  title3: PropTypes.string.tag({
    name: 'Título nota 3',
    description: 'Dejar vacío para tomar el título original de la nota.',
  }),
  webskedId: PropTypes.string.tag({
    name: 'ID',
    group: 'Colección',
  }),
  showAuthorOrSection: PropTypes.oneOf(['author', 'section']).tag({
    name: 'Mostrar autor o sección',
    labels: {
      author: 'Autor',
      section: 'Sección',
    },
    defaultValue: 'author',
    group: 'Configuraciones',
  }),
  multimediaOrientation: PropTypes.oneOf(['left', 'right']).tag({
    name: 'Posición de la imagen',
    labels: {
      left: 'Izquierda',
      right: 'Derecha',
    },
    defaultValue: 'right',
    group: 'Configuraciones',
  }),
})

export default customFields
