import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  // content: PropTypes.label.tag({
  //   name: 'Separador Opinión21',
  // }),
  section: PropTypes.string.tag({
    name: 'URL de la sección',
    description: 'Ingrese el nombre de la sección',
  }),
  titleSection: PropTypes.string.tag({
    name: 'Título de la sección',
    description:
      'Este campo puede ser editado manualmente, no es necesario ingresarlo',
  }),
  htmlCode: PropTypes.richtext.tag({
    name: 'Código HTML',
  }),
})

export default customFields
