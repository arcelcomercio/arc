import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  storyConfig: PropTypes.contentConfig('stories-dev').tag({
    name: 'Configuración del contenido',
  }),
  adsMobile2: PropTypes.bool.tag({
    name: 'Mostrar "movil2"',
    group: 'Publicidad Movil',
  }),
  adsMobilePosition2: PropTypes.number.tag({
    name: 'Posición en la lista',
    group: 'Publicidad Movil',
  }),
  adsMobile3: PropTypes.bool.tag({
    name: 'Mostrar "movil3"',
    group: 'Publicidad Movil',
  }),
  adsMobilePosition3: PropTypes.number.tag({
    name: 'Posición en la lista',
    group: 'Publicidad Movil',
  }),
  adsMobile4: PropTypes.bool.tag({
    name: 'Mostrar "movil4"',
    group: 'Publicidad Movil',
  }),
  adsMobilePosition4: PropTypes.number.tag({
    name: 'Posición en la lista',
    group: 'Publicidad Movil',
  }),
  adsMobile5: PropTypes.bool.tag({
    name: 'Mostrar "movil5"',
    group: 'Publicidad Movil',
  }),
  adsMobilePosition5: PropTypes.number.tag({
    name: 'Posición en la lista',
    group: 'Publicidad Movil',
  }),
})

export default customFields
