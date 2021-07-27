import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  disablePagoEfectivo: PropTypes.bool.tag({
    name: 'Deshabilitar Pago Efectivo',
    group: 'Pago Efectivo',
    defaultValue: false,
  }),
  allowedDomainsPagoEfectivo: PropTypes.list.tag({
    name: 'Dominios aceptados para Pago Efectivo',
    group: 'Pago Efectivo',
    defaultValue: undefined,
  }),
})

export default customFields
