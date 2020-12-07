import PropTypes from 'prop-types'

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
})

export default customFields
