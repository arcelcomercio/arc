import * as React from 'react'
import PropTypes from 'prop-types'
import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import Header from './_children/header'

const HeaderSimple = props => {
  const {
    customFields: { customLogos = {}, titleField = '', urlField = '' } = {},
  } = props

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
      titleField={titleField}
      urlField={urlField}
    />
  )
}

HeaderSimple.label = 'Cabecera Simple'

HeaderSimple.propTypes = {
  customFields: PropTypes.shape({
    titleField: PropTypes.string.tag({
      name: 'Título',
      description: 'El valor por defecto del campo "Título" es "Trivias"',
    }),
    urlField: PropTypes.string.tag({
      name: 'Url',
      description: 'El valor por defecto del campo "Url" es "/trivias/"',
    }),
    customLogos: PropTypes.kvp.tag({
      name: 'Logos personalizados por marca',
      description: `Presiona -new item- agregar una > marca < y la > url < del logo personalizado para esa marca.
        Ej: "depor" - "https://cdna.depor.com/resources/dist/depor/images/alternate-logo-w.png?d=1"`,
      group: 'Logos',
    }),
  }),
}

export default HeaderSimple
