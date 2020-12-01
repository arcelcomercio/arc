import PropTypes from 'prop-types'

const customFieldsSection = {
  urlStory: PropTypes.contentConfig('story').tag({
    name: 'Origen',
  }),
  multimediaService: PropTypes.oneOf([
    'default',
    'image',
    'goldfish',
    'jwplayer',
    'youtube',
  ]).tag({
    name: 'Servicio',
    group: 'Multimedia',
    labels: {
      default: 'Automático',
      image: 'Imagen',
      goldfish: 'GoldFish',
      jwplayer: 'JWplayer',
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
    description: 'Colocar una url de imagen para cambiar el logo (opcional).',
  }),
  sectionLink: PropTypes.string.tag({
    name: 'Url de la sección',
    description:
      'Colocar una url de sección para el logo. Ejm: /deportes. Por defecto imprime las sección principal de la nota.',
  }),
}

const customFields = PropTypes.shape({
  ...customFieldsSection,
})
export default customFields
