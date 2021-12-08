import PropTypes from 'prop-types'

import { customFieldsAdsList } from '../../_dependencies/custom-fields'

const customFields = PropTypes.shape({
  storyConfig: PropTypes.contentConfig('stories').isRequired.tag({
    name: 'Configuración del contenido',
  }),
  seeMoreLink: PropTypes.string.isRequired.tag({
    name: 'Link de Ver Mas',
    description: 'Cree el link a donde redirige ver mas. Ej. /archivo/seccion',
  }),
  ...customFieldsAdsList,
  showMiddle: PropTypes.bool.tag({
    name: 'Mostrar "middle"',
    group: 'Publicidad Middle',
    defaultValue: false,
  }),
  adsMiddlePosition: PropTypes.number.tag({
    name: 'Posición en la lista',
    group: 'Publicidad Middle',
  }),
})

export default customFields
