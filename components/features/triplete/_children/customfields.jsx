import PropTypes from 'prop-types'

// Maybe work without PropTypes.shape
// eslint-disable-next-line import/prefer-default-export
export const customFields = PropTypes.shape({
  content1: PropTypes.label.tag({
    name: 'Nota 1',
  }),
  link1: PropTypes.string.isRequired.tag({
    name: 'Link de nota interna 1',
  }),
  title1: PropTypes.string.tag({
    name: 'Título 1',
    description: 'Dejar vacío para tomar el valor original de la noticia.',
  }),
  content2: PropTypes.label.tag({
    name: 'Nota 2',
  }),
  link2: PropTypes.string.isRequired.tag({
    name: 'Link de nota interna 2',
  }),
  title2: PropTypes.string.tag({
    name: 'Título 2',
    description: 'Dejar vacío para tomar el valor original de la noticia.',
  }),
  content3: PropTypes.label.tag({
    name: 'Nota 3',
  }),
  link3: PropTypes.string.isRequired.tag({
    name: 'Link de nota interna 3',
  }),
  title3: PropTypes.string.tag({
    name: 'Título 3',
    description: 'Dejar vacío para tomar el valor original de la noticia.',
  }),
  settings: PropTypes.label.tag({
    name: 'Configuraciones',
  }),
  showAuthorOrSection: PropTypes.oneOf(['author', 'section']).tag({
    name: 'Mostrar autor o sección',
    labels: {
      author: 'Autor',
      section: 'Sección',
    },
    defaultValue: 'author',
  }),
  multimediaOrientation: PropTypes.oneOf(['left', 'right']).tag({
    name: 'Posición de la imagen',
    labels: {
      left: 'Izquierda',
      right: 'Derecha',
    },
    defaultValue: 'right',
  }),
})
