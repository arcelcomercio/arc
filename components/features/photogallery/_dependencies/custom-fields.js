import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  storyConfig: PropTypes.contentConfig('story').isRequired.tag({
    name: 'Configuración del contenido',
  }),
  titleCustom: PropTypes.string.tag({
    group: 'Configuracion de Titulo',
    name: 'Nombre del Titulo',
    description: 'Nombre de ltitulo, por defecto es Fotogaleria.',
  }),
  seeMoreShow: PropTypes.bool.tag({
    group: 'Configuracion de Titulo',
    name: 'Boton Ver Mas',
    defaultValue: false,
  }),
  seeMoreLink: PropTypes.string.tag({
    group: 'Configuracion de Titulo',
    name: 'Link de boton Ver Mas',
    description: 'Por defecto envia a /fotogaleria',
  }),
  textAlign: PropTypes.oneOf(['left', 'center']).tag({
    group: 'Configuracion de Titulo',
    name: 'Posicion del Titular',
    description: 'Por defecto centro',
    labels: {
      left: 'Izquierda',
      center: 'Centro',
    },
    defaultValue: 'center',
  }),
  textPosition: PropTypes.oneOf(['start', 'end']).tag({
    group: 'Configuracion de Multimedia',
    name: 'Posicion de texto',
    labels: {
      start: 'Izquierda',
      end: 'Derecha',
    },
    defaultValue: 'right',
  }),
  textOrientation: PropTypes.oneOf(['top', 'middle', 'bottom']).tag({
    group: 'Configuracion de Multimedia',
    name: 'Orientacion de texto',
    labels: {
      top: 'Arriba',
      middle: 'Centro',
      bottom: 'Abajo',
    },
    defaultValue: 'middle',
  }),
})

export default customFields
