import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  urlpwd: PropTypes.string.tag({
    name: 'Url Produccion',
    description:
      'Url de pwd  Ejemplo: https://pwaperu21.page.link/?link=https://peru21.pe',
  }),

  urlDev: PropTypes.string.tag({
    name: 'Url DEV ',
    description:
      'Url sandbox Ejemplo: https://pwadevperu21.page.link/?link=https://peru21.pe'
  }),

  apn: PropTypes.string.tag({
    name: 'apn',
    description:
      'apn',
  }),

  isi: PropTypes.string.tag({
    name: 'isi',
    description:
      'isi',
  }),

  amv: PropTypes.string.tag({
    name: 'amv',
    description:
      'amv',
  }),

  imv: PropTypes.string.tag({
    name: 'imv',
    description:
      'imv',
  }) 
})

export default customFields

