import React from 'react'

import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import getFooterProperties from '../_dependencies/properties'
import FooterChildElComercio from './children/footer'
import { getAssetsPath } from '../../../utilities/assets'

const FooterElComercio = () => {
  const { arcSite, contextPath, isAdmin } = useFusionContext()

  const {
    assets: { footer: { logo } = {} } = {},
    legalLinks = [],
    gecSites = [],
    gda = false,
  } = getProperties(arcSite)

  const {
    footer: { siteLegal = [], directors = [], contacts = [] } = {},
  } = getFooterProperties(arcSite)

  const logoUrl =
    `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/dist/${arcSite}/images/${logo}?d=1` || ''

  const gdaLogo =
    `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/assets/footer/logo-gda.png?d=1` || ''

  const params = {
    legalLinks,
    siteLegal,
    directors,
    contacts,
    logoUrl,
    gdaLogo,
    gecSites,
    gda,
    arcSite,
    isAdmin,
  }

  return <FooterChildElComercio {...params} />
}

FooterElComercio.label = 'Pié de página - El Comercio'
FooterElComercio.static = true

export default FooterElComercio
