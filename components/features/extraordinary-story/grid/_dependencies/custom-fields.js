import PropTypes from 'prop-types'

const customFieldsSection = {
  firstLabel: PropTypes.label.tag({
    name: 'Multimedia por nota',
    group: 'Nota destacada',
  }),
  urlStory: PropTypes.contentConfig('story').tag({
    name: 'URL de Nota',
    group: 'Nota destacada',
  }),
  secondLabel: PropTypes.label.tag({
    name: 'Multimedia manual',
    group: 'Nota destacada',
  }),
  multimediaService: PropTypes.oneOf([
    'default',
    'image',
    'goldfish',
    'youtube',
  ]).tag({
    name: 'Proveedor',
    group: 'Nota destacada',
    labels: {
      default: 'Automático',
      image: 'Imagen',
      goldfish: 'GoldFish',
      youtube: 'Youtube',
    },
    defaultValue: 'default',
  }),
  multimediaSource: PropTypes.string.tag({
    name: 'Recurso',
    group: 'Nota destacada',
    description:
      'Automático: Obtiene imagen o video de la noticia. Imagen: Url de la imagen. GoldFish: ID del video. Youtube: Url del video.',
  }),
  section1: PropTypes.contentConfig('section').tag({
    name: 'Primera sección',
    group: 'Secciones laterales',
  }),
  section2: PropTypes.contentConfig('section').tag({
    name: 'Segunda sección',
    group: 'Secciones laterales',
  }),
  section3: PropTypes.contentConfig('section').tag({
    name: 'Tercera sección',
    group: 'Secciones laterales',
  }),
  section4: PropTypes.contentConfig('section').tag({
    name: 'Cuarta sección',
    group: 'Secciones laterales',
  }),

  logo: PropTypes.string.tag({
    name: 'Logo',
    group: 'Secciones laterales',
  }),
}

const customFields = PropTypes.shape({
  ...customFieldsSection,
})
export default customFields
