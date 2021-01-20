import * as React from 'react'
import PropTypes from 'prop-types'
import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import Header from './_children/header'

/**
 * @see estilos `src/websites/elcomercio/scss/components/statics/resumen-2020/_container.scss`
 */
const HeaderSimple = props => {
  const { customFields: { customLogos = {} } = {} } = props

  const { requestUri, arcSite } = useAppContext()
  const { siteUrl, social: { twitter: { user } = {} } = {} } = getProperties(
    arcSite
  )
  const customLogo = customLogos[arcSite]

  return (
    <Header
      requestUri={requestUri}
      siteUrl={siteUrl}
      arcSite={arcSite}
      twitter={user}
      customLogo={customLogo}
    />
  )
}

HeaderSimple.static = true
HeaderSimple.label = 'Cabecera Simple'

HeaderSimple.propTypes = {
  customFields: PropTypes.shape({
    customLogos: PropTypes.kvp.tag({
      name: 'Logos personalizados por marca',
      description: `Presiona -new item- agregar una > marca < y la > url < del logo personalizado para esa marca.
        Ej: "depor" - "https://cdna.depor.com/resources/dist/depor/images/alternate-logo-w.png?d=1"`,
      group: 'Logos',
    }),
  }),
}

export default HeaderSimple
