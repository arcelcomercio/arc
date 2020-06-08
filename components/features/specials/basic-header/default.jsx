import React from 'react'
/* import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties' */

import HeaderChildSpecialBasic from './_children/basic-header'

const HeaderSpecialBasic = () => {
  /* const { arcSite, contextPath, deployment } = useFusionContext()

  const {
    siteDomain,
    assets: { header: headerProperties },
  } = getProperties(arcSite) */

  return <HeaderChildSpecialBasic />
}

HeaderSpecialBasic.label = 'Especial - Cabecera Básica'
HeaderSpecialBasic.static = true

export default HeaderSpecialBasic
