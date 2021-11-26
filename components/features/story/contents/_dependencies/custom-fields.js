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
}
const customFields = PropTypes.shape({
  // Congig AMP
  shareLinksAMP: PropTypes.bool.tag({
    name: 'Mostrar links de redes sociales',
    description:
      'Si se activa, al final del cuerpo de la nota se mostrará los links de Redes Sociales',
    defaultValue: false,
    group: 'Opciones AMP',
  }),
  tagsAMP: PropTypes.bool.tag({
    name: 'Ocultar tags de la nota',
    description:
      'Si se activa, al final del cuerpo se ocultará los tags de la noticia',
    defaultValue: false,
    group: 'Opciones AMP',
  }),
  // Config Lite
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
  shareLinks: PropTypes.bool.tag({
    name: 'Activar botón para ocultar links de redes sociales',
    description:
      'Si se activa, al final del cuerpo de la nota se ocultará los links de Redes Sociales',
    defaultValue: false,
    group: 'Opciones Lite',
  }),
  copyLink: PropTypes.bool.tag({
    name: 'Activar botón para Copiar enlace de nota',
    description:
      'Si se activa, al final del cuerpo de la nota aparecerá el botón para Copiar enlace',
    defaultValue: false,
    group: 'Opciones Lite',
  }),

  ampAdName1: PropTypes.string.tag({
    name: 'Nombre',
    group: 'AMP',
  }),

  ampAdLoadBlock1: PropTypes.oneOf(['0', '1', '2', '3', '4']).tag({
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

  ampAdLoadBlock2: PropTypes.oneOf(['0', '1', '2', '3', '4']).tag({
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

  ampAdLoadBlock3: PropTypes.oneOf(['0', '1', '2', '3', '4']).tag({
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

  ampAdLoadBlock4: PropTypes.oneOf(['0', '1', '2', '3', '4']).tag({
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

  ampAdLoadBlock5: PropTypes.oneOf(['0', '1', '2', '3', '4']).tag({
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
