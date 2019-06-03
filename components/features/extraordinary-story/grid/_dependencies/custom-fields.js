import PropTypes from 'prop-types'

const customFieldsSection = {
  urlStory: PropTypes.contentConfig('story').tag({
    name: 'SLUG',
    description: 'URL sin dominio',
  }),
  multimediaService: PropTypes.oneOf([
    'default',
    'image',
    'goldfish',
    'youtube',
  ]).tag({
    name: 'Servicio',
    group: 'Multimedia',
    labels: {
      default: 'Automático',
      image: 'Imagen',
      goldfish: 'GoldFish',
      youtube: 'Youtube',
    },
    defaultValue: 'default',
  }),
  multimediaSource: PropTypes.string.tag({
    name: 'Identificador de recurso',
    group: 'Multimedia',
    description:
      'Automático: Obtiene imagen o video de la noticia. Imagen: Url de la imagen. GoldFish: ID del video. Youtube: Url del video.',
  }),
  section1: PropTypes.contentConfig('section').tag({
    name: 'Sección 1',
    group: 'Grilla',
  }),
  section2: PropTypes.contentConfig('section').tag({
    name: 'Sección 2',
    group: 'Grilla',
  }),
  section3: PropTypes.contentConfig('section').tag({
    name: 'Sección 3',
    group: 'Grilla',
  }),
  section4: PropTypes.contentConfig('section').tag({
    name: 'Sección 4 ',
    group: 'Grilla',
  }),

  logo: PropTypes.string.tag({
    name: 'Logo',
  }),
}

const customFields = PropTypes.shape({
  ...customFieldsSection,
})
export default customFields
