import PropTypes from 'prop-types'

const customFieldsSection = {
  firstContent: PropTypes.label.tag({
    name: 'Contenido',
  }),
  link: PropTypes.string.isRequired.tag({
    name: 'Link de nota a destacar',
  }),
  secondContent: PropTypes.label.tag({
    name: 'Secciones de grilla',
  }),
  firstSection: PropTypes.string.tag({
    name: 'Primera sección',
    description: 'Dejar vacío para tomar el valor original de la historia.',
  }),
  secondSection: PropTypes.string.tag({
    name: 'Segunda sección',
    description: 'Dejar vacío para tomar el valor original de la historia.',
  }),
  thirdSection: PropTypes.string.tag({
    name: 'Tercera sección',
    description: 'Dejar vacío para tomar el valor original de la historia.',
  }),
  fourthSection: PropTypes.string.tag({
    name: 'Cuarta sección',
    description: 'Dejar vacío para tomar el valor original de la historia.',
  }),
}

const customFields = PropTypes.shape({
  ...customFieldsSection,
})
export default customFields
