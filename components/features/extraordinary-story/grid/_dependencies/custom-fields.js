import PropTypes from 'prop-types'

const customFieldsSection = {
  firstContent: PropTypes.label.tag({
    name: 'Nota a destacar',
  }),
  urlStory: PropTypes.contentConfig('story').tag({
    name: 'URL de Nota',
  }),
  multimediaService: PropTypes.oneOf([
    'default',
    'image',
    'goldfish',
    'youtube',
  ]).tag({
    name: 'Proveedor',
    group: 'Multimedia',
    labels: {
      default: 'Automático',
      image: 'Imagen',
      goldfish: 'GoldFish',
      youtube: 'Youtube',
    },
    defaultValue: 'default',
  }),
  firstSection: PropTypes.contentConfig('section').tag({
    name: 'Primera sección',
    group: 'Secciones laterales',
  }),
  secondSection: PropTypes.contentConfig('section').tag({
    name: 'Segunda sección',
    group: 'Secciones laterales',
  }),
  thirdSection: PropTypes.contentConfig('section').tag({
    name: 'Tercera sección',
    group: 'Secciones laterales',
  }),
  fourthSection: PropTypes.contentConfig('section').tag({
    name: 'Cuarta sección',
    group: 'Secciones laterales',
  }),
}

const customFields = PropTypes.shape({
  ...customFieldsSection,
})
export default customFields
