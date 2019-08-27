import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  urlpwd: PropTypes.string.tag({
    name: 'Url PWD ',
    description:
      'Url de pwd  Ejemplo: https://pwaperu21.page.link/?link=https://peru21.pe',
  }),

  appData: PropTypes.richtext.tag({
    name: 'appData news ',
    description:
      'appData news Ejemplo: &apn=com.eeec.peru21&amv=30&ibi=com.eeec.Peru21&ipbi=com.eeec.Peru21&isi=991197788&imv=31&ofl=',
  }),

  href: PropTypes.richtext.tag({
    name: 'href ',
    description:
      'href Ejemplo: &efr=1&utm_source=btn_openapp_note&mt=8&ct=btn_openapp_note',
  }),
})

export default customFields
