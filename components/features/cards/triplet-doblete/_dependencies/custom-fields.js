import PropTypes from 'prop-types'

import { spacesAdsId, spacesAdsName } from '../../../../utilities/config-params'

const customFields = PropTypes.shape({
  viewDoblete: PropTypes.bool.tag({
    name: 'Solo doblete',
    defaultValue: false,
  }),

  invertColor1: PropTypes.bool.tag({
    name: 'Invertir color nota 1',
    defaultValue: false,
  }),
  invertColor2: PropTypes.bool.tag({
    name: 'Invertir color nota 2',
    defaultValue: false,
  }),
  invertColor3: PropTypes.bool.tag({
    name: 'Invertir color nota 3',
    defaultValue: false,
  }),

  hideAuthor1: PropTypes.bool.tag({
    name: 'Ocultar autor nota 1',
    defaultValue: false,
  }),
  hideAuthor2: PropTypes.bool.tag({
    name: 'Ocultar autor nota 2',
    defaultValue: false,
  }),
  hideAuthor3: PropTypes.bool.tag({
    name: 'Ocultar autor nota 3',
    defaultValue: false,
  }),

  headerField1: PropTypes.string.tag({
    name: 'Antetítulo nota 1',
    description: 'Dejar vacío para mostrar el antetítulo original de la nota.',
    group: 'Datos nota 1',
  }),
  titleField1: PropTypes.string.tag({
    name: 'Título nota 1',
    description: 'Dejar vacío para mostrar el título original de la nota.',
    group: 'Datos nota 1',
  }),
  authorField1: PropTypes.string.tag({
    name: 'Autor de la nota 1',
    description: 'Dejar vacío para mostrar el autor original.',
    group: 'Datos nota 1',
  }),
  image1: PropTypes.string.tag({
    name: 'Url de imagen para la nota 1',
    description: 'Dejar vacío para mostrar la imagen original.',
    group: 'Datos nota 1',
  }),
  adsSpace: PropTypes.oneOf(spacesAdsId()).tag({
    name: 'Espacio',
    group: 'Datos nota 1',
    labels: spacesAdsName(),
    defaultValue: 'none',
  }),

  storyConfig: PropTypes.contentConfig('story').isRequired.tag({
    name: 'Contenido de la Nota 1',
    group: 'Automático nota 1',
  }),

  headerField2: PropTypes.string.tag({
    name: 'Antetítulo nota 2',
    description: 'Dejar vacío para mostrar el antetítulo original de la nota.',
    group: 'Datos nota 2',
  }),
  titleField2: PropTypes.string.tag({
    name: 'Título nota 2',
    description: 'Dejar vacío para mostrar el título original de la nota.',
    group: 'Datos nota 2',
  }),
  authorField2: PropTypes.string.tag({
    name: 'Autor de la nota 2',
    description: 'Dejar vacío para mostrar el autor original.',
    group: 'Datos nota 2',
  }),
  image2: PropTypes.string.tag({
    name: 'Url de imagen para la nota 2',
    description: 'Dejar vacío para mostrar la imagen original.',
    group: 'Datos nota 2',
  }),
  adsSpace2: PropTypes.oneOf(spacesAdsId()).tag({
    name: 'Espacio',
    group: 'Datos nota 2',
    labels: spacesAdsName(),
    defaultValue: 'none',
  }),

  storyConfig2: PropTypes.contentConfig('story').isRequired.tag({
    name: 'Contenido de la Nota 2',
    group: 'Automático nota 2',
  }),

  headerField3: PropTypes.string.tag({
    name: 'Antetítulo nota 3',
    description: 'Dejar vacío para mostrar el antetítulo original de la nota.',
    group: 'Datos nota 3',
  }),
  titleField3: PropTypes.string.tag({
    name: 'Título nota 3',
    description: 'Dejar vacío para mostrar el título original de la nota.',
    group: 'Datos nota 3',
  }),
  authorField3: PropTypes.string.tag({
    name: 'Autor de la nota 3',
    description: 'Dejar vacío para mostrar el autor original.',
    group: 'Datos nota 3',
  }),
  image3: PropTypes.string.tag({
    name: 'Url de imagen para la nota 3',
    description: 'Dejar vacío para mostrar la imagen original.',
    group: 'Datos nota 3',
  }),
  adsSpace3: PropTypes.oneOf(spacesAdsId()).tag({
    name: 'Espacio',
    group: 'Datos nota 3',
    labels: spacesAdsName(),
    defaultValue: 'none',
  }),

  storyConfig3: PropTypes.contentConfig('story').isRequired.tag({
    name: 'Contenido de la Nota 3',
    group: 'Automático nota 3',
  }),
})

export default customFields
