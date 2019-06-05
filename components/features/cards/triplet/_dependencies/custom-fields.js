import PropTypes from 'prop-types'

// Maybe work without PropTypes.shape
const customFields = PropTypes.shape({
  data1: PropTypes.string.tag({
    name: 'Enlace Nota 1',
  }),
  title1: PropTypes.string.tag({
    name: 'Título Nota 1',
    description: 'Dejar vacío para tomar el título original de la historia.',
  }),
  data2: PropTypes.string.tag({
    name: 'Enlace Nota 2',
  }),
  title2: PropTypes.string.tag({
    name: 'Título Nota 2',
    description: 'Dejar vacío para tomar el título original de la historia.',
  }),
  data3: PropTypes.string.tag({
    name: 'Enlace Nota 3',
  }),
  title3: PropTypes.string.tag({
    name: 'Título Nota 3',
    description: 'Dejar vacío para tomar el título original de la historia.',
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
  webskedId: PropTypes.string.tag({
    name: 'ID',
    description:
      'Si se completa este campo la fuente de origen de datos será la colección de Websked correspondiente al ID.',
    group: 'Colección',
  }),
})

export default customFields
