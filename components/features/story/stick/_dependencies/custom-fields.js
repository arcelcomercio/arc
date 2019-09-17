import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  urlpwd: PropTypes.string.tag({
    name: 'Url de produccion',
    description: 'Url de pwd  Ejemplo: https://pwaperu21.page.link',
  }),

  urlDev: PropTypes.string.tag({
    name: 'Url de desarrollo ',
    description: 'Url sandbox Ejemplo: https://pwadevperu21.page.link',
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
