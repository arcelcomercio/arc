import PropTypes from 'prop-types'

const posicion = {
  0: 'Posicion 1',
  1: 'Posicion 2',
  2: 'Posicion 3',
  3: 'Posicion 4',
  4: 'Posicion 5',
  5: 'Posicion 6',
  6: 'Posicion 7',
  7: 'Posicion 8',
  8: 'Posicion 9',
  9: 'Posicion 10',
  10: 'Posicion 11',
  11: 'Posicion 12',
  12: 'Posicion 13',
}
const posicionAds = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
]
const customFields = PropTypes.shape({
  adsEvery: PropTypes.number.tag({
    name: '¿Inyectar Ads cada cuantos párrafos?',
    description:
      'Cantidad de parrafos que separan los ads disponibles en contenido',
    max: 5,
    min: 1,
    step: 1,
    defaultValue: 2,
    group: 'Opciones Lite',
  }),
  shareAlign: PropTypes.oneOf(['left', 'right']).tag({
    name: 'Alineación de botones para compartir',
    labels: {
      left: 'Izquierda',
      right: 'Derecha',
    },
    description:
      'Define la alineación de los botones de compartir que aparecen al final del cuerpo de la nota',
    defaultValue: 'right',
    group: 'Opciones Lite',
  }),
  copyLink: PropTypes.bool.tag({
    name: 'Activar botón para Copiar enlace de nota',
    description:
      'Si se activa, al final del cuerpo de la nota aparecerá el butón para Copiar enlace',
    defaultValue: false,
    group: 'Opciones Lite',
  }),

  ampAdName1: PropTypes.string.tag({
    name: 'Nombre',
    group: 'AMP',
  }),

  ampAdLoadBlock1: PropTypes.oneOf(posicionAds).tag({
    name: 'Seleccion la posicion',
    description: 'posicion de la publicidad',
    defaultValue: false,
    group: 'AMP',
    labels: posicion,
  }),

  freeHtml1: PropTypes.richtext.tag({
    name: 'Código HTML Adicional',
    group: 'AMP',
    description: 'HTML a renderizar en el espacios de publicidad en AMP',
  }),

  ampAdName2: PropTypes.string.tag({
    name: 'Nombre',
    group: 'AMP',
  }),

  ampAdLoadBlock2: PropTypes.oneOf(posicionAds).tag({
    name: 'Seleccion la posicion',
    description: 'posicion de la publicidad',
    defaultValue: false,
    group: 'AMP',
    labels: posicion,
  }),

  freeHtml2: PropTypes.richtext.tag({
    name: 'Código HTML Adicional',
    group: 'AMP',
    description: 'HTML a renderizar en el espacios de publicidad en AMP',
  }),

  ampAdName3: PropTypes.string.tag({
    name: 'Nombre',
    group: 'AMP',
  }),

  ampAdLoadBlock3: PropTypes.oneOf(posicionAds).tag({
    name: 'Seleccion la posicion',
    description: 'posicion de la publicidad',
    defaultValue: false,
    group: 'AMP',
    labels: posicion,
  }),

  freeHtml3: PropTypes.richtext.tag({
    name: 'Código HTML Adicional',
    group: 'AMP',
    description: 'HTML a renderizar en el espacios de publicidad en AMP',
  }),

  ampAdName4: PropTypes.string.tag({
    name: 'Nombre publicidad',
    group: 'AMP',
  }),

  ampAdLoadBlock4: PropTypes.oneOf(posicionAds).tag({
    name: 'Seleccion la posicion',
    description: 'posicion de la publicidad',
    defaultValue: false,
    group: 'AMP',
    labels: posicion,
  }),

  freeHtml4: PropTypes.richtext.tag({
    name: 'Código HTML Adicional',
    group: 'AMP',
    description: 'HTML a renderizar en el espacios de publicidad en AMP',
  }),
  ampAdName5: PropTypes.string.tag({
    name: 'Nombre',
    group: 'AMP',
  }),

  ampAdLoadBlock5: PropTypes.oneOf(posicionAds).tag({
    name: 'Seleccion la posicion',
    description: 'posicion de la publicidad',
    defaultValue: false,
    group: 'AMP',
    labels: posicion,
  }),

  freeHtml5: PropTypes.richtext.tag({
    name: 'Código HTML Adicional',
    group: 'AMP',
    description: 'HTML a renderizar en el espacios de publicidad en AMP',
  }),
})

export default customFields
