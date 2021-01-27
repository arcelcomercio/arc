import * as React from 'react'
import PropTypes from 'prop-types'

const HeaderSimpleAmp = () => {
  return <></>
}

HeaderSimpleAmp.label = 'Cabecera Simple'

HeaderSimpleAmp.propTypes = {
  customFields: PropTypes.shape({
    customLogos: PropTypes.kvp.tag({
      name: 'Logos personalizados por marca.  ss',
      description: `Presiona -new item- agregar una > marca < y la > url < del logo personalizado para esa marca.
        Ej: "depor" - "https://cdna.depor.com/resources/dist/depor/images/alternate-logo-w.png?d=1"`,
      group: 'Logos',
    }),
  }),
}

export default HeaderSimpleAmp
