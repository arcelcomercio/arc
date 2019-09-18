import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  Ambiente: PropTypes.oneOf(['prod', 'dev']).tag({
    name: 'Ambiente :',
    labels: {
      prod: 'Producción',
      dev: 'Desarrollo',
    },
    defaultValue: 'prod',
  }),

  urlpwdDev: PropTypes.string.tag({
    name: 'Url de produccion o Desarrollo',
    description: 'Ejm: https://pwaperu21.page.link ó https://pwadevperu21.page.link',
  }),

  apn: PropTypes.string.tag({
    name: 'apn',
    description: 'Identificador de paquete para Android',
  }),

  ibi: PropTypes.string.tag({
    name: 'ibi',
    description: 'Identificador de paquete para iOs',
  }),

  ipbi: PropTypes.string.tag({
    name: 'ipbi',
    description: 'Identificador de paquete para iPad',
  }),

  isi: PropTypes.string.tag({
    name: 'isi',
    description: 'isi',
  }),

  amv: PropTypes.string.tag({
    name: 'amv',
    description: 'amv',
  }),

  imv: PropTypes.string.tag({
    name: 'imv',
    description: 'imv',
  }),
})

export default customFields
