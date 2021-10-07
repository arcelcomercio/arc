import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  storiesConfig: PropTypes.contentConfig('stories').isRequired.tag({
    name: 'Configuración del contenido',
  }),
  seeMoreLink: PropTypes.string.tag({ name: 'Link de Ver Mas' }),
  infoInterviewed: PropTypes.bool.tag({
    name: 'Ver info entrevistado',
    defaultValue: false,
  }),
  isTrailer: PropTypes.bool.tag({
    name: 'Sección Tráilers',
    defaultValue: false,
  }),
})

export default customFields
