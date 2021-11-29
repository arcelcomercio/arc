import PropTypes from 'prop-types'

const posicion = {
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
  13: 'Posicion 14',
  14: 'Posicion 15',
  15: 'Posicion 16',
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
  '14',
  '15',
]
const customFields = PropTypes.shape({
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

  ampAdName6: PropTypes.string.tag({
    name: 'Nombre',
    group: 'AMP',
  }),

  ampAdLoadBlock6: PropTypes.oneOf(posicionAds).tag({
    name: 'Seleccion la posicion',
    description: 'posicion de la publicidad',
    defaultValue: false,
    group: 'AMP',
    labels: posicion,
  }),

  freeHtml6: PropTypes.richtext.tag({
    name: 'Código HTML Adicional',
    group: 'AMP',
    description: 'HTML a renderizar en el espacios de publicidad en AMP',
  }),

  ampAdName7: PropTypes.string.tag({
    name: 'Nombre',
    group: 'AMP',
  }),

  ampAdLoadBlock7: PropTypes.oneOf(posicionAds).tag({
    name: 'Seleccion la posicion',
    description: 'posicion de la publicidad',
    defaultValue: false,
    group: 'AMP',
    labels: posicion,
  }),

  freeHtml7: PropTypes.richtext.tag({
    name: 'Código HTML Adicional',
    group: 'AMP',
    description: 'HTML a renderizar en el espacios de publicidad en AMP',
  }),

  ampAdName8: PropTypes.string.tag({
    name: 'Nombre',
    group: 'AMP',
  }),

  ampAdLoadBlock8: PropTypes.oneOf(posicionAds).tag({
    name: 'Seleccion la posicion',
    description: 'posicion de la publicidad',
    defaultValue: false,
    group: 'AMP',
    labels: posicion,
  }),

  freeHtml8: PropTypes.richtext.tag({
    name: 'Código HTML Adicional',
    group: 'AMP',
    description: 'HTML a renderizar en el espacios de publicidad en AMP',
  }),

  ampAdName9: PropTypes.string.tag({
    name: 'Nombre',
    group: 'AMP',
  }),

  ampAdLoadBlock9: PropTypes.oneOf(posicionAds).tag({
    name: 'Seleccion la posicion',
    description: 'posicion de la publicidad',
    defaultValue: false,
    group: 'AMP',
    labels: posicion,
  }),

  freeHtml9: PropTypes.richtext.tag({
    name: 'Código HTML Adicional',
    group: 'AMP',
    description: 'HTML a renderizar en el espacios de publicidad en AMP',
  }),

  ampAdName10: PropTypes.string.tag({
    name: 'Nombre',
    group: 'AMP',
  }),

  ampAdLoadBlock10: PropTypes.oneOf(posicionAds).tag({
    name: 'Seleccion la posicion',
    description: 'posicion de la publicidad',
    defaultValue: false,
    group: 'AMP',
    labels: posicion,
  }),

  freeHtml10: PropTypes.richtext.tag({
    name: 'Código HTML Adicional',
    group: 'AMP',
    description: 'HTML a renderizar en el espacios de publicidad en AMP',
  }),

  ampAdName11: PropTypes.string.tag({
    name: 'Nombre',
    group: 'AMP',
  }),

  ampAdLoadBlock11: PropTypes.oneOf(posicionAds).tag({
    name: 'Seleccion la posicion',
    description: 'posicion de la publicidad',
    defaultValue: false,
    group: 'AMP',
    labels: posicion,
  }),

  freeHtml11: PropTypes.richtext.tag({
    name: 'Código HTML Adicional',
    group: 'AMP',
    description: 'HTML a renderizar en el espacios de publicidad en AMP',
  }),

  ampAdName12: PropTypes.string.tag({
    name: 'Nombre',
    group: 'AMP',
  }),

  ampAdLoadBlock12: PropTypes.oneOf(posicionAds).tag({
    name: 'Seleccion la posicion',
    description: 'posicion de la publicidad',
    defaultValue: false,
    group: 'AMP',
    labels: posicion,
  }),

  freeHtml12: PropTypes.richtext.tag({
    name: 'Código HTML Adicional',
    group: 'AMP',
    description: 'HTML a renderizar en el espacios de publicidad en AMP',
  }),

  ampAdName13: PropTypes.string.tag({
    name: 'Nombre',
    group: 'AMP',
  }),

  ampAdLoadBlock13: PropTypes.oneOf(posicionAds).tag({
    name: 'Seleccion la posicion',
    description: 'posicion de la publicidad',
    defaultValue: false,
    group: 'AMP',
    labels: posicion,
  }),

  freeHtml13: PropTypes.richtext.tag({
    name: 'Código HTML Adicional',
    group: 'AMP',
    description: 'HTML a renderizar en el espacios de publicidad en AMP',
  }),

  ampAdName14: PropTypes.string.tag({
    name: 'Nombre',
    group: 'AMP',
  }),

  ampAdLoadBlock14: PropTypes.oneOf(posicionAds).tag({
    name: 'Seleccion la posicion',
    description: 'posicion de la publicidad',
    defaultValue: false,
    group: 'AMP',
    labels: posicion,
  }),

  freeHtml14: PropTypes.richtext.tag({
    name: 'Código HTML Adicional',
    group: 'AMP',
    description: 'HTML a renderizar en el espacios de publicidad en AMP',
  }),

  ampAdName15: PropTypes.string.tag({
    name: 'Nombre',
    group: 'AMP',
  }),

  ampAdLoadBlock15: PropTypes.oneOf(posicionAds).tag({
    name: 'Seleccion la posicion',
    description: 'posicion de la publicidad',
    defaultValue: false,
    group: 'AMP',
    labels: posicion,
  }),

  freeHtml15: PropTypes.richtext.tag({
    name: 'Código HTML Adicional',
    group: 'AMP',
    description: 'HTML a renderizar en el espacios de publicidad en AMP',
  }),
})

export default customFields
