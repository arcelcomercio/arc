import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  urlpwd: PropTypes.string.tag({
    name: 'Url PWD ',
    description:
      // 'Url de pwd  Ejemplo: https://pwaperu21.page.link/?link=https://peru21.pe',
      'Url de pwd  Ejemplo: https://pwaperu21.page.link',
  }),
})

export default customFields

