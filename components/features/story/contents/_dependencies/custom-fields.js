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
})

export default customFields
