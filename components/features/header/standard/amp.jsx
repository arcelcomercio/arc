import React from 'react'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import HeaderChildStandardAmp from '../inverted/_children/header-amp'
import { getAssetsPath } from '../../../utilities/constants'

const HeaderStandardAmp = () => {
  const { contextPath, arcSite, deployment } = useFusionContext()
  const {
    siteUrl,
    assets: { seo: { widthAmp, heightAmp } = {} } = {},
  } = getProperties(arcSite)

  const imgLogo =
    arcSite === 'elcomercio'
      ? deployment(
          `${getAssetsPath(
            arcSite,
            contextPath
          )}/resources/dist/${arcSite}/images/logo-amp.png`
        )
      : deployment(
          `${siteUrl}${contextPath}/resources/dist/${arcSite}/images/logo-amp.png`
        ) || ''

  const parameters = { imgLogo, widthAmp, heightAmp, arcSite }

  return (
    <>
      <HeaderChildStandardAmp {...parameters} />
    </>
  )
}

HeaderStandardAmp.static = true

export default HeaderStandardAmp
