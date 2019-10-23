import PropTypes from 'prop-types'
import { spacesAdsId, spacesAdsName } from '../../../../utilities/config-params'

const customFields = PropTypes.shape({
  data1: PropTypes.string.tag({
    name: 'URL de nota 1',
  }),
  title1: PropTypes.string.tag({
    name: 'Título nota 1',
    description: 'Dejar vacío para mostrar el título original de la nota.',
    group: 'Datos nota 1',
  }),
  authorOrSection1: PropTypes.string.tag({
    name: 'Autor o sección de la nota 1',
    description: 'Dejar vacío para mostrar el autor o sección original.',
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
  data2: PropTypes.string.tag({
    name: 'URL de nota 2',
  }),
  title2: PropTypes.string.tag({
    name: 'Título nota 2',
    description: 'Dejar vacío para mostrar el título original de la nota.',
    group: 'Datos nota 2',
  }),
  authorOrSection2: PropTypes.string.tag({
    name: 'Autor o sección de la nota 2',
    description: 'Dejar vacío para mostrar el autor o sección original.',
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
  data3: PropTypes.string.tag({
    name: 'URL de nota 3',
  }),
  title3: PropTypes.string.tag({
    name: 'Título nota 3',
    description: 'Dejar vacío para mostrar el título original de la nota.',
    group: 'Datos nota 3',
  }),
  authorOrSection3: PropTypes.string.tag({
    name: 'Autor o sección de la nota 3',
    description: 'Dejar vacío para mostrar el autor o sección original.',
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
