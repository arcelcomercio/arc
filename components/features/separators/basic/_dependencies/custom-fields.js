import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  section: PropTypes.string.isRequired.tag({ name: 'Sección' }),
  titleSeparator: PropTypes.string.tag({ name: 'Titulo del separador' }),
  titleLink: PropTypes.string.tag({ name: 'URL del separador' }),
  htmlCode: PropTypes.richtext.tag({ name: 'Insertar título con código HTML' }),
  model: PropTypes.oneOf(['basic', 'video']).tag({
    name: 'Tipo de Separador',
    labels: {
      basic: 'Basico',
      video: 'Video',
    },
    defaultValue: 'basic',
  }),
  seeMore: PropTypes.bool.tag({
    name: 'Botón ver mas',
    defaultValue: false,
  }),
  seeMoreLink: PropTypes.string.tag({
    name: 'Link de Ver Mas',
  }),
  textAling: PropTypes.oneOf(['left', 'center']).tag({
    name: 'Alineacion de texto',
    labels: {
      left: 'Izquierda',
      center: 'Centro',
    },
    defaultValue: 'left',
  }),
})

export default customFields
