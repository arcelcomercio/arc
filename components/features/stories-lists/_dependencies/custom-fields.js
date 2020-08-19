import PropTypes from 'prop-types'

export const customFieldsAdsList = {
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
  structuredData: PropTypes.bool.tag({
    name: '¿Generar datos estructurados?', 
    defaultValue: false,
  }),
}

export const customFields = PropTypes.shape({
  ...customFieldsAdsList,
})
